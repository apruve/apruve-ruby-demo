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

  # This could be an environment variable too, I'm not sure how reliable the below is
  def self_base_url
    port_string = [443, 80].include?(request.port) ? '' : ":#{request.port}"
    proto_string = request.env['HTTP_X_FORWARDED_PROTO'] || request.env['rack.url_scheme']
    "#{proto_string}://#{request.env['HTTP_HOST']}#{port_string}"
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