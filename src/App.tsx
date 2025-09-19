import Header from './components/Header.tsx'
import MealSchedule from './components/MealSchedule.tsx'
import MealsList from './components/MealsList.tsx'

export default function App() {
  return (
    <>
      <Header />

      <main className="grid grid-cols-3 px-16 py-8 gap-8">
        <MealSchedule />
        <MealsList />
      </main>
    </>
  )
}
