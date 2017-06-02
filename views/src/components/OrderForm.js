import React from 'react'
import { Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input, Row, Col } from 'reactstrap'
import OrderTable from './OrderTable'
import CustomerSelect from './CustomerSelect'

class OrderForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      customers: [],
      selected_customer: 0,
      shipping: '0.00',
      orders: [{
        name: '',
        sku: '',
        price: '',
        quantity: '',
        subtotal: ''
      }],
      error_visible: false,
      success_visible: false
    }

    this.name = this.name.bind(this)
    this.sku = this.sku.bind(this)
    this.price = this.price.bind(this)
    this.quantity = this.quantity.bind(this)
    this.subtotal = this.subtotal.bind(this)
    this.price_update = this.price_update.bind(this)
    this.quantity_update = this.quantity_update.bind(this)
    this.subtotal_update = this.subtotal_update.bind(this)
    this.push_order = this.push_order.bind(this)
    this.delete_order = this.delete_order.bind(this)
    this.post_order = this.post_order.bind(this)
    this.shipping = this.shipping.bind(this)
    this.shipping_update = this.shipping_update.bind(this)
    this.select_customer = this.select_customer.bind(this)
    this.get_shopper_id = this.get_shopper_id.bind(this)
    this.on_success_dismiss = this.on_success_dismiss.bind(this)
    this.on_error_dismiss = this.on_error_dismiss.bind(this)
  }

  componentDidMount() {
    let self = this
    fetch('/customers', {
      headers: {
        'Accept': 'application/json',
      },
      method: 'GET'
    })
    .then((res) => {
      if (res.status !== 200) {
        console.error('Bad status getting customers.json: ', res.status)
        return
      }
      res.json().then((customers) => {
        self.setState({ customers })
      })
    })
    .catch((err) => {
      console.error('Error getting customers.json: ', err)
    })
  }

  on_error_dismiss() {
    this.setState({ error_visible: false })
  }

  on_success_dismiss() {
    this.setState({ success_visible: false })
  }

  name(text, index) {
    let orders = this.state.orders.slice()
    orders[index].name = text
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
    const url = '/shopper_id/' + this.state.customers[this.state.selected_customer].email
    fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      method: 'GET'
    })
    .then((res) => {
      if (res.status === 404) {
        console.error('got a 404')
        this.setState({ error_visible: true })
        return
      } else if (res.status !== 200) {
        console.error('Bad status getting shopper_id: ', res.status)
        this.setState({ error_visible: true })
        return
      }
      res.json().then((data) => {
        if (!data || !data.shopper_id || !data.shopper_id.length === 0) {
          self.post_order(this.state.customers[this.state.selected_customer].shopper_id)
        } else {
          self.post_order(data.shopper_id)
        }
      })
    })
    .catch((err) => {
      console.error('Error getting shopper_id: ', err)
    })
  }

  post_order(shopper_id) {
    fetch('/orders', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        shipping: this.state.shipping,
        orders: this.state.orders,
        shopper_id: shopper_id
      })
    })
    .then((res) => {
      if (res.status === 200) {
        this.setState({ success_visible: true })
      } else {
        this.setState({ error_visible: true })
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
    this.setState({ selected_customer })
  }

  render() {
    let subtotal = this.state.orders.map((order) => Number(order.subtotal)).reduce((sum, current) => sum += current)
    let shipping = Number(this.state.shipping)
    if (isNaN(subtotal)) subtotal = 0
    if (isNaN(shipping)) shipping = 0

    const selectionStyle = {
      marginTop: 24,
      marginBottom: 24
    }

    return (
      <div>
        <div>
          <Alert color="success" isOpen={this.state.success_visible} toggle={this.on_success_dismiss}>
            Successfuly placed the order!
          </Alert>
          <Alert color="danger" isOpen={this.state.error_visible} toggle={this.on_error_dismiss}>
            Could not submit the order, user was not found in Apruve.
          </Alert>
        </div>
        <Row style={selectionStyle}>
          <Col sm="4" md = "3" lg="3" xs="4">
            Customer Name:
            <CustomerSelect
              customers={this.state.customers}
              selected_customer={this.state.selected_customer}
              select_customer={this.select_customer}
            />
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
        <Row>
          <Button color="success" onClick={this.get_shopper_id}>Create Order</Button>
        </Row>
      </div>
    )
  }
}

export default OrderForm
