<template>
  <nav class="navbar"
    role="navigation">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img
            class="logo"
            src="../assets/bloodlogo.png"
            alt="Logo">
        </div>
        <span
          role="button"
          class="navbar-burger burger" 
          data-target="navbarMenu"
          @click="showNav = !showNav" 
          :class="{ 'is-active': showNav }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>

      <div 
        id="navbarMenu" 
        class="navbar-menu"
        :class="{ 'is-active': showNav }">
        <div class="navbar-end">
          <span class="navbar-item" 
            v-if="userSession === null && !showLoginComponent">
            <button class="button is-link" 
              @click="handleSignUpInClick()">
              <span>Log In</span>
            </button>
          </span>

          <span class="navbar-item">
            <button class="button is-warning is-outlined is-light" 
              v-if="userSession" 
              @click="handleLogout">
              <span>Log Out {{ userSession.user.email }}</span>
            </button>
          </span>

        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { userSession, handleLogout } from '../utils/useAuth'
  import { showLoginComponent, showScreen, handleSignUpInClick } from '../utils/useConfig'
  export default defineComponent({
    name: 'Navbar',
    data () {
      return {
        showNav: false
      }
    },
    setup() {
      const logout = async () => {
        handleLogout()
      }

      return {
        userSession, 
        handleLogout,
        showLoginComponent,
        showScreen,
        handleSignUpInClick,
      }
    }
  })
</script>

<style scoped>
.logo {
  max-height: 3.0rem !important;
}
</style>