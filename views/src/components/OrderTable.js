import React from 'react'
import OrderItem from './OrderItem'
import { Button, Table} from 'reactstrap'

class OrderTable extends React.Component {
  constructor(props) {
    super(props)

    this.push_order = this.push_order.bind(this)
  }

  push_order() {
    this.props.push_order()
  }

  render() {
    const orders = this.props.orders.map((order, index) => {
      return (
      <OrderItem
        key={index}
        index={index}
        order={order}
        name={this.props.name}
        sku={this.props.sku}
        price={this.props.price}
        quantity={this.props.quantity}
        subtotal={this.props.subtotal}
        price_update={this.props.price_update}
        quantity_update={this.props.quantity_update}
        subtotal_update={this.props.subtotal_update}
        delete_order={this.props.delete_order}
        disabled={this.props.orders.length === 1}
      />
      )
    })

    return (
      <Table>
        <thead>
          <tr>
            <th> </th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orders}
          <tr>
            <td> </td>
            <td>
              <Button color="info" onClick={this.push_order}>Add Item</Button>
            </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default OrderTable
