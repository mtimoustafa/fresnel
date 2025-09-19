import MealsListItem from './MealsListItem.tsx'

const sampleMeals = [
  {
    id: 1,
    name: 'Tacos',
    mealTypes: ['lunch', 'dinner'],
    difficulty: 'easy',
    leftoverable: false,
  },
  {
    id: 2,
    name: 'Stuffed bell peppers',
    mealTypes: ['dinner'],
    difficulty: 'easy',
    leftoverable: true,
  },
  {
    id: 3,
    name: 'Overnight oats',
    mealTypes: ['breakfast'],
    difficulty: 'easy',
    leftoverable: true,
  },
]

export default function MealsList() {
  return (
    <div>
      <h2 className="text-2xl mb-8">Meals</h2>

      <ul className="flex flex-col gap-8">
        {sampleMeals.map(meal => (
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
