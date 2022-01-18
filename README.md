# Apruve Ruby Demo

A simple demo site to demonstrate how to integrate Apruve with your site.

## Issues

Please use [Github issues](https://github.com/apruve/apruve-ruby-demo/issues) to request features (examples) or report bugs.

**NOTE:** Be sure the bug you're reporting isn't actually a bug in [apruve-ruby](https://github.com/apruve/apruve-ruby)!

## Installation

Clone this repository into a directory.

### Running

Open a terminal in your newly created directory. Run `bundle install` to get the Ruby dependencies, and `npm install` for the Node/React dependencies.

    $ bundle install
    $ npm install

You will also need to use `webpack` to bundle the Node assets. Install webpack and run `webpack`.

    $ npm install webpack -g
    $ webpack

Set environment variables for your Merchant ID and API-Key (see .env_example file)

    $ APRUVE_API_KEY="your-api-key"
    $ export APRUVE_API_KEY
    $ APRUVE_MERCHANT_ID="your-merchant-id"
    $ export APRUVE_MERCHANT_ID
    $ APRUVE_ENVIRONMENT="test"
    $ export APRUVE_ENVIROMENT
    $ APRUVE_CREDIT_APP_URL="credit-app-url"
    $ export APRUVE_CREDIT_APP_URL
    $ APRUVE_CORPORATE_ACCOUNT_ID="corporate-account-id"
    $ export APRUVE_CORPORATE_ACCOUNT_ID
    $ APRUVE_AWS_ACCESS_KEY="aws-access-key"
    $ export APRUVE_AWS_ACCESS_KEY
    $ SECRET_AWS_ACCESS_KEY="secret-aws-access-key"
    $ export SECRET_AWS_ACCESS_KEY
    $ APRUVE_S3_BUCKET_NAME='your-bucket-name'
    $ export APRUVE_S3_BUCKET_NAME
    
Set .env file

    $ cp .env_example .env

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

## Potential installation error
This app requires ruby version 2.6.7
For m1 macs that install this ruby version via the following command:

    $ rbenv install 2.6.7
    
This error may occur:

    BUILD FAILED (macOS 11.0 using ruby-build 20211203)

    Inspect or clean up the working tree at /var/folders/6k/v0msdhkn1hsfzbxp2xcqb3gm0000gn/T/ruby-build.20211211210439.78348.Qp4iVL
    Results logged to /var/folders/6k/v0msdhkn1hsfzbxp2xcqb3gm0000gn/T/ruby-build.20211211210439.78348.log
    
To resolve, run the following command before rbenv install 2.6.7

    export optflags="-Wno-error=implicit-function-declaration";

