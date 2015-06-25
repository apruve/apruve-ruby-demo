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
  @webhook_data = request.body.read
end

get '/' do
  # Create a payment request and some line items
  @payment_request = Apruve::Order.new(
      merchant_id: merchant_id,
      currency: 'USD',
      amount_cents: 6000,
      shipping_cents: 500
  )
  @payment_request.order_items << Apruve::OrderItem.new(
      title: 'Letter Paper',
      description: '20 lb ream (500 Sheets). Paper dimensions are 8.5 x 11.00 inches.',
      sku: 'LTR-20R',
      price_ea_cents: 1200,
      quantity: 3,
      amount_cents: 3600,
      view_product_url: 'https://merchant-demo.herokuapp.com'
  )
  @payment_request.order_items << Apruve::OrderItem.new(
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
  @payment_request = Apruve::Order.new(
      merchant_id: merchant_id,
      currency: 'USD',
      amount_cents: 26800
  )
  @payment_request.order_items << Apruve::OrderItem.new(
      title: 'Monthly Delivery - Letter Paper',
      description: '20 x 20lb reams, 10,000 sheets total will be delivered on the first Monday of each month. '\
                    'Paper dimensions are 8.5 x 11.00 inches.',
      merchant_notes: 'Discount: 4% off any order of 20 or more!',
      plan_code: 'letter20',
      price_ea_cents: 960,
      quantity: 20,
      amount_cents: 19200
  )
  @payment_request.order_items << Apruve::OrderItem.new(
      title: 'Monthly Delivery - Legal Paper',
      description: '10 x 24 lb reams, 2,500 sheets total will be delivered on the first Monday of each month. '\
                    'Paper dimensions are 8.5 x 14.00 inches.',
      plan_code: 'legal24',
      quantity: 10,
      amount_cents: 7600)

  erb :services
end

post '/finish_order' do
  # You should save the payment_request_id with the order in your database.
  #
  # Use the payment_request_id similar to the token you get from other payment services,
  # and issue a payment against it.
  invoice = Apruve::Invoice.new(order_id: params[:token], amount_cents: params[:charge], auto_invoice: true)
  @invoice_status = invoice.save!
  @status = Apruve::Order.find(invoice.order_id).status

  # If you track payments separately from the order, you probably want to store payment.id and payment.status
  # in the database somewhere, too...

  erb :finished
end

post '/finish_subscription' do
  # You should save the payment_request_id with the order in your database.
  #
  # If you don't want to charge the customer immediately, call Order#finalize to tell Apruve to
  # escalate the request to the payer and get their approval without charging their credit card. You can
  # create a payment to actually charge the customer later. Or, in this case, we're using Apruve's automated
  # subscriptions, so Apruve will create payments for us automatically.
  #
  # (Note: This is NOT the same as a credit card authorization! This is more akin to receiving a purchase order
  # from your customer after sending them a quote.)
  response = Apruve::Order.finalize!(params[:token])
  @status = response['status']
  erb :finished
end

post '/webhook_notify' do
  # We got a webhook. You should look up the order in your database and complete or cancel it as appropriate.
  puts "GOT WEBHOOK DATA FOR PAYMENT #{@webhook_data}"
  puts "Webhook verified?: #{apruve_public_key.verify OpenSSL::Digest::SHA256.new, Base64.decode64(env['HTTP_X_APRUVE_SIGNATURE']), @webhook_data}"
end
