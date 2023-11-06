import React from 'react'
import { Accordion, Container,Row, Col } from 'react-bootstrap'

function tPage () {
  return (
  
    <React.Fragment>
    {/* <div>This is where I'd put images for the tutorial</div>
    <div>
        <h1>Home Page</h1>
        <p>This is the landing page for the website. It displays a few random stocks</p>
        <h1>Statistics</h1>
        <p>This has a more in depth table of stocks</p>
        <h1>Monkey Technology</h1>
        <p>This page explains things about the monkey algorithm</p>
        <h1>About Us</h1>
        <p>This page explains about what why we are doing what we are doing</p>
        <h1>Settings</h1>
        <p>This is where a user can change different settings to change the way the website looks</p>
        <h1>Tutorial</h1>
        <p>you are here</p>
        <h1>Login</h1>
        <p>This is where you can login in  to your account for personalized stats</p>
        <h1>Sign Up</h1>
        <p>this is where you can sign up for an account</p>
        <h1>Dark Mode</h1>
        <p>This button will switch the colors of the website to a darker color set</p>
    </div> */}
    <div>
     <Container>
      <Row>
        <Col>
        <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Tutorial</Accordion.Header>
          <Accordion.Body>
            This page briefly explains elememts and pages on this website.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Home</Accordion.Header>
          <Accordion.Body>
            This is the landing page for all visitors.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header>Stats</Accordion.Header>
          <Accordion.Body>
            This page has a more indepth overview of the stocks that are being evaluated on the website
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='3'>
          <Accordion.Header>Monkey Technology</Accordion.Header>
          <Accordion.Body>
            This page describes the algorithm that we used to take the position of the monkeys and translate it into stock descisions.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='4'>
          <Accordion.Header>Log In</Accordion.Header>
          <Accordion.Body>
            This is where you log in to your account
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='6'>
          <Accordion.Header>Sign In</Accordion.Header>
          <Accordion.Body>
            This is where you can create an account that allows you to track specific stocks and add them to your portfolio
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='7'>
          <Accordion.Header>Settings</Accordion.Header>
          <Accordion.Body>
            This is where you can change different visual elements of the website. In order for the changes to stay between sessions, you must create an account or log in to an already existing account.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='8'>
          <Accordion.Header>Dark Mode</Accordion.Header>
          <Accordion.Body>
            This button toggles the entire website into a color scheme that is easier on the eye when studying the screen in a darkend environment.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
        </Col>
      </Row>
     </Container>
    </div>
    {/* <img className = 'image-fluid' src="https://i.kym-cdn.com/entries/icons/facebook/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.jpg" alt="Image" /> */}
  </React.Fragment>
      

  )
}

export default tPage