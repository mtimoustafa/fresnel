import { useEffect, useState } from 'react'

export default function useMeals () {
  const [mealsList, setMealsList] = useState([])
  const [loadingMeals, setloadingMeals] = useState(true)

  useEffect(() => {
    fetchMealsList()
  }, [])

  async function fetchMealsList () {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/meals`)

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const result = await response.json()

      setMealsList(result.meals)
      setloadingMeals(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  return { mealsList, loadingMeals }
}
