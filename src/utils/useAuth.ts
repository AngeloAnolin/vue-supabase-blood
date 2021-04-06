import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { Session, Provider } from '@supabase/gotrue-js/dist/main/lib/types'
import Swal from 'sweetalert2'

const userSession = ref<Session | null>(null)

async function handleLogin(credentials: Credentials) {
  try {
    const { error, user } = await supabase.auth.signIn({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'An error occured during login. Please try again.',
        footer: `${error.message}`
      })
    }
    // No error thrown, but no user detected so send magic link
    if (!error && !user) {
      Swal.fire({
        icon: 'info',
        title: 'Sign In',
        text: 'Kindly check your email for instructions to sign in to the application.',
        footer: ``
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Sign In Error',
      text: 'An error occured during the sign in process. Please try again.',
      footer: `${error.message}`
    })
  }
}

async function handleSignup(credentials: Credentials) {
  try {
    const { email, password } = credentials
    // prompt user if they have not filled populated thier credentials
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Blood Sugar',
        text: 'Email and password are required.',
      })
      return
    }

    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Sign Up Error',
        text: 'An error occured during sign up. Please try again.',
        footer: `${error.message}`
      })
      return
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Blood Sugar',
      text: 'Signup successful. Please check your email to confirm your account.',
      footer: ``
    })
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Sign Up Error',
      text: 'An error occured during sign up. Please try again.',
      footer: `${err.message}`
    })
  }
}

async function handleMagicLink(credentials: Credentials) {
  try {
    const { error, user } = await supabase.auth.signIn({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Blood Sugar',
        text: 'An error occured obtaining the magic link. Please try again.',
        footer: `${error.message}`
      })
    }

    if (!error && !user) {
      Swal.fire({
        icon: 'info',
        title: 'Blood Sugar',
        text: 'Kindly check your email to sign in to the application.',
        footer: ``
      })
    }

  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Blood Sugar',
      text: 'An error occured generating the magic link. Please try again.',
      footer: `${err.message}`
    })
  }
}

async function handleOAuthLogin(provider: Provider) {
  const { error } = await supabase.auth.signIn({ provider })
  if (error) console.error('Error: ', error.message)
}

async function handlePasswordReset(email: string) {
  const { error } = await supabase.auth.api.resetPasswordForEmail(email)
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Reset Password',
      text: 'An error occured processing your password reset request. Please try again.',
      footer: `${error.message}`
    })
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Reset Password',
      text: 'Password recovery has been sent to your email.',
    })
  }
}

async function handleUpdateUser(credentials: Credentials) {
  try {
    const { error } = await supabase.auth.update(credentials)
    if (error) {
      alert('Error updating user info: ' + error.message)
    } else {
      alert('Successfully updated user info!')
      window.location.href = '/'
    }
  } catch (error) {
    alert('Error updating user info: ' + error.message)
  }
}

async function handleLogout() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Sign Out Error',
        text: 'An error occured signing out. Please try again.',
        footer: `${error.message}`
      })
      return
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Sign Out Error',
      text: 'An exception occured signing out. Please try again.',
      footer: `${err.message}`
    })
    return
  }
}

async function handleRefreshSession () {
  try {
    const { error, user } = await supabase.auth.refreshSession()
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Refresh Session Error',
        text: 'An error occured refreshing your session.',
        footer: `${error.message}`
      })
    }

    if (!error && !user) {
      Swal.fire({
        icon: 'info',
        title: 'Refresh Token',
        text: 'Refresh token process is incomplete. Kindly refresh your screen and try again.',
        footer: ``
      })
    }


  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Refresh Token Error',
      text: 'An error occured refreshing the token.',
      footer: `${error.message}`
    })
  }
}

export {
  userSession,
  handleLogin,
  handleMagicLink,
  handleOAuthLogin,
  handleSignup,
  handleLogout,
  handlePasswordReset,
  handleUpdateUser,
  handleRefreshSession,
}