require 'rspec'
require './spec/spec_helper.rb'
require 'aws/s3'
require 'aws-sdk'
require 'tempfile'
require 'sinatra'
require 'rack/test'
require './app.rb'
require 'sinatra/flash'
enable :sessions
use Rack::Logger


def logger
    request.logger
end

# class AppTest < Test::Unit::TestCase
#     include Rack::Test::Methods
#     def app
#         Sinatra::Application
#     end
#     def test_sign_in
#         get '/sign_in'
#         assert last_response.ok?
#     end
# end

# describe App do
#     it 'displays setting page' do
#         get '/sign_in'
#         expect(last_response).to be_ok
#     end
# end
    
describe 'app' do
    include Rack::Test::Methods
    it 'displays setting page' do
        puts Dir.pwd
        puts File.dirname(__FILE__)
        get '/settings'
        expect(last_response.status).to eq 200
    end

    # it 'displays upload page' do
    #     post '/upload'
    #     expect(last_response.redirect?).to be_truthy
    # end

    describe '#upload' do  
        some_string = 'something'
        file = 'techcocktail.png'
        # f = Tempfile.create(file, "../public/img") do
        #     AWS::S3::Base.establish_connection!(
        #         :access_key_id => 'AKIASFWBQ35QI6KVTWQC',
        #         :secret_access_key => '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', 
        #     )

        #     s3 = Aws::S3::Resource.new(
        #         region: 'us-east-1',
        #         credentials: Aws::Credentials.new('AKIASFWBQ35QI6KVTWQC', 'j1NYeIaUN1AIMqNS4eFa2otR2oNwWKeM8D+u6Dt5')
        #     )
        # end
            # bucket_aw = s3.bucket('apruve_profile_img_test')
            it 'works' do
                expect(some_string).to eq 'something'
                s3_object = class_double(AWS::S3::S3Object)
                allow(s3_object).to receive(:store).with().and_return()
                post '/upload',  { :image => { :tempfile => './public/img/techcocktail.png', :filename => file } }
                
                # expect(last_response).to eq ('ls')

                # puts (last_response.body)

                #expect(last_response.flash[:alert]).to be_prese
                expect(last_response.redirect?).to be_truthy
                # expect(last_response.body).to include (file)

                # last_response.should be_redirect  #####some problem

                # module Sinatra::Flash
                # expect(flash[:alert]).to be_present
                # end


                
               
                # s3_object = class_double
                # expect(s3_object).to_receieve(:store) #.with(file, open(f), 'apruve_profile_img_test')

                # if bucket_aw.object(file).exists?
                #     puts "File '#{file}' is present in S3 bucket!"
                # else
                #     puts "File '#{file}' is not in S3 bucket!"
                # end

             end
    end
end
