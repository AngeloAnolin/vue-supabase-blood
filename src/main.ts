import { createApp } from 'vue'
import App from './App.vue'
import { supabase } from './lib/supabase'
import { userSession } from './utils/useAuth'
import './assets/bulma.css'
import 'sweetalert2/src/sweetalert2.scss'
import 'animate.css'

createApp(App).mount('#app')

// Keep track if user is logged in and will update userSession state accordingly.
supabase.auth.onAuthStateChange((event, session) => {
  userSession.value = session
})
