import { useContext } from 'react'
import { useFormStatus } from 'react-dom'
import MealsContext from './MealsContext.tsx'

export default function AddMeal () {
  const { pages, navigate } = useContext(MealsContext)

  async function addMeal (mealData) {
    const meal = {
      name: mealData.get('name'),
      mealTypes: ['breakfast', 'lunch', 'dinner'].filter(mealType => mealData.has(mealType)),
      difficulty: mealData.get('difficulty'),
      leftoverable: mealData.has('leftoverable'),
    }

    await fetch(`${import.meta.env.VITE_SERVER_URL}/meals`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meal)
    })

    navigate(pages.allMeals)
  }

  function MealForm () {
    const { pending } = useFormStatus()

    return (
      <>
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
          disabled={pending}
        >
          {pending ? 'Adding...' : 'Add Meal'}
        </button>

        <button
          type="submit"
          className="bg-gray-700 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-900 disabled:cursor-auto"
          disabled={pending}
        >
          Cancel
        </button>
      </>
    )
  }

  return (
    <form action={addMeal} className="space-y-4">
      <MealForm />
    </form>
  )
}
