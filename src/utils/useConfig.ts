import { ref } from 'vue'

const showScreen = ref('MAIN_SCREEN')
const showLoginComponent = ref(false)

async function handleSignUpInClick () {
  //showScreen.value = 'LOGIN_SCREEN'
  showScreen.value = 'LOGIN_SCREEN'
  showLoginComponent.value = true
  return
}

async function handleSignOutClick () {
  showLoginComponent.value = false
  return
}

export {
  showLoginComponent,
  showScreen,
  handleSignUpInClick
}