import React from 'react'
import { Input } from 'reactstrap'

class CustomerSelect extends React.Component {
  constructor(props) {
    super(props)

    this.select_customer = this.select_customer.bind(this)
  }

  select_customer(event) {
    this.props.select_customer(event.target.selectedIndex)
  }

  render() {
    let customer_options = null
    let selected_customer = ''

    if (this.props.customers) {
      customer_options = this.props.customers.map((customer, index) => {
        return (
          <option key={index} value={customer.name}>{customer.name}</option>
        )
      })
      if (this.props.customers[this.props.selected_customer]) {
        selected_customer = this.props.customers[this.props.selected_customer].name
      }
    }

    return (
      <Input type="select" value={selected_customer} onChange={this.select_customer}>
        {customer_options}
      </Input>
    )
  }
}

export default CustomerSelect
