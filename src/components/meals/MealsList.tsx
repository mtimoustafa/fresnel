import { useContext } from 'react'
import MealsContext from '../../contexts/MealsContext.ts'
import useMeals from '../../hooks/useMeals.tsx'
import MealCard from '../shared/MealCard.tsx'

export default function MealsList({ meals }) {
  const { loadingMeals, mealsNav: { pages, navigate } } = useContext(MealsContext)

  if (loadingMeals) {
    return <p>Loading...</p>
  }

  if (meals?.length === 0) {
    return <p>No meals yet.</p>
  }

  return (
    <div className="space-y-8">
      <ul className="flex flex-col gap-8">
        {meals.map((meal, index) => (
          <li key={index}>
            <MealCard
              name={meal.name}
              mealTypes={meal.mealTypes}
              difficulty={meal.difficulty}
              leftoverable={meal.leftoverable}
            />
          </li>
        ))}
      </ul>

      <button 
        onClick={() => navigate(pages.addMeal)}
        className="bg-gray-700 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900"
      >
        Add meal
      </button>
    </div>
  )
}
