import { useContext } from 'react'
import MealsContext from './MealsContext.tsx'
import MealsList from './MealsList.tsx'
import AddMeal from './AddMeal.tsx'

export default function MealsView () {
  const { mealsNav: { current, pages } } = useContext(MealsContext)

  switch (current) {
    case pages.addMeal:
      return (
        <div>
          <h3 className="text-xl mt-8 mb-4">Add Meal</h3>
          <AddMeal />
        </div>
      )
    case pages.viewMeals:
    default:
      return (
        <div>
          <h2 className="text-2xl mb-4">Meals</h2>
          <MealsList />
        </div>
      )
  }
}
