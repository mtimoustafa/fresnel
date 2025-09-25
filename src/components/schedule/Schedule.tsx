import useSchedule from '../../hooks/useSchedule.tsx'
import ScheduleContext from './ScheduleContext.tsx'
import ScheduleField from './ScheduleField.tsx'

export default function Schedule () {
  const { mealPlan, updateMealPlan, mealTypes, scheduleDays } = useSchedule()

  if (!mealPlan) {
    return <p>Loading...</p>
  }

  return (
    <ScheduleContext value={{ updateMealPlan }}>
      <div className="col-span-2">
        <h2 className="text-2xl mb-8">Schedule</h2>

        <table className="table-fixed border-separate border-spacing-2 w-full h-full">
          <thead>
            <tr>
              <th></th>
              {mealTypes.map(mealType => (
                <th key={mealType} scope="col" className="px-4 py-2 bg-gray-800 rounded-md capitalize">{mealType}</th>
              ))}
            </tr>
            {scheduleDays.map(day => (
              <tr key={day}>
                <th scope="row" className="px-4 py-2 bg-gray-800 rounded-md capitalize">{day}</th>
                
                {mealTypes.map(mealType => (
                  <ScheduleField
                    key={`${day}_${mealType}`}
                    mealType={mealType}
                    scheduleDay={day}
                    meal={mealPlan[day][mealType]}
                  />
                ))}
              </tr>
            ))}
          </thead>
        </table>
      </div>
    </ScheduleContext>
  )
}
