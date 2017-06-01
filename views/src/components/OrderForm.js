import React from 'react'
import { Container, Button, Input, Row, Col } from 'reactstrap'
import OrderTable from './OrderTable'

class OrderForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shipping: '0.00',
      orders: [{
        name: '',
        sku: '',
        price: '',
        quantity: '',
        subtotal: ''
      }]
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
  }

  name(text, index) {
    let orders = this.state.orders.slice()
    orders[index].name = text
    this.setState({ orders: orders })
  }

  sku(text, index) {
    let orders = this.state.orders.slice()
    orders[index].sku = text
    this.setState({ orders: orders })
  }

  price(text, index) {
    let orders = this.state.orders.slice()
    let price = Number(text)
    if (isNaN(price)) price = 0
    let quantity = orders[index].quantity
    quantity = quantity.length === 0 ? 1 : Number(quantity)
    orders[index].subtotal = (quantity * price).toFixed(2)
    orders[index].price = text 
    this.setState({ orders: orders })
  }

  price_update(index) {
    let orders = this.state.orders.slice()
    let price = Number(orders[index].price)
    let quantity = Number(orders[index].quantity)
    if (isNaN(price)) price = 0
    if (isNaN(quantity)) quantity = 1
    orders[index].price = price.toFixed(2)
    this.setState({ orders: orders })
  }

  quantity(text, index) {
    let orders = this.state.orders.slice()
    let quantity = Number(text)
    let price = Number(orders[index].price)
    if (isNaN(quantity)) quantity = 1
    if (isNaN(price)) price = 0
    orders[index].subtotal = (quantity * price).toFixed(2)
    orders[index].quantity = text
    this.setState({ orders: orders })
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
    this.setState({ orders: orders })
  }

  subtotal(text, index) {
    let orders = this.state.orders.slice()
    orders[index].subtotal = text
    this.setState({ orders: orders })
  }

  subtotal_update(index) {
    let orders = this.state.orders.slice()
    orders[index].subtotal = Number(orders[index].price) * Number(orders[index].quantity).toFixed(2)
    this.setState({ orders: orders })
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
    this.setState({ orders: orders })
  }

  post_order(index) {
    fetch('/orders', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        shipping: this.state.shipping,
        orders: this.state.orders
      })
    })
    .then(function(res) {
      console.log('res1:', res)
    })
    .then(function(res) {
      console.log('res2:', res)
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

  render() {
    let subtotal = this.state.orders.map((order) => Number(order.subtotal)).reduce((sum, current) => sum += current)
    let shipping = Number(this.state.shipping)
    if (isNaN(subtotal)) subtotal = 0
    if (isNaN(shipping)) shipping = 0

    let s = {
      float: 'left'
    }

    return (
      <div>
        <Container>
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
            <Button color="success" onClick={this.post_order}>Create Order</Button>
          </Row>
        </Container>
      </div>
    )
  }
}

export default OrderForm
