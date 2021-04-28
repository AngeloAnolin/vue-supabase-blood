<template>
  <div class="container is-fluid">
    <div class="columns is-multiline">
      <div class="column">
        <div class="box"
          :class="todayAverageObj.background.backgroundClass">
          <div class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading has-text-white">Today's Average</p>
                <p>
                  <h1 class="title">{{ showTodayAverage }}</h1>
                </p>
                <p>
                  <h2 class="subtitle">{{ todayAverageObj.background.text }}</h2>
                </p>

                <div class="field has-addons mt-4">
                  <p class="control">
                    <button class="button"
                      :class="[
                        { 'is-primary is-light': uomSelectedToday==='mmol/L' },
                        { 'has-text-weight-bold': uomSelectedToday==='mmol/L' }
                      ]"
                      @click="uomSelectedToday='mmol/L'">
                      <span>mmol/L</span>
                    </button>
                  </p>
                  <p class="control">
                    <button class="button"
                      :class="[
                        { 'is-primary is-light': uomSelectedToday==='mg/dL' },
                        { 'has-text-weight-bold': uomSelectedToday==='mg/dL' }
                      ]"
                      @click="uomSelectedToday='mg/dL'">
                      <span>mg/dL</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="box"
          :class="lastWeekAverageObj.background.backgroundClass">
          <div class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading has-text-white">This Week's Average</p>
                <p>
                  <h1 class="title">{{ showLastWeekAverage }}</h1>
                </p>
                <p>
                  <h2 class="subtitle">{{ lastWeekAverageObj.background.text }}</h2>
                </p>

                <div class="field has-addons mt-4">
                  <p class="control">
                    <button class="button"
                      :class="[
                        { 'is-primary is-light': uomSelectedLastWeek==='mmol/L' },
                        { 'has-text-weight-bold': uomSelectedLastWeek==='mmol/L' }
                      ]"
                      @click="uomSelectedLastWeek='mmol/L'">
                      <span>mmol/L</span>
                    </button>
                  </p>
                  <p class="control">
                    <button class="button"
                      :class="[
                        { 'is-primary is-light': uomSelectedLastWeek==='mg/dL' },
                        { 'has-text-weight-bold': uomSelectedLastWeek==='mg/dL' }
                      ]"
                      @click="uomSelectedLastWeek='mg/dL'">
                      <span>mg/dL</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="box"
          :class="allTimeAverageObj.background.backgroundClass">
          <div class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading has-text-white">All Time Average</p>
                <p>
                  <h1 class="title">{{ showAllAverage }}</h1>
                </p>
                <p>
                  <h2 class="subtitle">{{ allTimeAverageObj.background.text }}</h2>
                </p>

                <div class="field has-addons mt-4">
                  <p class="control">
                    <button class="button"
                      :class="[
                        { 'is-primary is-light': uomSelectedAll==='mmol/L' },
                        { 'has-text-weight-bold': uomSelectedAll==='mmol/L' }
                      ]"
                      @click="uomSelectedAll='mmol/L'">
                      <span>mmol/L</span>
                    </button>
                  </p>
                  <p class="control">
                    <button class="button"
                      :class="[
                        { 'is-primary is-light': uomSelectedAll==='mg/dL' },
                        { 'has-text-weight-bold': uomSelectedAll==='mg/dL' }
                      ]"
                      @click="uomSelectedAll='mg/dL'">
                      <span>mg/dL</span>
                    </button>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box">
      <transition 
        enter-active-class="animate__animated animate__backInDown"
        leave-active-class="animate__animated animate__bounceOutDown">
      <div class="level" v-if="!showFormPanel">
        <div class="level-left">
          <p class="level-item">
            <button class="button is-link" @click="addNewClick()">New</button>
          </p>
        </div>
      </div>
      </transition>

      <transition 
        enter-active-class="animate__animated animate__backInDown"
        leave-active-class="animate__animated animate__bounceOutDown">
        <div class="message is-info" 
          v-if="showFormPanel">
          <div class="message-header">
            {{formPanelHeader}}
          </div>
          <div class="message-body">
            <div class="columns is-desktop">
              <div class="column is-2-widescreen is-3-desktop is-6-tablet is-full-mobile">
                <div class="field">
                  <label class="label">Reading</label>
                  <div class="control">
                    <input class="input" 
                      type="number" 
                      placeholder="0"
                      v-model="reading">
                  </div>
                </div>
              </div>

              <div class="column is-2-widescreen is-3-desktop is-6-tablet is-full-mobile">
                <div class="field">
                  <div class="control">
                    <label class="label">Unit</label>
                    <label class="radio">
                      <input 
                        type="radio" 
                        name="unitOfMeasure"
                        value="mmol/L"
                        v-model="uom">
                      mmol/L
                    </label>
                    <label class="radio">
                      <input
                        type="radio"
                        name="unitOfMeasure"
                        value="mg/dL"
                        v-model="uom">
                      mg/dL
                    </label>
                  </div>
                </div>
              </div>

              <div class="column is-4-widescreen is-6-desktop is-6-tablet is-full-mobile">
                <div class="field">
                  <label class="label">Notes</label>
                  <div class="control">
                    <textarea 
                      v-model="notes"
                      class="textarea" 
                      placeholder="Notes" >
                    </textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column is-3-widescreen is-4-desktop is-6-tablet is-12-mobile">
                <div class="field is-grouped">
                  <p class="control">
                    <button 
                      @click="saveTask"
                      class="button is-link">
                      Save
                    </button>
                  </p>
                  <p class="control">
                    <button class="button is-warning" @click="showFormPanel = !showFormPanel">
                      Cancel
                    </button>
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </transition>

      <div class="columns is-multiline">
        <div class="column is-one-quarter-fullhd is-one-third-desktop is-half-tablet is-full-mobile"
          v-for="(todo, index) in allTodos" :key="index">
          <Todo :todo="todo" />
        </div>
      </div>
      
      
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue'
  import Swal from 'sweetalert2'
  import { format, isBefore, parse, parseISO, sub } from 'date-fns'
  import Todo from '../components/Todo.vue'
  import {
    calculateTodoSummaries,
    todayAverageObj, 
    lastWeekAverageObj,
    allTimeAverageObj,
    allTodos, fetchTodos, 
    addTodo, errorInfo 
  } from '../utils/useTodo'
  import { userSession, handleRefreshSession } from '../utils/useAuth'

  export default defineComponent({
    name: 'TodoList',
    components: {
      Todo
    },

    data () {
      return {
        showFormPanel: false,
        formPanelHeader: 'Add New Log',
        uomSelected: 'mmol/L',
        uomSelectedToday: 'mmol/L',
        uomSelectedLastWeek: 'mmol/L',
        uomSelectedAll: 'mmol/L',
      }
    },

    methods: {
      addNewClick () {
        const expiresAt = new Date(userSession.value?.expires_at!)
        const isBef = isBefore(expiresAt, new Date())
        if (!isBef) {
          // Token needs to be refreshed.
          handleRefreshSession()
        }
        this.showFormPanel = !this.showFormPanel
      }
    },

    computed: {
      showTodayAverage (): string {
        return (this.uomSelectedToday==='mmol/L') 
        ? this.todayAverageObj.molar.toFixed(1)
        : Math.round(this.todayAverageObj.mass).toFixed(0)
      },

      showLastWeekAverage (): string {
        return (this.uomSelectedLastWeek==='mmol/L') 
        ? this.lastWeekAverageObj.molar.toFixed(1)
        : Math.round(this.lastWeekAverageObj.mass).toFixed(0)
      },

      showAllAverage (): string {
        return (this.uomSelectedAll==='mmol/L') 
        ? this.allTimeAverageObj.molar.toFixed(1)
        : Math.round(this.allTimeAverageObj.mass).toFixed(0)
      }
    },

    async setup () {
      await fetchTodos()
      const task = ref('ABCDEFGHIHJKLMN')
      let reading = ref(0)
      let uom = ref('mmol/L')
      let notes = ref('')

      async function saveTask(this: any) {
        // Guard for short task descriptions which will fail db policy.
        if (task.value.length <= 3) {
          Swal.fire({
            icon: 'warning',
            title: 'Validation',
            text: 'Please enter a value for the reading.',
            footer: ``
          })
          return
        }

        // Type check to ensure user is still logged in.
        if (userSession?.value === null) {
          Swal.fire({
            icon: 'info',
            title: 'Login Required',
            text: 'Your session has already ended. Please login again.',
            footer: ``
          })
          return
        }

        try {
          const todo = await addTodo(
            { 
              user_id: userSession.value.user.id, 
              task: task.value, 
              reading: reading.value,
              uom: uom.value, 
              notes: notes.value 
            }
          )
          
          if (!todo) {
            return
          }

          this.showFormPanel = false
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'New record successfully added.',
            footer: ``
          }).then((result) => {
            allTodos.value.unshift(todo)
            calculateTodoSummaries()
            reading.value = 0
            uom.value = ('mmol/L')
            notes.value = ('')
          })
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'API Error',
            text: 'An error occured saving the record. Please try again.',
            footer: `${err.message}`
          })
        }
      }

      return {
        task,
        reading,
        uom,
        notes,
        calculateTodoSummaries,
        todayAverageObj,
        lastWeekAverageObj,
        allTimeAverageObj,
        allTodos,
        saveTask,
        userSession,
        handleRefreshSession,
      }
    },
  })
</script>

<style scoped>
.has-colorbg-blue {
  background-color: #2698e2;
  padding: 0px 0px 15px;
  min-height: 125px;
}
</style>