module Apruve
  class Client
    # monkey patching this for now so we don't need a gem update
    def method_missing(method, *args, &block)
      if is_http_method? method
        if config[:access_token]
          conn.headers['Authorization'] = "Bearer #{config[:access_token]}"
        elsif @api_key
          conn.headers['Apruve-Api-Key'] = @api_key
        end
        conn.send method, *args
      else
        super method, *args, &block
      end
    end
  end
end