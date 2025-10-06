import { useContext, useOptimistic } from 'react'
import MealsContext from '../../contexts/MealsContext.ts'

export default function AddMeal () {
  const { addMealToList, addOptimisticMeal, mealsNav: { pages, navigate } } = useContext(MealsContext)

  const [optimisticMealsList, addOptimisticMeal] = useOptimistic(
    mealsList,
    (currentMealsList, optimisticMeal) => {
      console.log('opt add', [...currentMealsList, optimisticMeal])
      return [...currentMealsList, optimisticMeal]
    },
  )

  function addMeal (mealData) {
    const mealProperties = {
      name: mealData.get('name'),
      mealTypes: ['breakfast', 'lunch', 'dinner'].filter(mealType => mealData.has(mealType)),
      difficulty: mealData.get('difficulty'),
      leftoverable: mealData.has('leftoverable'),
    }

    addOptimisticMeal(mealProperties)
    addMealToList(mealProperties)
    navigate(pages.viewMeals)
  }

  return (
    <form action={addMeal} className="space-y-4">
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
      >
        Add meal
      </button>

      <button
        onClick={() => navigate(pages.viewMeals)}
        className="bg-gray-700 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-900 disabled:cursor-auto"
      >
        Cancel
      </button>
    </form>
  )
}
