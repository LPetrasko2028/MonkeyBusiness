import React, { useState, useEffect, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import { Card, Alert } from 'react-bootstrap'
import { logIn } from './dataHelper'
import PropTypes from 'prop-types'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../mbdataHelper'

function LoginCard (props) {
  const navigate = useNavigate()
  const { onLogIn } = props
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [success, setSuccess] = useState(false)
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const onSuccessMessage = 'Logged in successfully'
  const onFailMessage = 'Failed to log in'

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const attemptLogin = await login(name, pass)
      if (attemptLogin) {
        setSuccess(true)
        onLogIn(name)
        handleShow()
        await wait(1000)
        navigate('/')
      } else {
        setSuccess(false)
      }
      handleShow()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Alert show={show} variant= {success ? 'success' : 'danger'} onClose={handleClose} dismissible>
        <Alert.Heading>Login</Alert.Heading>
        <p>
          {success ? onSuccessMessage : onFailMessage}
        </p>
      </Alert>
      <Card style={{ width: '18rem' }} className="mx-auto mt-5">
        <Card.Body>
          <form method = 'post' onSubmit={handleSubmit}>
        <label>
          {'Please enter your information to log in.'}
        </label>
        <label>
        {'Username: '}
        <input
          name="username"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        </label>
        <label>
        {'Password: '}
        <input
          name="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        </label>
        <label>
          <Button type = 'submit' className = 'mt-3 center' >Log In</Button>
        </label>
        </form>
        <div className = 'mt-3'>

        <Link to = '/signup' className='.p-3'>Don't have an account? Sign Up!</Link>
        <br />
        <Link to = '/forgotPassword'>Forgot Password?</Link>
        </div>
        </Card.Body>
      </Card>
    </div>
  )
}
LoginCard.propTypes = {
  onLogIn: PropTypes.func
}
export default LoginCard

export function wait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
