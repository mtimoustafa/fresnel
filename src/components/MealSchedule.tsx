import { useState } from 'react'
import { scheduleDays, mealTypes, getOrCreateMealPlan, setMealPlan as saveMealPlan } from '../helpers/helpers.ts'

export default function MealSchedule () {
  const [mealPlan, setMealPlan] = useState(getOrCreateMealPlan())

  return (
    <div className="col-span-2">
      <h2 className="text-2xl mb-8">Schedule</h2>

      <table className="table-fixed border-separate border-spacing-2 w-full h-full">
        <thead>
          <tr>
            <th></th>
            {mealTypes.map(mealType => (
              <th key={mealType} scope="col" className="px-4 py-2 bg-gray-800 rounded-md">{mealType}</th>
            ))}
          </tr>
          {scheduleDays.map(day => (
            <tr key={day}>
              <th scope="row" className="px-4 py-2 bg-gray-800 rounded-md">{day}</th>
              
              {mealTypes.map(mealType => (
                <td key={`${day}_${mealType}`} className="px-4 py-2 bg-gray-900 rounded-md"></td>
              ))}
            </tr>
          ))}
        </thead>
      </table>
    </div>
  )
}
