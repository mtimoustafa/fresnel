import { useEffect, useRef, useState } from 'react'
import MealsListItem from './MealsListItem.tsx'

export default function MealsList() {
  const [mealsList, setMealsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMealsList()
  }, [])

  async function fetchMealsList () {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/meals`)

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const result = await response.json()

      setMealsList(result.meals)
      setIsLoading(false)
      console.log(result)

    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <h2 className="text-2xl mb-8">Meals</h2>

      {isLoading && <p>Loading...</p>}

      {mealsList.length === 0 ? <p>No meals yet.</p> :
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
        </ul>}
    </div>
  )
}
