import React, { Fragment } from 'react'
import DisplayTodos from './DisplayTodos'
import InputTodo from './InputTodo'
import Container from '@material-ui/core/Container'

const App = () => {
  return (
    <Fragment>
      <Container maxWidth='sm'>
        <DisplayTodos />
        <InputTodo />
      </Container>
    </Fragment>
  )
}

export default App
