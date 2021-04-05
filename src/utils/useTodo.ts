import { ref } from 'vue'
import { format, isEqual, isWithinInterval, parseISO, sub } from 'date-fns'
import { supabase } from '../lib/supabase'
import Swal from 'sweetalert2'

const allTodos = ref<Todo[]>([])

const errorInfo = ref('')

const todayAverageObj = ref<Average>({molar: 0, mass: 0, background: {text: '', backgroundClass: ''} })
const lastWeekAverageObj = ref<Average>({molar: 0, mass: 0, background: {text: '', backgroundClass: ''} })
const allTimeAverageObj = ref<Average>({molar: 0, mass: 0, background: {text: '', backgroundClass: ''} })

// const todayAverageObj = ref({
//   molar: Number,
//   mass: Number,
//   background: String
// })

// const lastWeekAverageObj = ref({
//   molar: Number,
//   mass: Number,
//   background: String
// })

// const allTimeAverageObj = ref({
//   molar: Number,
//   mass: Number,
//   background: String
// })


async function fetchTodos() {
  try {
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      const footerMsg = (error.message === 'JWT expired') ? 'Please refresh your screen' : error.message
      const textMsg = (error.message === 'JWT expired') ? 'Your session has expired.' : error.message
      errorInfo.value = (error.message === 'JWT expired') ? 'SESSION_EXPIRED' : 'OTHER_ERROR'
      Swal.fire({
        icon: 'error',
        title: 'Blood Sugar',
        text: `${textMsg}`,
        footer: `${footerMsg}`
      })
      return
    }
    // handle for when no todos are returned
    if (todos === null) {
      allTodos.value = []
      todayAverageObj.value = {
        molar: 0,
        mass: 0,
        background: {
          text: '',
          backgroundClass: 'has-background-light'
        }
      }

      lastWeekAverageObj.value = {
        molar: 0,
        mass: 0,
        background: {
          text: '',
          backgroundClass: 'has-background-light'
        }
      }

      allTimeAverageObj.value = {
        molar: 0,
        mass: 0,
        background: {
          text: '',
          backgroundClass: 'has-background-light'
        }
      }
      return
    }
    
    // store response to allTodos
    allTodos.value = todos

    calculateTodoSummaries()
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'API Error',
      text: 'An error occured retrieving records. Please try again.',
      footer: `${err}`
    })
  }
}

/**
 *  Add a new todo to supabase
 */
 async function addTodo(todo: Todo): Promise<null | Todo> {
  try {
    const { data, error } = await supabase
      .from('todos')
      .insert(todo)
      .single()

    if (error) {
      const msg = "An error occurred adding a new record. Please try again." 
      Swal.fire({
        icon: 'error',
        title: 'Blood Sugar',
        text: msg,
        footer: `${error.message}`
      }).then((result) => {
        return null
      })
    }
    return data
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Blood Sugar',
      text: 'Unable to add new reading due to an API issue.',
      footer: `${err.message}`
    })
    
    return null
  }
}

/**
 * Targets a specific todo via its record id and updates the is_completed attribute.
 */
 async function updateTaskCompletion(todo: Todo, isCompleted: boolean) {
  try {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: isCompleted })
      .eq('id', todo.id)
      .single()

    if (error) {
      alert(error.message)
      console.error('There was an error updating', error)
      return
    }

    console.log('Updated task', todo.id)
  } catch (err) {
    alert('Error')
    console.error('Unknown problem updating record', err)
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteTodo(todo: Todo) {
  try {
    await supabase
      .from('todos')
      .delete()
      .eq('id', todo.id)
    
      Swal.fire({
        icon: 'success',
        title: 'Blood Sugar',
        text: 'Record successfully deleted.',
        footer: ``
      })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Blood Sugar',
      text: 'Error deleting record.',
      footer: `${error.message}`
    })
  }
}

