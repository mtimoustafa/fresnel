import { useContext } from 'react'
import MealsContext from './MealsContext.tsx'
import MealsList from './MealsList.tsx'
import AddMeal from './AddMeal.tsx'

export default function MealsView ({ currentView }) {
  const { pages } = useContext(MealsContext)

  switch (currentView) {
    case pages.addMeal:
      return (
        <>
          <h3 className="text-xl mt-8 mb-4">Add Meal</h3>
          <AddMeal />
        </>
      )
    case pages.viewMeals:
    default:
      return (
        <>
          <h2 className="text-2xl mb-4">Meals</h2>
          <MealsList />
        </>
      )
  }
}
