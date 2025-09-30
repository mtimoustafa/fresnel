import { useActionState, useContext } from 'react'
import MealsContext from './MealsContext.tsx'

export default function AddMeal () {
  const { pages, navigate } = useContext(MealsContext)

  const [ addMealState, addMealFunction, isPendingAddMeal ] = useActionState(addMeal, {
    meal: {
      name: '',
      mealTypes: [],
      difficulty: 'easy',
      leftoverable: false,
    },
    error: null,
  })

  async function addMeal (previousMealState, mealData) {
    const mealProperties = {
      name: mealData.get('name'),
      mealTypes: ['breakfast', 'lunch', 'dinner'].filter(mealType => mealData.has(mealType)),
      difficulty: mealData.get('difficulty'),
      leftoverable: mealData.has('leftoverable'),
    }

    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/meals`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealProperties)
      })
    } catch (error) {
      return { error: error.message, meal: mealProperties }
    }

    navigate(pages.allMeals)
    return { meal: mealProperties, error: null }
  }

  return (
    <form action={addMealFunction} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>

      <div>
        <fieldset>
          <legend>Meal Type</legend>

          <input type="checkbox" id="breakfast" name="breakfast" />
          <label htmlFor="breakfast">Breakfast</label>

          <input type="checkbox" id="lunch" name="lunch" />
          <label htmlFor="lunch">Lunch</label>

          <input type="checkbox" id="dinner" name="dinner" />
          <label htmlFor="dinner">Dinner</label>
        </fieldset>
      </div>

      <div>
        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" name="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <input type="checkbox" id="leftoverable" name="leftoverable" />
        <label htmlFor="leftoverable">Can have leftovers</label>
      </div>

      <button
        type="submit"
        className="bg-gray-700 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-900 disabled:cursor-auto"
        disabled={isPendingAddMeal}
      >
        {isPendingAddMeal ? 'Adding...' : 'Add Meal'}
      </button>

      <button
        onClick={() => navigate(pages.allMeals)}
        className="bg-gray-700 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-900 disabled:cursor-auto"
        disabled={isPendingAddMeal}
      >
        Cancel
      </button>

      {addMealState.error &&
        <p>{addMealState.error}</p>
      }
    </form>
  )
}
