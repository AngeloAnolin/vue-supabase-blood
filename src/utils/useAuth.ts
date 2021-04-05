import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { Session, Provider } from '@supabase/gotrue-js/dist/main/lib/types'
import Swal from 'sweetalert2'

const userSession = ref<Session | null>(null)

/*
 * Handles user login via email + password into a supabase session.
 * If not password is empty, it will send a magic link to the users email address.
 */
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

/*
 * Handles signup provided a valid credentials object.
 */
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
      title: 'Sign Up',
      text: 'Signup successful. Please check your email to confirmation your account.',
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

/* Handles signup via Third Pary Login. (https://supabase.io/docs/guides/auth#third-party-logins) */
async function handleOAuthLogin(provider: Provider) {
  const { error } = await supabase.auth.signIn({ provider })
  if (error) console.error('Error: ', error.message)
}

/**
 * Handles password reset. Will send an email to the given email address.
 */
async function handlePasswordReset() {
  // const email = prompt('Please enter your email:')

  const { value: email } = await Swal.fire({
    title: 'Input email address',
    input: 'email',
    inputLabel: 'Your email address',
    inputPlaceholder: 'Enter your email address'
  })

  if (!email) {
    Swal.fire({
      icon: 'info',
      title: 'Reset Password',
      text: 'Please enter your email address.',
    })
  } else {
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

/* Handles logging a user out of a superbase session */
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
  handleOAuthLogin,
  handleSignup,
  handleLogout,
  handlePasswordReset,
  handleUpdateUser,
  handleRefreshSession,
}