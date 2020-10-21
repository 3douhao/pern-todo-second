const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const { Pool } = require('pg')

require('dotenv').config()

const app = express()
const pool = new Pool({ connectionString: process.env.DB_URL })

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

app.get('/todos', async (req, res) => {
  const client = await pool.connect()
  try {
    const result = await client.query('select * from todos')
    res.json(result.rows)
  } catch (e) {
    console.log(e.message)
  } finally {
    client.release()
  }
})

app.get('/todos/:id', async (req, res) => {
  console.log(req.params)
  const id = req.params.id
  const client = await pool.connect()
  try {
    const result = await client.query('select * from todos where id = $1', [id])
    res.json(result.rows)
  } catch (e) {
    console.error(e.message)
  } finally {
    client.release()
  }
})

app.post('/todos', async (req, res) => {
  const client = await pool.connect()
  const { content } = req.body
  try {
    const result = await client.query(
      'insert into todos (content) values ($1) returning *',
      [content]
    )
    res.json(result.rows)
  } catch (e) {
    console.error(e.message)
  } finally {
    client.release()
  }
})

app.put('/todos/:id', async (req, res) => {
  const client = await pool.connect()
  const { id } = req.params
  const { content } = req.body
  try {
    const result = await client.query(
      'update todos set content = $1 where id = $2 returning *',
      [content, id]
    )
    res.json(result.rows[0])
  } catch (e) {
    console.error(e.message)
  } finally {
    client.release()
  }
})

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params
  const client = await pool.connect()
  try {
    await client.query('delete from todos where id = $1', [id])
    res.send('delete successfully')
  } catch (e) {
    console.error(e.message)
  } finally {
    client.release()
  }
})

app.listen(process.env.PORT, () =>
  console.log('Server running,  horayayayayay!!!')
)
