import React, { useState } from 'react'
import { resetPassword } from '../../mbdataHelper'
import { Alert, Card, CardBody } from 'react-bootstrap'
import PropTypes from 'prop-types'

export function ResetPassword (props) {
  const accessKey = props.accessKey
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [success, setSuccess] = useState(false)

  const [show, setShow] = useState(false)
  const [showNoMatch, setShowNoMatch] = useState(false)
  const handleShowNoMatch = () => setShowNoMatch(true)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const onSuccessMessage = 'Password reset successfully'
  const onFailMessage = 'Failed to reset password'

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
      handleShowNoMatch()
    } else {
      try {
        const fetchResetPassword = await resetPassword(accessKey, username, password, confirmPassword)
        if (fetchResetPassword) {
          setSuccess(true)
        } else {
          setSuccess(false)
        }
        handleShow()
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
    <React.Fragment>
      <Alert show={showNoMatch} variant= "danger" onClose={handleClose} dismissible>
        <p>Passwords do not match!</p>
      </Alert>
    <Alert show={show} variant= {success ? "success" : "danger"} onClose={handleClose} dismissible>
        <Alert.Heading>Reset Password</Alert.Heading>
        <p>
          {success ? onSuccessMessage : onFailMessage}
        </p>
      </Alert>
    <Card style={{ width: '18rem' }} className="mx-auto mt-5">
    <Card.Header className='fw-bold'>Reset Password</Card.Header>
      <CardBody>
    <form onSubmit={handleSubmit}>
      <div>accessKey: {accessKey}</div>
      <label className='m-3'>
              Username:
              <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
      <label className='m-3'>
        New Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <label className='m-3'>
        Confirm New Password:
        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </label>
      <br />
      <button className='m-3' type="submit">Reset Password</button>
    </form>
    </CardBody>
    </Card>
    </React.Fragment>
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
