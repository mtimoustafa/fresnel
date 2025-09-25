import { useEffect, useRef, useState } from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import MealsListItem from '../meals/MealsListItem.tsx'

export default function ScheduleField ({ mealPlan, mealType, scheduleDay }) {
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

  return (
    <td
      ref={scheduleField}
      className={`px-4 py-2 rounded-md bg-gray-${isDraggedOver ? '700' : '900'}`}
    >
      {mealPlan && mealPlan[scheduleDay][mealType] && <MealsListItem {...mealPlan[scheduleDay][mealType]} />}
    </td>
  )
}
