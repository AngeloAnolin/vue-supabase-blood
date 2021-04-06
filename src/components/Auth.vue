<template>
  <main class="card is-transparent">
    
    <!-- Sign In -->
    <div class="card-content" v-if="showSignInForm">
      <div class="has-text-centered">
        <span class="is-size-3">
          Sign In
        </span>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input class="input" 
            type="text" 
            placeholder="Email Address" 
            v-model="email">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left">
          <input class="input" 
            type="password" 
            placeholder="Enter Password" 
            v-model="password">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
        </div>
      </div>

      <div class="field has-text-right">
        <div class="control">
          <button 
            class="button is-link is-light has-background-white"
            @click="handleForgotPasswordClick">
            Forgot your password?
          </button>
        </div>
      </div>

      <div class="field mt-4">
        <div class="control">
          <button 
            class="button is-link is-fullwidth" 
            @click="handleLogin({email, password})">
            Sign In
          </button>
        </div>
      </div>

      <hr />

      <div class="field has-text-centered">
        <div class="control">
          <button 
            class="button is-link is-light has-background-white"
            @click="handleSignInMagicLinkClick">
            Sign in with Magic Link
          </button>
        </div>
      </div>

      <div class="field has-text-centered">
        <div class="control">
          <button 
            class="button is-link is-light has-background-white"
            @click="handleSignUpClick">
            Don't have an Account? Sign Up
          </button>
        </div>
      </div>
    </div>

    <!-- Sign Up -->
    <div class="card-content" v-if="showSignUpForm">
      <div class="has-text-centered">
        <span class="is-size-3">
          Sign Up
        </span>
      </div>
      
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

      <div class="field">
        <div class="control">
          <button class="button is-link is-fullwidth" @click="handleSignup({email, password})">
            Sign Up
          </button>
        </div>
      </div>

      <hr />

      <div class="field has-text-centered">
        <div class="control">
          <button 
            class="button is-link is-light has-background-white"
            @click="handleBackToSignInClick">
            Already have an Account? Sign In
          </button>
        </div>
      </div>
    </div>

    <!-- Magic Link -->
    <div class="card-content" v-if="showMagicLinkForm">
      <div class="has-text-centered">
        <span class="is-size-3">
          Sign In with Magic Link
        </span>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input class="input" 
            type="text" 
            placeholder="Email Address" 
            v-model="email">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
        </div>
      </div>

      <div class="field has-text-right">
        <div class="control">
          <button 
            class="button is-link is-light has-background-white"
            @click="handleBackToSignInClick">
            Sign In with Password
          </button>
        </div>
      </div>

      <div class="field mt-4">
        <div class="control">
          <button 
            class="button is-link is-fullwidth" 
            @click="handleMagicLink({email, password})">
            Send Magic Link
          </button>
        </div>
      </div>
    </div>

    <!-- Forgot Password -->
    <div class="card-content" v-if="showForgotPasswordForm">
      <div class="has-text-centered">
        <span class="is-size-3">
          Forgot Password
        </span>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input class="input" 
            type="text" 
            placeholder="Email Address" 
            v-model="email">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
        </div>
      </div>

      <div class="field has-text-right">
        <div class="control">
          <button 
            class="button is-link is-light has-background-white"
            @click="handleBackToSignInClick">
            Go back to Sign In
          </button>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button 
            class="button is-info is-fullwidth" 
            @click="handlePasswordReset(email)">
            Send Password Reset Instructions
          </button>
        </div>
      </div>
    </div>

  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { handleLogin, handleMagicLink, handleOAuthLogin, handleSignup, handlePasswordReset } from '../utils/useAuth'
export default defineComponent({
  name: 'Auth',
  
  data () {
    return {
      cardHeaderTitle: 'Sign In',
      showSignInForm: true,
      showSignUpForm: false,
      showMagicLinkForm: false,
      showForgotPasswordForm: false,
    }
  },

  methods: {
    handleForgotPasswordClick () {
      this.showSignInForm = false
      this.showSignUpForm = false
      this.showMagicLinkForm = false
      this.showForgotPasswordForm = true
    },

    handleBackToSignInClick () {
      this.showSignInForm = true
      this.showSignUpForm = false
      this.showMagicLinkForm = false
      this.showForgotPasswordForm = false
    },

    handleSignInMagicLinkClick () {
      this.showSignInForm = false
      this.showSignUpForm = false
      this.showMagicLinkForm = true
      this.showForgotPasswordForm = false
    },

    handleSignUpClick () {
      this.showSignInForm = false
      this.showSignUpForm = true
      this.showMagicLinkForm = false
      this.showForgotPasswordForm = false
    }
  },

  setup() {
    const email = ref('')
    const password = ref('')
    return {
      email,
      password,
      handleLogin,
      handleMagicLink,
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