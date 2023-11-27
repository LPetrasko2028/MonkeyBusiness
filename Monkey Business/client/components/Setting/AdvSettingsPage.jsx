// needs formatting + working on the radio buttons
import React from 'react'
import { Row, Button, Card } from 'react-bootstrap'
import { updateAcc } from './dataHelper.js'
let myTheme = 'light'
let buttonTheme = 'outline-dark'
const isMidnight = false
if (isMidnight) { myTheme = 'dark' }
if (myTheme === 'light') {
  buttonTheme = 'outline-dark'
} else {
  buttonTheme = 'outline-light'
}

function AdvSetting () {
  const [newUsername, setNewUsername] = React.useState('')
  const [newPass, setNewPass] = React.useState('')
  const [newPassCon, setNewPassCon] = React.useState('')
  const [newEmail, setNewEmail] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [changeType, setChangeType] = React.useState('username')
  let content
  if (changeType === 'username') {
    content = (
      <Row>
        New Username:
        <input type = 'text' value ={newUsername} name = 'n_username' onChange={handleNewUsername} />
      </Row>
    )
  } else if (changeType === 'password') {
    content = (
      <div>
      <Row>
        New Password:
        <input type = 'text' value = {newPass} name = 'n_pass' onChange={handleNewPass} />
      </Row>
      <Row>
         New Password Confirm:
        <input type = 'text' value = {newPassCon} name = 'passCon' onChange={handleConPass} />
      </Row>
    </div>
    )
  } else if (changeType === 'email') {
    content = (
    <Row>
      New email:
      <input type = 'text' value = {newEmail} name = 'email' onChange= { handleEmail } />
    </Row>
    )
  }
  function handleNewUsername (e) {
    e.preventDefault()
    setNewUsername(e.target.value)
  }
  function handleUsername (e) {
    e.preventDefault()
    setUsername(e.target.value)
  }
  function handleNewPass (e) {
    e.preventDefault()
    setNewPass(e.target.value)
  }
  function handlePass (e) {
    e.preventDefault()
    setPass(e.target.value)
  }
  function handleConPass (e) {
    e.preventDefault()
    setNewPassCon(e.target.value)
  }
  function handleEmail (e) {
    e.preventDefault()
    setNewEmail(e.target.value)
  }
  async function handleChange (e) {
    e.preventDefault()
    const data = {
      username,
      password: pass,
      newPassword: newPass,
      newEmail,
      newUsername,
      newPasswordConfirm: newPassCon,
      changeType
    }
    console.log(data)
    if (await updateAcc(data)) {
      console.log('Account update successfully')
    } else {
      console.log('Failed to update account')
    }
  }
  function handleTypeChange (e) {
    e.preventDefault()
    setChangeType(e.currentTarget.value)
  }
  return (
    <Card className='p-3'>
      <Row>
        Username:
        <input type = 'text' value = {username} name = 'username' onChange={handleUsername} />
      </Row>
      <Row>
        Password:
        <input type = 'text' value = {pass} name = 'pass' onChange={handlePass} />
      </Row>
        <p>
          Change Type:
          <br/>
          <label>
            <input type='radio' name='settings' value='username' onChange={handleTypeChange}/>
            Username
          </label>
          <br/>
          <label>
            <input type='radio' name='settings' value='password' onChange={handleTypeChange}/>
            Password
          </label>
          <br/>
          <label>
            <input type='radio' name='settings' value='email' onChange={handleTypeChange}/>
            Email
          </label>
          </p>
        {content}
        <br/>
        <br/>
        <Button type = 'submit' variant={buttonTheme} onClick={handleChange}>Submit Changes</Button>
    </Card>
  )
}

export default AdvSetting
