import React from 'react'
import { Accordion, Container,Row, Col } from 'react-bootstrap'
import { BsQuestionCircle,BsBrightnessHigh} from 'react-icons/bs'



function tPage () {
  return (
  
    <React.Fragment>
    <div>
     <Container>
      <Row>
        <Col>
        <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey='0'>
          <Accordion.Header><BsQuestionCircle/></Accordion.Header>
          <Accordion.Body>
            This is a tutorial that briefly explains elememts and pages on this website.
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
          <Accordion.Header><BsBrightnessHigh/></Accordion.Header>
          <Accordion.Body>
            This Dark mode button toggles the entire website into a color scheme that is easier on the eye when studying the screen in a darkend environment.
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
