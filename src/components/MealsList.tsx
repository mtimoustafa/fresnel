import { useEffect, useState } from 'react'
import MealsListItem from './MealsListItem.tsx'

async function fetchMealsList () {
  let result = []

  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/meals`)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    result = await response.json()
    console.log(result)
  } catch (error) {
    console.error(error.message)
  } finally {
    return result
  }
}

export default function MealsList() {
  const [mealsList, setMealsList] = useState([])

  useEffect(() => {
    setMealsList(fetchMealsList())
  }, [])

  return (
    <div>
      <h2 className="text-2xl mb-8">Meals</h2>

      <ul className="flex flex-col gap-8">
        {mealsList.map(meal => (
          <MealsListItem
            key={meal.id}
            name={meal.name}
            mealTypes={meal.mealTypes}
            difficulty={meal.difficulty}
            leftoverable={meal.leftoverable}
          />
        ))}
      </ul>
    </div>
  )
}
