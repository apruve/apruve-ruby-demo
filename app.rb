require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'coffee-script'
require 'net/http'
require 'apruve'
require 'openssl'
require 'base64'

set :bind, '0.0.0.0'

# public key for verifying webhook signatures
# TODO pull this from a webservice
apruve_public_key = OpenSSL::PKey.read(File.new(('apruve.pub')))

# default the environment to test.apruve.com
apruve_environment = ENV['APRUVE_ENVIRONMENT'].nil? ? 'test' : ENV['APRUVE_ENVIRONMENT']

# can override other specifics here if necessary
config_overrides = {}
config_overrides[:scheme] = ENV['APRUVE_SCHEME'] unless ENV['APRUVE_SCHEME'].nil?
config_overrides[:host] = ENV['APRUVE_HOST'] unless ENV['APRUVE_HOST'].nil?
config_overrides[:port] = ENV['APRUVE_PORT'] unless ENV['APRUVE_PORT'].nil?
Apruve.configure(ENV['APRUVE_API_KEY'], apruve_environment, config_overrides)
merchant_id = ENV['APRUVE_MERCHANT_ID']

before '/webhook_notify' do
  request.body.rewind
  @webhook_body = request.body.read
end

get '/' do
  # Create a payment request and some line items
  @order = Apruve::Order.new(
      merchant_id: merchant_id,
      currency: 'USD',
      amount_cents: 6000,
      shipping_cents: 500
  )
  @order.order_items << Apruve::OrderItem.new(
      title: 'Letter Paper',
      description: '20 lb ream (500 Sheets). Paper dimensions are 8.5 x 11.00 inches.',
      sku: 'LTR-20R',
      price_ea_cents: 1200,
      quantity: 3,
      amount_cents: 3600,
      view_product_url: 'https://merchant-demo.herokuapp.com'
  )
  @order.order_items << Apruve::OrderItem.new(
      title: 'Legal Paper',
      description: '24 lb ream (250 Sheets). Paper dimensions are 8.5 x 14.00 inches.',
      sku: 'LGL-24R',
      price_ea_cents: 950,
      quantity: 2,
      amount_cents: 1900,
      view_product_url: 'https://merchant-demo.herokuapp.com'
  )
  erb :index
end

get '/services' do
  # Create a payment request and some line items that match a subscription plan in our Apruve store
  @order = Apruve::Order.new(
      merchant_id: merchant_id,
      currency: 'USD',
      finalize_on_create: false
  )
  @order.order_items << Apruve::OrderItem.new(
      title: 'Monthly Delivery - Letter Paper',
      description: '20 x 20lb reams, 10,000 sheets total will be delivered on the first Monday of each month. '\
                    'Paper dimensions are 8.5 x 11.00 inches.',
      merchant_notes: 'Discount: 4% off any order of 20 or more!',
      plan_code: 'letter20',
      price_ea_cents: 960,
      quantity: 20,
      amount_cents: 19200
  )
  @order.order_items << Apruve::OrderItem.new(
      title: 'Monthly Delivery - Legal Paper',
      description: '10 x 24 lb reams, 2,500 sheets total will be delivered on the first Monday of each month. '\
                    'Paper dimensions are 8.5 x 14.00 inches.',
      plan_code: 'legal24',
      quantity: 10,
      amount_cents: 7600)

  erb :services
end

post '/finish_order' do
  # You should save the order_id with the order in your database.
  # Since the order automatically finalizes, we only need to get the status to display to the user.
  order = Apruve::Order.find(params[:token])

  if order.status == 'accepted'
    invoices = Apruve::Order.invoices_for(params[:token])
    if invoices.all? { |invoice| invoice.status == 'closed'}
      # The order is accepted and fully paid for.  Report that goods are being shipped.
      @status = 'accepted'
    elsif order.payment_terms && order.payment_terms['final_state_at']
      # The order was accepted with payment terms.  Report that goods are being shipped.
      @status = 'accepted'
    else
      # The order was accepted, but either payment is still pending.  Report that goods will
      # ship once payment is complete.
      @status = 'pending_payment'
    end
  elsif order.status == 'canceled'
    @status = 'canceled'
  else
    # The order is waiting for either a requisition or payment terms to be approved.  Report that goods will ship once
    # payment is approved.
    @status = 'pending_approval'
  end

  # If you track invoices separately from the order, you may want to get the invoices and store the IDs.
  # @invoices = Apruve::Order.invoices_for(params[:token])

  erb :finished
end

post '/finish_subscription' do
  # You should save the order_id with the order in your database.
  #
  # If you don't want to charge the customer immediately, call Order#finalize to tell Apruve to
  # escalate the request to the payer and get their approval without charging their credit card. You can
  # create a payment to actually charge the customer later. Or, in this case, we're using Apruve's automated
  # subscriptions, so Apruve will create invoices for us automatically.
  #
  # (Note: This is NOT the same as a credit card authorization! This is more akin to receiving a purchase order
  # from your customer after sending them a quote.)
  @status = Apruve::Order.finalize!(params[:token]).status
  erb :finished
end

post '/webhook_notify' do
  # We got a webhook. You should look up the order in your database and complete or cancel it as appropriate.
  puts "GOT WEBHOOK DATA FOR PAYMENT #{@webhook_body}"
  puts "Webhook verified?: #{apruve_public_key.verify OpenSSL::Digest::SHA256.new, Base64.decode64(env['HTTP_X_APRUVE_SIGNATURE']), @webhook_body}"
end
