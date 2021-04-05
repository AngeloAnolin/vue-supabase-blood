<template>
  <main class="card is-transparent">
    <div class="card-content">
      <div class="field">
        <label class="label">Enter New Password</label>
        <input
          type="password"
          class="input"
          placeholder="New password"
          v-model="password"
        />
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button 
            @click="handleUpdateUser({ password: password })" 
            class="button is-link">
            Update
          </button>
        </div>
        <div class="control">
          <button 
            @click="handleUpdateUser({ password: password })" 
            class="button is-danger">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { handleUpdateUser } from '../utils/useAuth'
  export default defineComponent({
    name: 'Auth',
    setup() {
      const password = ref('')
      return {
        password,
        handleUpdateUser,
      }
    },
  })
</script>

<style scoped>
  .is-transparent {
    opacity: 0.95 !important;
  }
</style>