async function calculateTodoSummaries () {
  const currentDate = parseISO(format((new Date()), 'yyyy-MM-dd'))
  const lastWeekDate = parseISO(format(sub(new Date(), { days: 7}), 'yyyy-MM-dd'))

  // today average
  const todayTodos = allTodos.value.filter(x => {
    const dd = parseISO(format((parseISO(x.inserted_at!)), 'yyyy-MM-dd'))
    return isEqual(dd, currentDate)
  })

  const todayAllReadingsMolar = todayTodos.map(x=> {
    return (x.uom === 'mg/dL') ? (x.reading/17) : x.reading
  })

  const todayAllReadingsMolarAvg = (todayTodos.length > 0) ? (todayAllReadingsMolar.reduce((a, b) => a + b, 0)/todayTodos.length) : 0

  const todayAllReadingsMass = todayTodos.map(x=> {
    return (x.uom === 'mmol/L') ? (x.reading * 17) : x.reading
  })

  const todayAllReadingsMassAvg = (todayTodos.length > 0) ? (todayAllReadingsMass.reduce((a, b) => a + b, 0)/todayTodos.length) : 0
  
  const readingsBackground = ((molarValue: number) => {
    if (molarValue > 6.5) {
      return {
        text: "High",
        backgroundClass: "has-background-danger"
      }
    } else if (molarValue >= 6) {
      return {
        text: "Elevated",
        backgroundClass: "has-background-warning"
      }
    } else if (molarValue >= 4) {
      return {
        text: "Good",
        backgroundClass: "has-background-primary"
      }
    } else if (molarValue === 0) {
      return {
        text: "No Reading",
        backgroundClass: "has-background-link"
      }
    } else {
      return {
        text: "Low",
        backgroundClass: "has-background-info"
      }
    }
  })

  todayAverageObj.value = {
    molar: todayAllReadingsMolarAvg,
    mass: todayAllReadingsMassAvg,
    background: readingsBackground(todayAllReadingsMolarAvg)
  }

  // 7 days average
  const lastWeekTodos = allTodos.value.filter(x => {
    const dd = parseISO(format((parseISO(x.inserted_at!)), 'yyyy-MM-dd'))
    return isWithinInterval(dd, {
      start: lastWeekDate,
      end: currentDate
    })
  })

  // const lastWeekAllReadings = lastWeekTodos.map(x => {
  //   return x.reading
  // })

  const lastWeekAllReadingsMolar = lastWeekTodos.map(x => {
    return (x.uom === 'mg/dL') ? (x.reading/17) : x.reading
  })

  const lastWeekAllReadingsMolarAvg = (lastWeekAllReadingsMolar.reduce((a, b) => a + b, 0)/lastWeekTodos.length)
  
  const lastWeekAllReadingsMass = lastWeekTodos.map(x => {
    return (x.uom === 'mmol/L') ? (x.reading * 17) : x.reading
  })

  const lastWeekAllReadingsMassAvg = (lastWeekAllReadingsMass.reduce((a, b) => a + b, 0)/lastWeekTodos.length)
  
  lastWeekAverageObj.value = {
    molar: lastWeekAllReadingsMolarAvg,
    mass: lastWeekAllReadingsMassAvg,
    background: readingsBackground(lastWeekAllReadingsMolarAvg)
  }

  const allTimeAllReadingsMolar = allTodos.value.map(x=> {
    return (x.uom === 'mg/dL') ? (x.reading/17) : x.reading
  })

  const allTimeAllReadingsMolarAvg = (allTimeAllReadingsMolar.reduce((a, b) => a + b, 0)/allTodos.value.length)

  const allTimeAllReadingsMass = allTodos.value.map(x=> {
    return (x.uom === 'mmol/L') ? (x.reading * 17) : x.reading
  })

  const allTimeAllReadingsMassAvg = (allTimeAllReadingsMass.reduce((a, b) => a + b, 0)/allTodos.value.length)

  allTimeAverageObj.value = {
    molar: allTimeAllReadingsMolarAvg,
    mass: allTimeAllReadingsMassAvg,
    background: readingsBackground(allTimeAllReadingsMolarAvg)
  }
}

export { 
  allTodos, 
  fetchTodos, 
  addTodo, 
  updateTaskCompletion, 
  deleteTodo,
  calculateTodoSummaries,
  todayAverageObj,
  lastWeekAverageObj,
  allTimeAverageObj,
  errorInfo
}

