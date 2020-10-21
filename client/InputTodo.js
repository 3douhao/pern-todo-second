import React, { Fragment, useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'

const InputTodo = () => {
  const [todo, setTodo] = useState('')
  // const [todos, setTodos] = useState([])
  // useEffect(async () => {
  //   try {
  //     const result = await axios.get('http://localhost:8000/todos')
  //     setTodos(result.data)
  //   } catch (e) {
  //     console.error(e.message)
  //   }
  // })
  const handleChange = e => {
    setTodo(e.target.value)
  }

  const handleInput = async () => {
    try {
      await axios.post('http://localhost:8000/todos', {
        content: todo
      })
      // window.location = '/'
      setTodo('')
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <Fragment>
      <TextField
        placeholder='Add a todo here'
        fullWidth
        color='primary'
        margin='normal'
        variant='filled'
        type='string'
        value={todo}
        onChange={handleChange}
      />
      <Button
        variant='contained'
        size='small'
        onClick={handleInput}
        color='green'
      >
        Add Todo
      </Button>
    </Fragment>
  )
}

export default InputTodo
