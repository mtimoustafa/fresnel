import { useEffect, useOptimistic, useState } from 'react'

export default function useMeals () {
  const [mealsNav, setMealsNav] = useState({
    current: mealsPages.viewMeals,
    pages: mealsPages,
    navigate: newPage => setMealsNav({ ...mealsNav, current: newPage }),
  })
  const [mealsList, setMealsList] = useState([])
  const [loadingMeals, setloadingMeals] = useState(true)

  const [optimisticMealsList, addOptimisticMeal] = useOptimistic(
    mealsList,
    (currentMealsList, optimisticMeal) => {
      console.log('opt add', [...currentMealsList, optimisticMeal])
      return [...currentMealsList, optimisticMeal]
    },
  )

  const mealsPages = {
    viewMeals: 'viewMeals',
    addMeal: 'addMeal',
  }

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

  async function addMealToList (mealProperties) {
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
      console.log('adding')
      setMealsList([ ...mealsList, result])
    } catch (error) {
      console.error(error.message)
    }
  }

  return {
    mealsList,
    addMealToList,
    loadingMeals,
    optimisticMealsList,
    addOptimisticMeal,
  }
}
