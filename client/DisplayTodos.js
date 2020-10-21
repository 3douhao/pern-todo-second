import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import EditTodo from './EditTodo'

const DisplayTodos = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    const response = await axios.get('http://localhost:8000/todos')
    setTodos(response.data)
  }

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (e) {
      console.error(e.message)
    }
  }

  // const handleChange = e => {
  //   setTodo({ content: e.target.value })
  // }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map(todo => (
            <TableRow key={todo.id}>
              <TableCell>{todo.id}</TableCell>
              <TableCell>{todo.content}</TableCell>
              <TableCell>
                <EditTodo todo={todo} />
              </TableCell>
              <TableCell>
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default DisplayTodos
