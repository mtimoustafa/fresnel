import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import MealsContext from './MealsContext.tsx'
import MealsView from './MealsView.tsx'

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

const mealsPages = {
  viewMeals: 'viewMeals',
  addMeal: 'addMeal',
}

export default function Meals () {
  const [mealsNav, setMealsNav] = useState({
    current: mealsPages.viewMeals,
    pages: mealsPages,
    navigate: newPage => setMealsNav({ ...mealsNav, current: newPage }),
  })

  return (
    <MealsContext value={mealsNav}>
      <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
        <div>
          <MealsView currentView={mealsNav.current} />
        </div>
      </ErrorBoundary>
    </MealsContext>
  )
}
