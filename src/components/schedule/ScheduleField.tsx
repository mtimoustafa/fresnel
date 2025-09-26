import { useContext, useEffect, useRef, useState } from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import ScheduleContext from './ScheduleContext.tsx'
import MealCard from '../shared/MealCard.tsx'

export default function ScheduleField ({ meal, mealType, scheduleDay }) {
  const { updateMealPlan } = useContext(ScheduleContext)

  const [isDraggedOver, setIsDraggedOver] = useState(false)

  const scheduleField = useRef(null)

  useEffect(() => {
    return dropTargetForElements({
      element: scheduleField.current,
      getData: () => ({ component: 'ScheduleField', mealType, scheduleDay }),
      onDragEnter: ({ source }) => {
        if (source.data.mealTypes.includes(mealType)) {
          setIsDraggedOver(true)
        }
      },
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    })
  }, [])

  function removeMealFromPlan () {
    updateMealPlan({
      scheduleDay,
      mealType,
      newMealPlan: null,
    })
  }

  return (
    <td
      ref={scheduleField}
      className={`px-4 py-2 rounded-md bg-gray-${isDraggedOver ? '700' : '900'}`}
    >
      {meal &&
        <MealCard
          {...meal}
          scheduledTo={{ mealType, scheduleDay }}
          removable={true}
          onRemove={removeMealFromPlan}
        />
      }
    </td>
  )
}
