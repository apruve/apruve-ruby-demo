require 'rspec'
require './spec/spec_helper.rb'
require 'aws/s3'
require 'aws-sdk'
require 'sinatra'
require 'rack/test'
require './app.rb'

    
describe 'app' do
    include Rack::Test::Methods
    it 'displays setting page' do
        # make sure setting page is working
        get '/settings'
        expect(last_response).to be_ok
    end

    describe '#upload' do  
        some_string = 'something'
        file = 'techcocktail.png'
        it 'works' do
            # make sure the s3 object receives the correct parameters
            s3_object = class_double(AWS::S3::S3Object)
            allow(s3_object).to receive(:store).with(file, open('./public/img/techcocktail.png'), 'apruve_profile_img_test')
            
            post '/upload',  { :image => { :tempfile => './public/img/techcocktail.png', :filename => file } }

            ## tests that /upload redirects to main page
            expect(last_response.redirect?).to be_truthy
            follow_redirect!
            expect(last_request.path).to eq('/')

        end
    end
end
