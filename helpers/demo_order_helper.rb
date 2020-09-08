module DemoOrderHelper
  # Create a order request and some line items
  def demo_order
    order = Apruve::Order.new(
        currency:       'USD',
        amount_cents:   6000,
        shipping_cents: 500
    )
    order.order_items << Apruve::OrderItem.new(
        title:            'Letter Paper',
        description:      '20 lb ream (500 Sheets). Paper dimensions are 8.5 x 11.00 inches.',
        sku:              'LTR-20R',
        price_ea_cents:   1200,
        quantity:         3,
        price_total_cents:     3600,
        view_product_url: 'https://merchant-demo.herokuapp.com'
    )
    order.order_items << Apruve::OrderItem.new(
        title:             'Legal Paper',
        description:       '24 lb ream (250 Sheets). Paper dimensions are 8.5 x 14.00 inches.',
        sku:               'LGL-24R',
        price_ea_cents:    950,
        quantity:          2,
        price_total_cents: 1900,
        view_product_url:  'https://merchant-demo.herokuapp.com'
    )

    order
  end
end