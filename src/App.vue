<template>
  <div id="app">
    
    <div v-if="userSession === null" class="hero is-fullheight is-dark has-background">
      <div class="hero-head">
        <Navbar />
      </div>
    
      <img alt="Image" 
        class="hero-background is-transparent" 
        src="https://source.unsplash.com/random/1920x1080" />
      
      <div class="hero-body" v-if="userSession === null">
        <div class="container">
          <h1 class="title is-size-1-desktop has-text-centered">
            Blood Sugar Log
          </h1>
          <h3 class="subtitle is-size-3-desktop has-text-centered">
            Monitor your blood glucose
          </h3>
          <div class="has-text-centered" v-if="userSession === null && !showLoginComponent">
            <button class="button is-link has-text-centered is-large"
              @click="handleSignUpInClick">
              Get Started
            </button>
          </div>

          <div
            v-if="userSession === null && showLoginComponent"
            class="animate__animated animate__backInDown columns">
            <Auth class="column is-half is-offset-one-quarter"/>
          </div>

          <div
            v-if="showPasswordReset && userSession !== null"
            class="columns">
            <PasswordReset class="column is-half is-offset-one-quarter" />
          </div>

        </div>
      </div>
    </div>

    <div 
      v-if="userSession !== null" 
      class="container my-4">
      <Navbar />
      <Suspense>
        <template #default>
          <div>
            <TodoList />
            <!--<button class="btn-black w-full mt-12" @click="handleLogout">
              Logout
            </button>-->
          </div>
        </template>
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </div>

  </div>
</template>

<script lang="ts">
  import { ref, watch } from 'vue'
  import Navbar from './components/Navbar.vue'
  import Auth from './components/Auth.vue'
  import PasswordReset from './components/PasswordReset.vue'
  import TodoList from './components/TodoList.vue'
  import Loading from './components/Loading.vue'
  import Footer from './components/Footer.vue'
  import { userSession, handleLogout } from './utils/useAuth'
  import { getParameterByName } from './lib/helpers'
  import { showLoginComponent, showScreen, handleSignUpInClick } from './utils/useConfig'
  import { errorInfo } from './utils/useTodo'

  export default {
    components: {
      Auth,
      PasswordReset,
      TodoList,
      Loading,
      Footer,
      Navbar
    },

    computed: {
      showPasswordReset () {
        const requestType = getParameterByName('type', location.href)
        return requestType === 'recovery'
      }
    },

    setup() {
      const errorInfo = ref()
      watch(errorInfo, newVal => {
        // console.log('errorInfo WATCH', errorInfo)
      })
      return { 
        userSession, 
        handleLogout,
        showLoginComponent,
        showScreen,
        handleSignUpInClick
      }
    },
  }
</script>

<style scoped>
  .hero.has-background {
    position: relative;
    overflow: hidden;
  }
  .hero-background {
    position: absolute;
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
  }
  .hero-background.is-transparent {
    opacity: 0.7;
  }

  .div-bg {
    background: url('https://source.unsplash.com/random/1920x1080') no-repeat;
    background-size: 100%;
  }
</style>