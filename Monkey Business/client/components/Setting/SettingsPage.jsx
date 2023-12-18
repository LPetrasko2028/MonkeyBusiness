import React from 'react'
import { Row, Button, Modal } from 'react-bootstrap'
import { updatePref, deleteAcc } from './dataHelper'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
let myTheme = 'light'
let buttonTheme = 'outline-dark'
const isMidnight = false
if (isMidnight) { myTheme = 'dark' }
if (myTheme === 'light') {
  buttonTheme = 'outline-dark'
} else {
  buttonTheme = 'outline-light'
}

function SettingsPage (props) {
  const navigate = useNavigate()
  const { name, setLogIn, setName } = props
  const [change, setChange] = React.useState(false)
  const [fontSize, setFontSize] = React.useState(12)
  const [graphColor, setGraphColor] = React.useState('Default')
  const [show, setShow] = React.useState(false)
  function handleClose (e) {
    setShow(false)
  }
  function handleChangeGraphColor (e) {
    e.preventDefault()
    setGraphColor(e.target.value)
    setChange(true)
  }
  function handleChangeFontSize (e) {
    e.preventDefault()
    setFontSize(e.target.value)
    setChange(true)
  }
  async function handleSubmit (e) {
    e.preventDefault()
    if (fontSize != null && graphColor != null) {
      const preference = {
        username: name,
        colorScheme: 'DefaultLight',
        graphColor,
        fontSize
      }
      if (await updatePref(preference)) {
        console.log('update successfully')
      } else {
        console.log('did not update')
      }
    } else {
      console.log('failed')
    }
  }
  function handleDelete (e) {
    e.preventDefault()
    setShow(true)
  }
  async function confirmDelete (e) {
    e.preventDefault()
    if (await deleteAcc(name)) {
      setLogIn(false)
      setName('')
      handleClose()
      navigate('/')
    } else {
      console.log('Failed to remove account')
    }
  }
  let content
  if (change) {
    content = (
      <Button type = 'submit' onClick={handleSubmit}> Apply</Button>
    )
  }
  return (
    <div className='px-3' data-bs-theme={myTheme} >
      <div>
        <h1>Settings</h1>
      </div>
      <Row>
      <div>
        <p>
        <text style={{marginRight: 5}}>Theme mode:</text>
          <label>
            <input type='radio' name='settingsRadio' value='option1'/>
            <text style={{marginLeft: 5, marginRight: 5}}>Light Mode</text>
          </label>
          <label>
            <input type='radio' name='settingsRadio' value='option2'/>
            <text style={{marginLeft: 5}}>Dark Mode</text>
          </label>
          </p>
          </div>
        </Row>
        <Row>
          <label>
            <div>Font size: </div>
            <input type = 'number' name = 'fontSize' value = {fontSize} onChange = {handleChangeFontSize}>
            </input>
          </label>
        </Row>
        <Row>
          <label>
            <div>Graph Colors: </div>
          </label>
        </Row>
        <Row>
          <label>
          <text style={{marginRight: 5}}> Default</text>
          <input type = 'radio' name = 'graphColor' value = 'Default' checked onChange={handleChangeGraphColor}/>
          </label>
        </Row>
        <Row>
          <label>
          <text style={{marginRight: 5}}>Simply Black</text>
          <input type = 'radio' name = 'graphColor' value = 'Simply Black' onChange={handleChangeGraphColor} />
          </label>
        </Row>
        <Row>
          <label>
          <text style={{marginRight: 5}}>Hot & Cold</text>
          <input type = 'radio' name = 'graphColor' value = 'Hot & Cold' onChange={handleChangeGraphColor} />
          </label>
        </Row>
        <Row>
          <label>
          <text style={{marginRight: 5}}>Spring</text>
          <input type = 'radio' name = 'graphColor' value = 'Spring' onChange={handleChangeGraphColor}/>
          </label>
        </Row>
        <Row>
          <Button type = 'submit' className = 'mt-3' variant={buttonTheme} onClick={handleDelete}> Delete Account</Button>
        </Row>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>All of your account data will be gone reduced to atoms</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant={buttonTheme} onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
        <Row>
          {content}
        </Row>
      </div>
  )
}

SettingsPage.propTypes = {
  name: PropTypes.string.isRequired,
  setLogIn: PropTypes.func,
  setName: PropTypes.func.isRequired
}
export default SettingsPage
