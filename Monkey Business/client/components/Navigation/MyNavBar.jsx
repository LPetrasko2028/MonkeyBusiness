// Make the navigation bar for the web
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import { BsBrightnessHigh, BsMoonStars } from 'react-icons/bs'

export default function MyNavBar (props) {
  const { loggedIn, handleTheme, mode, isDark } = props
  const [check, setCheck] = React.useState(true)
  const handleClick = () => {
    handleTheme(!isDark)
    changeIcon(!isDark)
  }
  let content = (
    <div onClick = {handleClick}>
    <BsBrightnessHigh/>
    </div>
  )
  const changeIcon = () => {
    console.log('this is check: ' + check)
    if (check) {
      content = (
        <div onClick = {handleClick}>
        <BsBrightnessHigh/>
        </div>
      )
    } else {
      content = (
        <div onClick = {handleClick}>
        <BsMoonStars/>
        </div>
      )
    }
    setCheck(!check)
  }
  let navContent
  let navContent2
  if (!loggedIn) {
    navContent = (
      <Nav className="justify-content-end" style={{ width: '50%' }}>
      <LinkContainer to = "/login" >
        <Nav.Link> Log In </Nav.Link>
      </LinkContainer>
      <LinkContainer to = "/signup" >
        <Nav.Link> Sign Up </Nav.Link>
      </LinkContainer>
      </Nav>
    )
  } else {
    navContent2 = (
      <LinkContainer to = "/setting" >
      <Nav.Link> Setting </Nav.Link>
    </LinkContainer>
    )
  }
  return (
    <Navbar bg= {mode} variant={mode}>
    <Navbar.Brand >Monkey Business</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" >
        <LinkContainer to = "/" >
          <Nav.Link> Home </Nav.Link>
        </LinkContainer>
        <LinkContainer to = "/stats" >
          <Nav.Link> Statistics </Nav.Link>
        </LinkContainer>
        <LinkContainer to = "/search" >
          <Nav.Link> Search </Nav.Link>
        </LinkContainer>
        <LinkContainer to = "/monkeyTech" >
          <Nav.Link> Monkey Technology </Nav.Link>
        </LinkContainer>
        <LinkContainer to = "/about" >
          <Nav.Link> About Us </Nav.Link>
        </LinkContainer>
        {navContent2}
        <Nav.Link> { content } </Nav.Link>
        </Nav>
        { navContent }
    </Navbar.Collapse>
</Navbar>
  )
}
MyNavBar.propTypes = {
  loggedIn: PropTypes.bool,
  handleTheme: PropTypes.func,
  mode: PropTypes.string,
  isDark: PropTypes.bool.isRequired
}
MyNavBar.defaultProps = {
  loggedIn: false,
  handleTheme: () => {},
  mode: 'light'
}
