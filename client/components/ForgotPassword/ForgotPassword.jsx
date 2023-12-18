import React, { useState } from 'react'
import { forgotPassword } from '../../mbdataHelper'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

export default function ForgotPassword () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const onSuccessMessage = 'Email sent'
  const onFailMessage = 'Email failed to send'

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const fetchForgotPassword = await forgotPassword(username, email)
    if (fetchForgotPassword) {
      setSuccess(true)
    } else {
      setSuccess(false)
    }
    handleShow()
  }
  return (
    <React.Fragment>
      <Alert show={show} variant= {success ? "success" : "danger"} onClose={handleClose} dismissible>
        <Alert.Heading>Reset Password</Alert.Heading>
        <p>
          {success ? onSuccessMessage : onFailMessage}
        </p>
      </Alert>
    <Card style={{ width: '18rem' }} className="mx-auto mt-5">
    <Card.Header>Forgot Password</Card.Header>
      <Card.Body>
    <form onSubmit={handleSubmit}>
      <label className='m-3'>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <label className='m-3'>
        Email:
        <input type="text" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <div className='row-5'>
      <Link to='/login'><Button variant="secondary">Back to Login</Button></Link>
      <Button type="submit">Send Email</Button>
      </div>
    </form>
    </Card.Body>
    </Card>
    </React.Fragment>
  )
}

