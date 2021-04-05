<template>
  <main class="card is-transparent">
    <div class="card-content">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" 
            type="text" 
            placeholder="Email Address" 
            v-model="email">
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" 
            type="password" 
            placeholder="Enter Password" 
            v-model="password">
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary" @click="handleSignup({email, password})">
            Sign Up
          </button>
        </div>

        <div class="control">
          <button class="button is-link" 
            @click="handleLogin({email, password})"
            :title="(password.length) ? '': 'Get a link in your email to sign-in'">
            <span v-if="password.length">Sign in</span>
            <span v-else> Send Link </span>
          </button>
        </div>
      </div>

      <hr />

      <div class="field">
        <button
          @click.prevent="handlePasswordReset"
          class="button is-danger">
          Forgot your password?
        </button>
      </div>

    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { handleLogin, handleOAuthLogin, handleSignup, handlePasswordReset } from '../utils/useAuth'
export default defineComponent({
  name: 'Auth',
  setup() {
    const email = ref('')
    const password = ref('')
    return {
      email,
      password,
      handleLogin,
      handleOAuthLogin,
      handleSignup,
      handlePasswordReset,
    }
  },
})
</script>

<style scoped>
  .is-transparent {
    opacity: 0.95 !important;
  }
</style>