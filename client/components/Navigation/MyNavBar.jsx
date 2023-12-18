import React from 'react'
import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import { BsBrightnessHigh, BsMoonStars, BsPersonFill, BsBrightnessHighFill, BsBrightnessAltHighFill } from 'react-icons/bs'
import { logout } from '../../mbdataHelper'
import { redirect } from 'react-router-dom'

export default function MyNavBar (props) {
  const { loggedIn, handleTheme, mode, isDark, setLogInStatus } = props
  const [check, setCheck] = React.useState(true)
  const handleClick = () => {
    handleTheme(!isDark)
    changeIcon(!isDark)
  }
  const handleLogOut = async () => {
    const isLogout = await logout()
    setLogInStatus(false)
    redirect('/')
    window.location.reload()
  }
  const changeIcon = () => {
    setCheck(!check)
  }
  let navContent
  let navContent2
  if (!loggedIn) {
    navContent = (
      <Nav className="justify-content-end" style={{ width: '50%' }}>
        <LinkContainer to="/login">
          <Nav.Link> Log In </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/signup">
          <Nav.Link> Sign Up </Nav.Link>
        </LinkContainer>
      </Nav>
    )
  } else {
    navContent = (
      <Nav className="justify-content-end mx-2 mr-auto" style={{ width: '50%' }}>
        <Dropdown>
          <Dropdown.Toggle variant={(check) ? 'light' : 'dark'} id="dropdown-basic">
            <BsPersonFill color={(check) ? 'black' : 'white'} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <LinkContainer to="/setting">
              <Dropdown.Item>Setting</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to="/">
              <Dropdown.Item><div onClick={handleLogOut}>Log Out</div></Dropdown.Item>
            </LinkContainer>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    )
    navContent2 = (
      <LinkContainer to = "/setting" >
      <Nav.Link> Setting </Nav.Link>
    </LinkContainer>
    )
  }
  return (
    <Navbar bg={mode} variant={mode} className='px-5'>
      <Navbar.Brand>Monkey Business</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link> Home </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/stats">
            <Nav.Link> Statistics </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/search">
            <Nav.Link> Search </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/monkeyTech">
            <Nav.Link> Monkey Technology </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link> About Us </Nav.Link>
          </LinkContainer>
          {navContent2}
          <Nav.Link>
            <div onClick={handleClick}>
              <BsBrightnessHighFill />
            </div>
          </Nav.Link>
        </Nav>
        {navContent}
      </Navbar.Collapse>
    </Navbar>
  );
}
MyNavBar.propTypes = {
  loggedIn: PropTypes.bool,
  handleTheme: PropTypes.func,
  mode: PropTypes.string,
  isDark: PropTypes.bool.isRequired,
  setLogInStatus: PropTypes.func.isRequired
}
MyNavBar.defaultProps = {
  loggedIn: false,
  handleTheme: () => {},
  mode: 'light',
  isDark: false,
  setLogInStatus: () => {}
}
