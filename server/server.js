import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.port ?? 3000

let mealsMockLastId = 3
let meals = [
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
]

app.use(express.json())
app.use(cors({
  origin: '*',
}))

app.get('/', (request, response) => {
  try {
    response.status(200).send({ status: 'up' })
  } catch (error) {
    console.error(error)
    return response.status(500).send({ error })
  }
})

app.get('/meals', (request, response) => {
  try {
    response.status(200).send({ meals: meals })
  } catch (error) {
    console.error(error)
    return response.status(500).send({ error })
  }
})

app.post('/meals', async (request, response) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newMeal = {
      ...(request.body),
      id: ++mealsMockLastId,
    }
    meals.push(newMeal)
    return response.status(201).send(newMeal)
  } catch (error) {
    console.error(error)
    return response.status(500).send({ error })
  }
})

app.listen(port, () => {
  console.info(`Running in ${process.env.NODE_ENV} mode. Listening on port ${port}.`)
})
