import React, { useState, Fragment } from 'react'
import axios from 'axios'
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'

const EditTodo = ({ todo }) => {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState(todo.content)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleChange = e => {
    setContent(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8000/todos/${todo.id}`, {
        content: content
      })
      setOpen(false)
      window.location = '/'
    } catch (e) {
      console.error(e.message)
    }
  }
  const handleClose = () => {
    setOpen(false)
    setContent(todo.content)
  }
  return (
    <Fragment>
      <Button color='primary' variant='contained' onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit todo</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Edit the todo below</DialogContentText> */}
          <TextField value={content} fullWidth onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button color='primary' variant='contained' onClick={handleClose}>
            Cancel
          </Button>
          <Button color='secondary' variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default EditTodo
