import React from 'react'
import 'whatwg-fetch'
import { Alert, Button, Input, Row, Col } from 'reactstrap'
import OrderTable from './OrderTable'
import CustomerSelect from './CustomerSelect'

class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      selected_customer: null,
      shipping: '0.00',
      orders: [{
        name: '',
        sku: '',
        price: '',
        quantity: '',
        subtotal: ''
      }],
      alert_message: 'hi',
      alert_color: 'success',
      alert_visible: false
    };

    this.name = this.name.bind(this);
    this.sku = this.sku.bind(this);
    this.price = this.price.bind(this);
    this.quantity = this.quantity.bind(this);
    this.subtotal = this.subtotal.bind(this);
    this.price_update = this.price_update.bind(this);
    this.quantity_update = this.quantity_update.bind(this);
    this.subtotal_update = this.subtotal_update.bind(this);
    this.push_order = this.push_order.bind(this);
    this.delete_order = this.delete_order.bind(this);
    this.post_order = this.post_order.bind(this);
    this.shipping = this.shipping.bind(this);
    this.shipping_update = this.shipping_update.bind(this);
    this.select_customer = this.select_customer.bind(this);
    this.get_shopper_id = this.get_shopper_id.bind(this);
    this.alert = this.alert.bind(this);
    this.dismiss_alert = this.dismiss_alert.bind(this);
    this.order_exceeds_available_credit = this.order_exceeds_available_credit.bind(this);
  }

  componentDidMount() {
    let self = this;
    fetch('/corporate_accounts', {
      headers: {
        'Accept': 'application/json',
      },
      method: 'GET'
    })
    .then((res) => {
          if (res.status !== 200) {
            return Promise.reject('Bad status getting corporate_accounts: ' + res.status);
          } else {
            return res.json();
          }
        }
    ).then(corporate_accounts =>
      self.setState({customers: corporate_accounts.map(acct => acct.authorized_buyers.map(buyer => (Object.assign({}, buyer, {corporate_account: acct})))).flat(1)})
    ).catch((err) => console.error('Error getting corporate_accounts: ', err))
  }

  name(text, index) {
    let orders = this.state.orders.slice();
    orders[index].name = text;
    this.setState({ orders })
  }

  sku(text, index) {
    let orders = this.state.orders.slice()
    orders[index].sku = text
    this.setState({ orders })
  }

  price(text, index) {
    let orders = this.state.orders.slice()
    let price = Number(text)
    if (isNaN(price)) price = 0
    let quantity = orders[index].quantity
    quantity = quantity.length === 0 ? 1 : Number(quantity)
    orders[index].subtotal = (quantity * price).toFixed(2)
    orders[index].price = text
    this.setState({ orders })
  }

  price_update(index) {
    let orders = this.state.orders.slice()
    let price = Number(orders[index].price)
    let quantity = Number(orders[index].quantity)
    if (isNaN(price)) price = 0
    if (isNaN(quantity)) quantity = 1
    orders[index].price = price.toFixed(2)
    this.setState({ orders })
  }

  quantity(text, index) {
    let orders = this.state.orders.slice()
    let quantity = Number(text)
    let price = Number(orders[index].price)
    if (isNaN(quantity)) quantity = 1
    if (isNaN(price)) price = 0
    orders[index].subtotal = (quantity * price).toFixed(2)
    orders[index].quantity = text
    this.setState({ orders })
  }

  quantity_update(index) {
    let orders = this.state.orders.slice()
    let quantity = Number(orders[index].quantity)
    let price = Number(orders[index].price)
    if (isNaN(quantity)) {
      quantity = 1
      orders[index].quantity = ''
    }
    if (isNaN(price)) {
      orders[index].subtotal = ''
    } else {
      orders[index].subtotal = (quantity * Number(orders[index].price)).toFixed(2)
    }
    this.setState({ orders })
  }

  subtotal(text, index) {
    let orders = this.state.orders.slice()
    orders[index].subtotal = text
    this.setState({ orders })
  }

  subtotal_update(index) {
    let orders = this.state.orders.slice()
    orders[index].subtotal = Number(orders[index].price) * Number(orders[index].quantity).toFixed(2)
    this.setState({ orders })
  }

  push_order() {
    let order = {
      name: '',
      sku: '',
      price: '',
      quantity: '',
      subtotal: ''
    }
    this.setState({
      orders: this.state.orders.concat([order])
    })
  }

  delete_order(index) {
    let orders = this.state.orders.slice()
    orders.splice(index, 1)
    this.setState({ orders })
  }

  get_shopper_id() {
    let self = this
    const url = '/corporate_account/' + this.state.customers[this.state.selected_customer].email
    fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      method: 'GET'
    })
    .then((res) => {
      if (res.status === 404) {
        this.alert('Could not find that user in Apruve', 'danger')
        return
      } else if (res.status !== 200) {
        console.error('Bad status getting customer_id to be used as shopper_id: ', res.status)
        this.alert('Error placing the order!', 'danger')
        return
      }
      res.json().then((data) => {
        if (!data || !data.customer_id || data.customer_id.length === 0) {
          console.error('blank customer_id to be used as shopper_id')
          this.alert('Error placing the order!', 'danger')
        } else if(!data || !data.corporate_account_id || data.corporate_account_id.length === 0) {
          console.error('blank corporate_account_id')
          this.alert('Error placing the order!', 'danger')
        } else {
          self.post_order(data.customer_id, data.corporate_account_id)
        }
      })
    })
    .catch((err) => {
      console.error('Error getting shopper_id: ', err)
    })
  }

  post_order(shopper_id, corporate_account_id) {
    fetch('/orders', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        shipping: this.state.shipping,
        orders: this.state.orders,
        shopper_id,
        corporate_account_id
      })
    })
    .then((res) => {
      let self = this;
      if (res.status === 200) {
        this.alert('Successfuly placed the order!', 'success')
      } else {
        res.text().then(function (text) {
          self.alert('Error placing the order! ' + text , 'danger');
        });
      }
    })
    .catch((err) => {
      console.error('Error from POST:', err)
    })
  }

  shipping(event) {
    this.setState({ shipping: event.target.value })
  }

  shipping_update() {
    let shipping = Number(this.state.shipping)
    if (isNaN(shipping)) shipping = 0
    this.setState({ shipping: shipping.toFixed(2) })
  }

  select_customer(selected_customer) {
    console.log(`Selected Customer: ${selected_customer}, name: ${this.state.customers[selected_customer].name}`);
    this.setState({ selected_customer })
  }

  alert(alert_message, alert_color) {
    this.setState({ alert_color })
    this.setState({ alert_message })
    this.setState({ alert_visible: true })
  }

  dismiss_alert() {
    this.setState({ alert_visible: false })
  }

  order_exceeds_available_credit() {
    if (this.state.selected_customer === null) {
      return false;
    }

    const available_credit_cents = this.state.customers[this.state.selected_customer].corporate_account.credit_available_cents;
    let subtotal = this.state.orders.map((order) => Number(order.subtotal)).reduce((sum, current) => sum += current);
    let shipping = Number(this.state.shipping);
    if (isNaN(subtotal)) subtotal = 0;
    if (isNaN(shipping)) shipping = 0;
    return subtotal + shipping > available_credit_cents;
  }

  render() {
    let subtotal = this.state.orders.map((order) => Number(order.subtotal)).reduce((sum, current) => sum += current);
    let shipping = Number(this.state.shipping)
    if (isNaN(subtotal)) subtotal = 0
    if (isNaN(shipping)) shipping = 0

    const selectionStyle = {
      marginTop: 24,
      marginBottom: 24
    };

    const inlineAlertStyle = {
      display: 'inline-block'
    };

    return (
      <div>
        <div>
          <Alert color={this.state.alert_color} isOpen={this.state.alert_visible} toggle={this.dismiss_alert}>
            {this.state.alert_message}
          </Alert>
        </div>
        <Row style={selectionStyle}>
          <Col xs="12">
            Customer Name:
            <Row>
              <Col xs="8" sm="8" md="8" lg="6">
                <CustomerSelect
                  customers={this.state.customers}
                  selected_customer={this.state.selected_customer}
                  select_customer={this.select_customer}
                />
              </Col>
              {this.state.selected_customer !== null &&
                <Col sm="4" md = "4" lg="4" xs="4" className="my-auto">
                  ${(this.state.customers[this.state.selected_customer].corporate_account.credit_available_cents / 100).toFixed(2)} available
                </Col>
              }
            </Row>
          </Col>

        </Row>

        <Row>
          <OrderTable
            orders={this.state.orders}
            name={this.name}
            sku={this.sku}
            price={this.price}
            price_update={this.price_update}
            quantity={this.quantity}
            quantity_update={this.quantity_update}
            subtotal={this.subtotal}
            subtotal_update={this.subtotal_update}
            push_order={this.push_order}
            delete_order={this.delete_order}
          />
        </Row>
        <Row>
          <Col sm="6" md = "8" lg="9" xs="6"> </Col>
          <Col sm="4" md = "2" lg="2" xs="4"><b>Subtotal:</b></Col>
          <Col sm="2" md = "2" lg="1" xs="2">${subtotal.toFixed(2)}</Col>
        </Row>
        <Row>
          <Col sm="6" md = "8" lg="9" xs="6"> </Col>
          <Col sm="4" md = "2" lg="2" xs="4"><b>Shipping:</b></Col>
          <Col sm="2" md = "2" lg="1" xs="2">
            <Input type="text" value={this.state.shipping} onChange={this.shipping} onBlur={this.shipping_update} />
          </Col>
        </Row>
        <Row>
          <Col sm="6" md = "8" lg="9" xs="6"> </Col>
          <Col sm="4" md = "2" lg="2" xs="4"><b>Total:</b></Col>
          <Col sm="2" md = "2" lg="1" xs="2">${(subtotal + shipping).toFixed(2)}</Col>
        </Row>
        {this.order_exceeds_available_credit() &&
        <Row>
          <Col>
            <Alert color="danger" fade={false} isOpen={this.order_exceeds_available_credit()} style={inlineAlertStyle}>This order exceeds the available credit</Alert>
          </Col>
        </Row>
        }
        <Row>
          <Button color={this.order_exceeds_available_credit() ? 'failure' : 'success'} className={this.order_exceeds_available_credit() ? 'disabled' : ''} onClick={this.get_shopper_id}>Create Order</Button>

        </Row>

      </div>
    )
  }
}

export default OrderForm
