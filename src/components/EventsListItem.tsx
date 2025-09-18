function EventsListItem ({ id, name, date, location, link }) {
  return (
    <>
      <li className="block border border-white rounded-lg">
        <a href={link} target="_blank" className="block py-4 px-8">
          <div>
            <p className="text-xs uppercase font-bold text-gray-400">{date.toDateString()}</p>
            <p className="text-xl mb-1">{name}</p>
            <p className="text-xs text-gray-400">{location}</p>
          </div>
        </a>
      </li>
    </>
  )
}

export default EventsListItem
