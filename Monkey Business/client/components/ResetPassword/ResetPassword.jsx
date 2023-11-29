import React, { useState } from 'react'
import { resetPassword } from '../../mbdataHelper'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
import useParams from 'react-router-dom'

export function ResetPassword (props) {
  const { accessKey } = useParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      Alert("Passwords don't match")
    } else {
      try {
        await resetPassword(accessKey, username, password, confirmPassword)
      } catch (error) {
        console.log(error)
      }
    }

    // Add your password reset logic here
    // You can access the password and confirmPassword values using the state variables
    // For example, you can make an API call to reset the password
    // or update the password in your database
    // Don't forget to handle any success or error scenarios
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
              Username:
              <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
      <label>
        New Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <label>
        Confirm Password:
        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </label>
      <br />
      <button type="submit">Reset Password</button>
    </form>
  )
}
ResetPassword.propTypes = {
  accessKey: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      accessKey: PropTypes.string
    })
  })
}

export default ResetPassword
