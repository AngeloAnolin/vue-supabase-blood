<template>
  <main class="card is-transparent">
    <div class="card-header">
      <p class="card-header-title has-background-dark has-text-white">
        {{ formattedDate }}
      </p>
    </div>

    <div class="card-content">
      <div class="content">
        <div class="level">
          <div class="level-item">
            <span class="is-size-1-desktop is-size-3-touch mr-2">
              {{ todo.reading.toFixed(1) }}
            </span>
            <span class="is-size-2-desktop is-size-4-touch">{{ todo.uom }}</span>
          </div>
        </div>

        <p>
          {{ todo.notes }}
        </p>

        <div class="notification is-size-2-desktop is-size-3-touch has-text-weight-semibold has-text-centered"
          :class="bloodRating">
          {{ bloodRating.text }}
        </div>
        
      </div>
    </div>

    <footer class="card-footer">
      <!--<p class="card-footer-item">
        <button class="button is-link is-outlined is-fullwidth">
          Edit
        </button>
      </p>-->
      <p class="card-footer-item">
        <button @click="clearTodo"
          class="button is-danger is-outlined is-fullwidth">
          Delete
        </button>
      </p>
    </footer>

  </main>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { format, parseISO } from 'date-fns'
  import Swal from 'sweetalert2'
  import { calculateTodoSummaries, deleteTodo } from '../utils/useTodo'
  import { allTodos } from '../utils/useTodo'

  export default defineComponent({
    name: 'Todo',
    props: {
      todo: {
        type: Object as PropType<Todo>,
        required: true,
      },
    },

    setup(props) {
      // Removes todo from supbase and also from app state
      function clearTodo() {
        Swal.fire({
          title: 'Are you sure you want to delete this reading?',
          showCancelButton: true,
          confirmButtonText: `Proceed`,
        }).then((result) => {
          if (result.isConfirmed) {
            deleteTodo(props.todo).then(() => {
              allTodos.value = allTodos.value.filter(todo => todo.id != props.todo.id)
              calculateTodoSummaries()
            })
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
        
      }

      return { 
        clearTodo, 
        calculateTodoSummaries 
      }
    },

    computed: {
      formattedDate (): any {
        const dd = parseISO(this.todo.inserted_at!)
        const fd = `${format(dd, 'MMMM d, yyyy')} at ${format(dd, 'hh:mm b')}`
        return fd
      },

      bloodRating (): any {
        switch (this.todo.uom) {
          case 'mmol/L': {
            if (this.todo.reading > 6.5) {
              return {
                text: "High",
                "is-danger": true
              }
            } else if (this.todo.reading >= 6) {
              return {
                text: "Elevated",
                "is-warning": true
              }
            } else if (this.todo.reading >= 4) {
              return {
                text: "Good",
                "is-primary": true
              }
            } else {
              return {
                text: "Low",
                "is-info": true
              }
            }
            break
          }
          case 'mg/dL': {
            if (this.todo.reading > 117) {
              return {
                text: "High",
                "is-danger": true
              }
            } else if (this.todo.reading >= 108) {
              return {
                text: "Elevated",
                "is-warning": true
              }
            } else if (this.todo.reading >= 72) {
              return {
                text: "Good",
                "is-primary": true
              }
            } else {
              return {
                text: "Low",
                "is-info": true
              }
            }
          }
        }
      }
    },
  })
</script>