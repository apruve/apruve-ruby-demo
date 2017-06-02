import React from 'react'
import { Container, Row, Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import OrderForm from './OrderForm'

class App extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Navbar color="faded" light>
              <NavbarBrand href="/">reactstrap</NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Orders</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">Customers</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">Payments</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">Settings</NavLink>
                </NavItem>
              </Nav>
            </Navbar>
          </Row>
          <OrderForm />
        </Container>
      </div>
    )
  }
}

export default App
