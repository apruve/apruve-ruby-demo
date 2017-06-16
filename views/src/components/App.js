import React from 'react'
import { Container } from 'reactstrap'
import OrderForm from './OrderForm'

class App extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <OrderForm />
        </Container>
      </div>
    )
  }
}

export default App
