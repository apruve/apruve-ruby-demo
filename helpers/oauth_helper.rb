require 'oauth2'

module OauthHelper
  def oauth2_client
    OAuth2::Client.new(apruve_oauth_client_id,
                       apruve_oauth_client_secret,
                       authorize_url: authorize_url,
                       token_url: token_url)
  end

  def oauth2_client_ready?
    apruve_oauth_client_id && apruve_oauth_client_secret
  end




  def redirect_url
    ENV['APRUVE_OAUTH_REDIRECT_URL']
  end

  def authorize_url
    "#{Apruve.client.url}/oauth2/authorize"
  end

  def token_url
    "#{Apruve.client.url}/oauth2/token"
  end

  def apruve_oauth_client_id
    ENV['APRUVE_OAUTH_CLIENT_ID']
  end

  def apruve_oauth_client_secret
    ENV['APRUVE_OAUTH_CLIENT_SECRET']
  end
end