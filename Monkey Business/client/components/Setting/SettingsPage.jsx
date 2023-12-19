import React from 'react'
import { Row, Button, Modal, Card } from 'react-bootstrap'
import { updatePref, deleteAcc } from './dataHelper'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function SettingsPage (props) {
  const navigate = useNavigate()
  const { name, setLogIn, setName, setStyle, setFont, setButtonTheme, buttonTheme, setButtonTheme2 } = props
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
        colorScheme: graphColor,
        graphColor: 'Default',
        fontSize
      }
      if (await updatePref(preference)) {
        console.log('update successfully')
        if (graphColor === 'Simply Black') {
          setStyle('#d3d3d3')
          setButtonTheme('btn-outline-secondary')
          setButtonTheme2('btn-outline-danger')
        } else if (graphColor === 'Hot & Cold') {
          setStyle('#5f9ea0')
          setButtonTheme2('btn-outline-danger')
          setButtonTheme('btn-outline-primary')
        } else if (graphColor === 'Spring') {
          setStyle('#ffb6c1')
          setButtonTheme('btn-outline-danger')
          setButtonTheme2('btn-outline-success')
        } else {
          setStyle('#f0ffff')
          setButtonTheme('btn-outline-success')
          setButtonTheme2('btn-outline-warning')
        }
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
      <Button variant='outline' className={buttonTheme} type = 'submit' onClick={handleSubmit}> Apply</Button>
    )
  }
  return (
    <div className='px-3' data-bs-theme={buttonTheme} >
        <Row>
          <label>
            <div>Font size: </div>
            <input type = 'number' name = 'fontSize' value = {fontSize} onChange = {handleChangeFontSize}>
            </input>
          </label>
        </Row>
        <Row>
          <label>
            <div>Color Theme: </div>
          </label>
        </Row>
        <Card>
        <Row className = 'p-3'>
          <label>
          <input type = 'radio' name = 'graphColor' value = 'DefaultLight' onChange={handleChangeGraphColor}/>
          Default Light</label>
        </Row>
        <Row className = 'p-3'>
          <label>
          <input type = 'radio' name = 'graphColor' value = 'Simply Black' onChange={handleChangeGraphColor} />
          Simply Black
          </label>
        </Row>
        <Row className = 'p-3'>
          <label>
          <input type = 'radio' name = 'graphColor' value = 'Hot & Cold' onChange={handleChangeGraphColor} />
          Hot & Cold
          </label>
        </Row>
        <Row className = 'p-3'>
          <label>
          <input type = 'radio' name = 'graphColor' value = 'Spring' onChange={handleChangeGraphColor}/>
          Spring
          </label>
        </Row>
        </Card>
        <Row>
          <Button variant='outline' type = 'submit' className={buttonTheme + ' mt-3'} onClick={handleDelete}> Delete Account</Button>
        </Row>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>All of your account data will be gone reduced to atoms</Modal.Body>
        <Modal.Footer>
          <Button className={buttonTheme} variant='outline' onClick={handleClose}>
            Cancel
          </Button>
          <Button className={buttonTheme} variant='outline' onClick={confirmDelete}>
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
  setName: PropTypes.func.isRequired,
  setStyle: PropTypes.func,
  setFont: PropTypes.func,
  setButtonTheme: PropTypes.func,
  buttonTheme: PropTypes.string,
  setButtonTheme2: PropTypes.func
}
export default SettingsPage
