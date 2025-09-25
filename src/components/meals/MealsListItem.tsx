import { useEffect, useRef, useState } from 'react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

export default function MealsListItem (props) {
  const { name, mealTypes, difficulty, leftoverable } = props
  const meal = useRef(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    return draggable({
      element: meal.current,
      getInitialData: () => props,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    })
  }, [])

  return (
    <div ref={meal}
      className={`block border border-white rounded-lg py-4 px-8 bg-gray-800 ${dragging && 'opacity-50'}`}
    >
      <p className="text-xs uppercase font-bold text-gray-400">{mealTypes.join(', ')}</p>
      <p className="text-xl mb-1">{name}</p>
      <p className="text-xs text-gray-400">{difficulty}{leftoverable ? ' - leftoverable' : ''}</p>
    </div>
  )
}
