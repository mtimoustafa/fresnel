import { createContext } from 'react'

const pages = {
  viewMeals: 'viewMeals',
  addMeal: 'addMeal',
}

const defaultMealsContext = {
  current: pages.viewMeals,
  pages,
  navigate: newPage => setMealsNav({ ...mealsNav, current: newPage }),
}

export default createContext(defaultMealsContext)

