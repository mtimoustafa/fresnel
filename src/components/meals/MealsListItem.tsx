export default function MealsListItem ({ name, mealTypes, difficulty, leftoverable }) {
  return (
    <>
      <li className="block border border-white rounded-lg py-4 px-8">
        <div>
          <p className="text-xs uppercase font-bold text-gray-400">{mealTypes.join(', ')}</p>
          <p className="text-xl mb-1">{name}</p>
          <p className="text-xs text-gray-400">{difficulty}{leftoverable ? ' - leftoverable' : ''}</p>
        </div>
      </li>
    </>
  )
}
