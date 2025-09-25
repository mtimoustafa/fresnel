import { useEffect, useRef, useState } from 'react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

export default function MealCard ({ name, mealTypes, difficulty, leftoverable, removable=false, onRemove }) {
  const meal = useRef(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    return draggable({
      element: meal.current,
      getInitialData: () => ({ name, mealTypes, difficulty, leftoverable }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    })
  }, [])

  return (
    <div ref={meal}
      className={
        `flex justify-between items-start gap-4 border border-white rounded-lg bg-gray-800 py-4
          ${removable ? 'px-4' : 'px-8'}
          ${dragging && 'opacity-50'}
        `}
    >
      <div>
        <p className="text-xs uppercase font-bold text-gray-400">{mealTypes.join(', ')}</p>
        <p className="text-xl mb-1">{name}</p>
        <p className="text-xs text-gray-400">{difficulty}{leftoverable ? ' - leftoverable' : ''}</p>
      </div>
      {removable &&
        <button
          onClick={onRemove}
          className="bg-gray-700 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-800 active:bg-gray-900"
        >
          X
        </button>
      }
    </div>
  )
}
