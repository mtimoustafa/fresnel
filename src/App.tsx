import Header from './components/Header.tsx'
import Schedule from './components/schedule/Schedule.tsx'
import Meals from './components/meals/Meals.tsx'

export default function App() {
  return (
    <>
      <Header />

      <main className="grid grid-cols-3 px-16 py-8 gap-8">
        <Schedule />
        <Meals />
      </main>
    </>
  )
}
