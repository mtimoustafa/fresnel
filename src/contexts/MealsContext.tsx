import { createContext, useContext, useEffect, useState } from 'react'

const pages = {
  viewMeals: 'viewMeals',
  addMeal: 'addMeal',
}

const MealsContext = createContext(null)

export function useMealsContext () { return useContext(MealsContext) }

export function MealsProvider ({ children }) {
  const [mealsContext, setMealsContext] = useState({
    mealsList: [],
    loadingMeals: false,
    addMeal,
    mealsNav: {
      current: pages.viewMeals,
      pages,
      navigate: newPage => setMealsContext({ ...mealsContext, navigation: { ...(mealsContext.navigation), current: newPage } }),
    }
  })

  useEffect(() => {
    fetchMealsList()
  }, [])

  async function fetchMealsList () {
    setMealsContext({ ...mealsContext, loadingMeals: true })

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/meals`)

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const result = await response.json()

      setMealsContext({ ...mealsContext, mealsList: result.meals })
    } catch (error) {
      console.error(error.message)
    }

    setMealsContext({ ...mealsContext, loadingMeals: false })
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

      setMealsContext({ ...mealsContext, mealsList: [ ...mealsList, result ] })
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <MealsContext value={mealsContext}>
      {children}
    </MealsContext>
  )
}
