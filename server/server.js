import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const port = process.env.port ?? 3000

// TODO: change this if this server will be deployed beyond localhost
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/', (request, response) => {
  try {
    response.status(200).send({ status: 'up' })
  } catch (error) {
    return response.status(500).send({ error })
  }
})

app.get('/meals', (request, response) => {
  try {
    response.status(200).send({ meals: [
      {
        id: 1,
        name: 'Tacos',
        mealTypes: ['lunch', 'dinner'],
        difficulty: 'easy',
        leftoverable: false,
      },
      {
        id: 2,
        name: 'Stuffed bell peppers',
        mealTypes: ['dinner'],
        difficulty: 'easy',
        leftoverable: true,
      },
      {
        id: 3,
        name: 'Overnight oats',
        mealTypes: ['breakfast'],
        difficulty: 'easy',
        leftoverable: true,
      },
    ]})
  } catch (error) {
    return response.status(500).send({ error })
  }
})

app.listen(port, () => {
  console.info(`Running in ${process.env.NODE_ENV} mode. Listening on port ${port}.`)
})
