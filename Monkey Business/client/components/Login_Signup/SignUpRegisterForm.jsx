import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Modal } from 'react-bootstrap'
import { signUp } from './dataHelper.js'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

function SignUpCard (props) {
  const navigate = useNavigate()
  const { onSignUp, buttonTheme } = props
  const [newUsername, setNewUsername] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [newGmail, setNewGmail] = React.useState('')
  const [confirmPass, setConfirmPass] = React.useState('')
  const [type, setType] = React.useState('password')
  const [icon, setIcon] = React.useState(eye)
  const [show, setShow] = React.useState(false)
  const [content, setContent] = React.useState('')
  const onShortPass = 'Password must be at least 10 letters long!'
  const onLongPass = 'Password must be at most 20 letters long'
  function handlePasswordChange (e) {
    e.preventDefault()
    setNewPassword(e.target.value)
    const length = e.target.value.length
    if (length < 10) {
      setContent(onShortPass)
    } else if (length > 20) {
      setContent(onLongPass)
    } else {
      setContent('')
    }
  }
  function handleClose () {
    setShow(false)
  }
  function handleToggle (e) {
    e.preventDefault()
    if (type === 'password') {
      setType('text')
      setIcon(eyeOff)
    } else {
      setType('password')
      setIcon(eye)
    }
  }
  async function handleSubmit (e) {
    e.preventDefault()
    if (newPassword.length <= 10) {
      //
    } else if (newPassword.length >= 20) {
      //
    }
    if (
      newGmail.endsWith('@gmail.com') &&
      newUsername !== '' &&
      newPassword !== '' &&
      confirmPass !== ''
    ) {
      const newUser = {
        username: newUsername,
        password: newPassword,
        passwordConfirm: confirmPass,
        email: newGmail
      }
      console.log(newUser)
      if (await signUp(newUser)) {
        console.log('Sign Up Successfully')
        onSignUp(newUsername)
        await wait(1000)
        navigate('/')
      }
    } else {
      setShow(true)
    }
  }
  return (
    <div>
      <Card style={{ width: '18rem' }} className="mx-auto mt-5">
      <Card.Body>
      <form method = "post" onSubmit={handleSubmit}>
        <label>
          {'Please enter your information to create a new account.'}
        </label>
        <label>
        {'Gmail: '}
        <br/>
        <input
          name="gmail"
          value={newGmail}
          onChange={e => setNewGmail(e.target.value)}
        />
        </label>
        <label>
        {'Username: '}
        <input
          name="username"
          value={newUsername}
          onChange={e => setNewUsername(e.target.value)}
        />
        </label>
        <label>
        {'Password: '}
        <input
          type = {type}
          name="password"
          value={newPassword}
          onChange={e => handlePasswordChange(e)}
        />
        <span className="flex justify-around items-center" onClick={handleToggle}>
          <Icon class="absolute mr-10" icon={icon} size={25}/>
        </span>
        </label>
        <label>
        {'Confirm Password: '}
        <input
          type = {type}
          name="confirm_password"
          value={confirmPass}
          onChange={e => setConfirmPass(e.target.value)}
        />
        <span className="flex justify-around items-center" onClick={handleToggle}>
          <Icon class="absolute mr-10" icon={icon} size={25}/>
        </span>
        </label>
        <br/>
        <p style={{ color: 'red' }}> { content } </p>
        <label>
          <Button type = 'submit' className = {buttonTheme + ' mt-3'} variant='outline' >Sign Up</Button>
        </label>
      </form>
        <div className = 'mt-3'>
          <Link to = '/login' className='.p-3'>Already have an account? Login!</Link>
        </div>
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Missing information!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If you are seeing this window,
          then the form you filled in does not contains enough
          information to create a new account.
          Please close and try again.
        </Modal.Body>
      </Modal>
    </div>
  )
}
SignUpCard.propTypes = {
  onSignUp: PropTypes.func,
  buttonTheme: PropTypes.string
}
export default SignUpCard
export function wait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
