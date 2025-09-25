import { ErrorBoundary } from 'react-error-boundary'
import MealsList from './MealsList.tsx'

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
  return (
    <div>
      <h2 className="text-2xl mb-8">Meals</h2>

      <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
        <MealsList />
      </ErrorBoundary>
    </div>
  )
}
