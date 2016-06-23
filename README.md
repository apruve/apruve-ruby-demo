# Apruve Ruby Demo

A simple demo site to demonstrate how to integrate Apruve with your site.

## Issues

Please use [Github issues](https://github.com/apruve/apruve-ruby-demo/issues) to request features (examples) or report bugs.

**NOTE:** Be sure the bug you're reporting isn't actually a bug in [apruve-ruby](https://github.com/apruve/apruve-ruby)!

## Installation

Clone this repository into a directory.

### Running

Open a terminal in your newly created directory. Run `bundle install` to get the dependencies.

    $ bundle install

Set environment variables for your Merchant ID and API-Key

    $ APRUVE_API_KEY="your-api-key"
    $ export APRUVE_API_KEY
    $ APRUVE_MERCHANT_ID="your-merchant-id"
    $ export APRUVE_MERCHANT_ID
    $ APRUVE_ENVIRONMENT="test"
    $ export APRUVE_ENVIROMENT

Run the app

    $ ruby app.rb

View the app at http://localhost:4567

## Contributing

1. Fork it.
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Write some code.
4. Commit your changes. (`git commit -am 'Added my feature!'`)
5. Push to your branch. (`git push origin my-new-feature`)
6. Create new pull request.