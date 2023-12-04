import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

function Home(props) {
  const { name } = props;
  
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  let content;

  if (name !== '') {
    content = (
      <div>
        <div> Welcome {name} </div>
        <Button variant="primary" onClick={handleShow}>
          Open Modal
        </Button>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Please work</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>test test</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else {
    content = <div> Home page placeholder</div>;
  }

  return <React.Fragment>{content}</React.Fragment>;
}

Home.propTypes = {
  name: PropTypes.string,
};

Home.defaultProps = {
  name: '',
};

export default Home;
