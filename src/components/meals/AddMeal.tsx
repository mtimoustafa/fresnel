import { useContext, useState, useTransition } from 'react'
import MealsContext from './MealsContext.tsx'

export default function AddMeal () {
  const { pages, navigate } = useContext(MealsContext)
  const [isPending, startTransition] = useTransition()

  const [meal, setMeal] = useState({
    name: '',
    mealTypes: {
      breakfast: false,
      lunch: false,
      dinner: false,
    },
    difficulty: 'easy',
    leftoverable: false,
  })

  function updateMealType (e) {
    return setMeal({
      ...meal,
      mealTypes: {
        ...(meal.mealTypes),
        [e.target.id]: e.target.checked,
      }
    })
  }

  function updateMeal (e) {
    setMeal({ ...meal, [e.target.id]: e.target.value })
  }

  function addMeal (e) {
    e.preventDefault()

    startTransition(async () => {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/meals`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...meal,
          mealTypes: Object.keys(meal.mealTypes).filter(key => meal.mealTypes[key]),
        })
      })

      navigate(pages.allMeals)
    })
  }

  return (
    <form onSubmit={addMeal} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={meal.name} onChange={updateMeal} />
      </div>

      <div>
        <fieldset>
          <legend>Meal Type</legend>

          <input type="checkbox" id="breakfast" checked={meal.mealTypes.breakfast} onChange={updateMealType} />
          <label htmlFor="breakfast">Breakfast</label>

          <input type="checkbox" id="lunch" checked={meal.mealTypes.lunch} onChange={updateMealType} />
          <label htmlFor="lunch">Lunch</label>

          <input type="checkbox" id="dinner" checked={meal.mealTypes.dinner} onChange={updateMealType} />
          <label htmlFor="dinner">Dinner</label>
        </fieldset>
      </div>

      <div>
        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" value={meal.difficulty} onChange={updateMeal}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <input type="checkbox" id="leftoverable" checked={meal.leftoverable} onChange={updateMeal} />
        <label htmlFor="leftoverable">Can have leftovers</label>
      </div>

      <button
        type="submit"
        className="bg-gray-700 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-900 disabled:cursor-auto"
        disabled={isPending}
      >
        {isPending ? 'Adding...' : 'Add Meal'}
      </button>

      <button
        onClick={() => navigate(pages.allMeals)}
        className="bg-gray-700 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-900 disabled:cursor-auto"
        disabled={isPending}
      >
        Cancel
      </button>
    </form>
  )
}
