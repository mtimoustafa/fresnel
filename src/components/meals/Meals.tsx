import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import MealsContext from '../../contexts/MealsContext.ts'
import MealsNavigationContext from '../../contexts/MealsNavigationContext.ts'

// import MealsView from './MealsView.tsx'
import MealsList from './MealsList.tsx'
import AddMeal from './AddMeal.tsx'

function logError (error, info) {
  console.error(error, info)
}

function Fallback ({ error, resetErrorBoundary }) {
  return (
    <>
      <p class="mb-4">Something went wrong :&#40;</p>
      <button
        autoFocus
        onClick={resetErrorBoundary}
        className="bg-gray-700 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900"
      >
        Reload meals
      </button>
    </>
  )
}

export default function Meals () {
  const [meals, setMeals] = useState()
  const [mealsNavigation, setMealsNavigation] = useState()

  return (
    <MealsNavigationContext value={mealsNavigation}>
      <MealsContext value={meals}>
        <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
          <MealsList />
          <AddMeal />
        </ErrorBoundary>
      </MealsContext>
    </MealsNavigationContext>
  )
}
