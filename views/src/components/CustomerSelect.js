import React from 'react'
import Select from "react-dropdown-select";
class CustomerSelect extends React.Component {
  constructor(props) {
    super(props);
    this.select_customer = this.select_customer.bind(this)
  }
  select_customer(index) {
    this.props.select_customer(index);
  }

  render() {

    const custOptionsReactSelectDropdown = this.props.customers.map((customer, index) => ({
      label: `${customer.name} (${customer.email})`,
      value: index,
      index,
      search: customer.email
    }));

    return <Select options={custOptionsReactSelectDropdown} labelField="label" searchBy="search" onChange={(value) => this.select_customer(value[0].index)}/>
  }
}

export default CustomerSelect
