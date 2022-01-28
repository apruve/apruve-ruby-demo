require 'sinatra'
# require 'capybara' TODO: include selenium headless chrome driver feature specs in spec file
# require 'capybara/dsl'
require 'rack/test'

# setup test environment
set :environment, :test
set :run, false
set :raise_errors, true
set :logging, false

def app
  Sinatra::Application
end

RSpec.configure do |config|
  config.include Rack::Test::Methods
end