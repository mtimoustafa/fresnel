import useMeals from '../../hooks/useMeals.tsx'
import MealsListItem from './MealsListItem.tsx'

export default function MealsList() {
  const { mealsList, loadingMeals } = useMeals()

return (
    <>
      {loadingMeals ? <p>Loading...</p> : mealsList.length === 0 ? <p>No meals yet.</p> :
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
    </>
  )
}
