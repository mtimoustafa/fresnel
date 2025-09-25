import { useCallback, useEffect, useState } from 'react'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

export default function useSchedule () {
  const [mealPlan, setMealPlan] = useState()

  const [mealTypes, setMealTypes] = useState([
    'breakfast',
    'lunch',
    'dinner',
  ])

  const [scheduleDays, setScheduleDays] = useState([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ])

  useEffect(() => {
    setMealPlan(getMealPlan())
  }, [])

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0]
        if (!destination || destination.data.component !== 'ScheduleField') return

        if (source.data.mealTypes.includes(destination.data.mealType)) {
          updateMealPlan({
            scheduleDay: destination.data.scheduleDay,
            mealType: destination.data.mealType,
            meal: source.data,
          })
        }
      }
    })
  }, [mealPlan])

  function getMealPlan () {
    const mealPlan = localStorage.getItem('mealPlan')

    if (mealPlan == null) {
      console.log('No meal plan; initializing a new one.')
      return createMealPlan()
    }

    return JSON.parse(mealPlan)
  }

  function createMealPlan () {
    // Format: mealPlan.scheduleDay.mealType
    return Object.fromEntries(
      scheduleDays.map(day => [
        day,
        Object.fromEntries(mealTypes.map(mealType => [mealType, null]))
      ])
    )
  }

  function updateMealPlan ({ scheduleDay, mealType, meal }) {
    setMealPlan(mealPlan => {
      mealPlan[scheduleDay][mealType] = meal
      return { ...mealPlan }
    })

    saveMealPlan(mealPlan)
  }

  function saveMealPlan (value) {
    localStorage.setItem('mealPlan', JSON.stringify(value))
  }

  return { mealPlan, updateMealPlan, mealTypes, scheduleDays }
}
