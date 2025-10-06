import { createContext, useEffect } from 'react'

const [mealsList, setMealsList] = useState([])
const [loadingMeals, setLoadingMeals] = useState(true)

useEffect(() => {
  fetchMealsList()
}, [])

async function fetchMealsList () {
  setLoadingMeals(true)

  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/meals`)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const result = await response.json()

    setMealsList(result.meals)
  } catch (error) {
    console.error(error.message)
  }

  setLoadingMeals(false)
}

async function addMeal (mealProperties) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/meals`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mealProperties)
    })

    const result = await response.json()

    // setMealsList([ ...mealsList, result])
  } catch (error) {
    console.error(error.message)
  }
}

export default createContext({
  mealsList,
  loadingMeals,
  addMeal,
})
