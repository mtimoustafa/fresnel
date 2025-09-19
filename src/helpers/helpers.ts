function getOrCreateMealPlan () {
  const mealPlan = localStorage.getItem('mealPlan')
  if (mealPlan == null) {
    console.log('No meal plan; initializing a new one.')

    // mealPlan[row][column]
    const emptyMealPlan = Array(scheduleDays.length).fill(Array(mealTypes.length).fill(null))
    return setMealPlan(emptyMealPlan)
  }

  return JSON.parse(mealPlan)
}

function setMealPlan (value) {
  localStorage.setItem('mealPlan', JSON.stringify(value))
  return value
}

const mealTypes = [
  'Breakfast',
  'Lunch',
  'Dinner',
]

const scheduleDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
]

export {
  getOrCreateMealPlan,
  mealTypes,
  scheduleDays,
  setMealPlan,
}
