import React from 'react'
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useField } from '../hooks'

const LoginForm = () => {
  const username = useField('username')
  const password = useField('password')
  const dispatch = useDispatch()

  const handleLogin = e => {
    e.preventDefault()
    dispatch(loginUser(username.input.value, password.input.value))
    username.resetField()
    password.resetField()
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input id="username-input" {...username.input} />
        </div>
        <div>
          Password
          <input id="password-input" {...password.input} />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   setUsername: PropTypes.func.isRequired,
//   setPassword: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
// }

export default LoginForm
