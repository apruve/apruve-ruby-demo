import React from 'react'
import { Input, Button } from 'reactstrap'

class OrderItem extends React.Component {
  constructor(props) {
    super(props)

    this.name = this.name.bind(this)
    this.sku = this.sku.bind(this)
    this.price = this.price.bind(this)
    this.quantity = this.quantity.bind(this)
    this.subtotal = this.subtotal.bind(this)
    this.delete_order = this.delete_order.bind(this)
    this.price_blur = this.price_blur.bind(this)
    this.quantity_blur = this.quantity_blur.bind(this)
    this.subtotal_blur = this.subtotal_blur.bind(this)
  }

  name(event) {
    this.props.name(event.target.value, this.props.index)
  }

  sku(event) {
    this.props.sku(event.target.value, this.props.index)
  }

  price(event) {
    this.props.price(event.target.value, this.props.index)
  }

  quantity(event) {
    this.props.quantity(event.target.value, this.props.index)
  }

  subtotal(event) {
    this.props.subtotal(event.target.value, this.props.index)
  }

  delete_order() {
    this.props.delete_order(this.props.index)
  }

  price_blur() {
    this.props.price_update(this.props.index)
  }

  quantity_blur() {
    this.props.quantity_update(this.props.index)
  }

  subtotal_blur() {
    this.props.subtotal_update(this.props.index)
  }

  render() {
    return (
      <tr>
        <td>
          <Button type='button' size='sm' color='danger' disabled={this.props.disabled} onClick={this.delete_order}>X</Button>
        </td>
        <td>
          <Input type='text' pattern=".{3,}"   required title="3 characters minimum" value={this.props.order.name} onChange={this.name} />
        </td>
        <td>
          <Input type='text' value={this.props.order.sku} onChange={this.sku} />
        </td>
        <td>
          <Input type='text' value={this.props.order.price} onChange={this.price} onBlur={this.price_blur} />
        </td>
        <td>
          <Input type='text' value={this.props.order.quantity} onChange={this.quantity} onBlur={this.quantity_blur}/>
        </td>
        <td>
          <Input type='text' value={this.props.order.subtotal} onChange={this.subtotal} onBlur={this.subtotal_blur}/>
        </td>
      </tr>
    )
  }
}

export default OrderItem
