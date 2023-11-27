import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { logIn } from './dataHelper'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function LoginCard (props) {
  const { onLogIn, mode } = props
  let buttonTheme
  if (mode === 'dark') {
    buttonTheme = 'outline-light'
  } else {
    buttonTheme = 'outline-dark'
  }
  const [name, setName] = React.useState('')
  const [pass, setPass] = React.useState('')
  const navigate = useNavigate()
  async function handleSubmit (e) {
    e.preventDefault()
    const user = {
      username: name,
      password: pass
    }
    if (await logIn(user)) {
      onLogIn(name)
      // navigate('/dash_B') not working yet but will change to this
      navigate('/')
    }
  }
  return (
    <div data-bs-theme={mode}>
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
          <Button type = 'submit' className = 'mt-3' variant={buttonTheme} >Log In</Button>
        </label>
        </form>
        </Card.Body>
      </Card>
    </div>
  )
}
LoginCard.propTypes = {
  onLogIn: PropTypes.func,
  mode: PropTypes.string
}
export default LoginCard
