require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'coffee-script'
require 'net/http'
require 'apruve'
require 'openssl'
require 'base64'
require 'dotenv'
require 'json'

Dotenv.load

set :bind, '0.0.0.0'

# public key for verifying webhook signatures
# TODO pull this from a webservice
apruve_public_key = OpenSSL::PKey.read(File.new(('apruve.pub')))

# default the environment to test.apruve.com
apruve_environment = ENV['APRUVE_ENVIRONMENT'].nil? ? 'test' : ENV['APRUVE_ENVIRONMENT']
apruve_corporate_account_id = ENV['APRUVE_CORPORATE_ACCOUNT_ID']

# set the default credit application url
ENV['APRUVE_CREDIT_APP_URL'] ||= 'http://localhost:3000/apply/munder-difflin-inc'


# can override other specifics here if necessary
config_overrides          = {}
config_overrides[:scheme] = ENV['APRUVE_SCHEME'] unless ENV['APRUVE_SCHEME'].nil?
config_overrides[:host]   = ENV['APRUVE_HOST'] unless ENV['APRUVE_HOST'].nil?
config_overrides[:port]   = ENV['APRUVE_PORT'] unless ENV['APRUVE_PORT'].nil?
merchant_id               = ENV['APRUVE_MERCHANT_ID']

before do
  Apruve.configure(ENV['APRUVE_API_KEY'], apruve_environment, config_overrides)
end

before '/webhook_notify' do
  request.body.rewind
  @webhook_body = request.body.read
end

get '/offline_order' do
  erb :offline_orders
end

get '/corporate_accounts' do
  begin
    corporate_accounts = if apruve_corporate_account_id
                           [Apruve::CorporateAccount.find_by_uuid(merchant_id, apruve_corporate_account_id)]
                         else
                           Apruve::CorporateAccount.find_all(merchant_id)
                         end
    corporate_accounts.to_json
  rescue Apruve::NotFound
    status 404
    ''
  end
end

get '/corporate_account/:email' do
  content_type :json
  begin
    corporate_account = Apruve::CorporateAccount.find(merchant_id, params['email'])
    puts "customer_id: #{corporate_account.customer_uuid}, id: #{corporate_account.id}"
    { customer_id: corporate_account.customer_uuid, corporate_account_id: corporate_account.id }.to_json
  rescue Apruve::NotFound
    status 404
    ''
  end
end

post '/orders' do
  request.body.rewind
  payload            = JSON.parse request.body.read
  total_amount_cents = payload['orders'].map { |order|
    order['subtotal'].to_f
  }.reduce(:+)
  total_amount_cents = ((total_amount_cents + payload['shipping'].to_f) * 100).round

  @order = Apruve::Order.new(
      merchant_id:    merchant_id,
      shopper_id:     payload['shopper_id'],
      currency:       'USD',
      amount_cents:   total_amount_cents,
      shipping_cents: (payload['shipping'].to_f * 100).round,
      payment_term:   { corporate_account_id: payload['corporate_account_id'] }
  )

  payload['orders'].each { |order|
    @order.order_items << Apruve::OrderItem.new(
        title:             order['name'],
        description:       order['name'],
        sku:               order['sku'],
        price_ea_cents:    (order['price'].to_f * 100).round,
        quantity:          order['quantity'].to_i,
        price_total_cents: (order['subtotal'].to_f * 100).round
    )
  }
  @order.save!
end

get '/' do
  # Create a payment request and some line items
  @order = Apruve::Order.new(
      merchant_id:    merchant_id,
      currency:       'USD',
      amount_cents:   6000,
      shipping_cents: 500
  )
  @order.order_items << Apruve::OrderItem.new(
      title:            'Letter Paper',
      description:      '20 lb ream (500 Sheets). Paper dimensions are 8.5 x 11.00 inches.',
      sku:              'LTR-20R',
      price_ea_cents:   1200,
      quantity:         3,
      price_total_cents:     3600,
      view_product_url: 'https://merchant-demo.herokuapp.com'
  )
  @order.order_items << Apruve::OrderItem.new(
      title:             'Legal Paper',
      description:       '24 lb ream (250 Sheets). Paper dimensions are 8.5 x 14.00 inches.',
      sku:               'LGL-24R',
      price_ea_cents:    950,
      quantity:          2,
      price_total_cents: 1900,
      view_product_url:  'https://merchant-demo.herokuapp.com'
  )
  erb :index
end

get '/invoice-badly/:token' do
  token = params['token']
  address = {
      address_1: '8995 Creola Ville',
      address_2: 'Apt. 945',
      city: 'Friesentown',
      state: 'MNN',
      postal_code: '62685',
      country_code: 'US',
      phone_number: '6123456789',
      fax_number: '6123456789',
      contact_name: 'Zelda Pagac',
      name: 'Jacobson, Conn and Kreiger',
      notes: 'Est corrupti quis cumque.'
  }
  invoice = Apruve::Invoice.new(
      order_id: token,
      amount_cents: 2000,
      )
  invoice.save!
end

post '/finish_order' do
  # You should save the order_id with the order in your database.
  # Since the order automatically finalizes, we only need to get the status to display to the user.
  order = Apruve::Order.find(params[:token])

  if order.status == 'accepted'
    invoices = Apruve::Order.invoices_for(params[:token])
    if invoices.all? { |invoice| invoice.status == 'closed' }
      # The order is accepted and fully paid for.  Report that goods are being shipped.
      @status = 'accepted'
    elsif order.payment_term && order.payment_term['final_state_at']
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

post '/webhook_notify' do
  # We got a webhook. You should look up the order in your database and complete or cancel it as appropriate.
  puts "GOT WEBHOOK DATA FOR PAYMENT #{@webhook_body}"
  puts "Webhook verified?: #{apruve_public_key.verify OpenSSL::Digest::SHA256.new, Base64.decode64(env['HTTP_X_APRUVE_SIGNATURE']), @webhook_body}"
end

not_found do
  $stdout.print 'Site does not exist.'
end

error do
  { message: env['sinatra.error'] }
end

error 400 do
  $stdout.print 'Apruve::BadRequest(400)'
end
