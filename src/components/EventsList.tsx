import EventsListItem from './EventsListItem.tsx'

const sampleEvents = [
  {
    id: 1,
    name: "Conference 1",
    date: new Date(2025, 10, 1),
    location: "Kitchener, Canada",
    link: "https://fairewinds.ca",
  },
  {
    id: 2,
    name: "Conference 2",
    date: new Date(2025, 12, 24),
    location: "Osnabrueck, Germany",
    link: "https://thenicestplace.net",
  },
  {
    id: 3,
    name: "Conference 3",
    date: new Date(2026, 2, 16),
    location: "Utrecht, The Netherlands",
    link: "https://kagi.com",
  },
]

function EventsList() {
  return (
    <>
      <main className="px-16 py-8">
        <h2 className="text-2xl mb-8">Upcoming Conferences</h2>

        <ul className="flex flex-wrap gap-8">
          {sampleEvents.map(event => (
            <EventsListItem
              key={event.id}
              name={event.name}
              date={event.date}
              location={event.location}
              link={event.link}
            />
          ))}
        </ul>
      </main>
    </>
  )
}

export default EventsList
