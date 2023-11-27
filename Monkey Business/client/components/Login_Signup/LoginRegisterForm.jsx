import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { logIn } from './dataHelper'
import PropTypes from 'prop-types'
import { useNavigate, Link } from 'react-router-dom'

function LoginCard (props) {
  const navigate = useNavigate()
  const { onLogIn } = props
  const [name, setName] = React.useState('')
  const [pass, setPass] = React.useState('')
  async function handleSubmit (e) {
    e.preventDefault()
    const user = {
      username: name,
      password: pass
    }
    if (await logIn(user)) {
      onLogIn(name)
      navigate('/')
    }
  }
  return (
    <div>
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
