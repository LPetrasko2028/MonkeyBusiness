import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { postBuySellStock } from '../../mbdataHelper.js'

export const CustomModal = ({ stockName, type, showModal, setShowModal }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }
  async function handleEnter (stockSymbol, type) {
    const intValue = parseInt(inputValue)
    if (!isNaN(intValue)) {
      const submitSuccess = await postBuySellStock(stockSymbol, 'unknown', type, intValue)
      if (submitSuccess) {
        console.log('submitSuccess: ', submitSuccess)
      } else {
        console.log('submitSuccess: ', submitSuccess)
      }
    }
    // setInputValue('')
    handleCloseModal()
  }

  return (
    <React.Fragment>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{stockName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            id={stockName}
            value={type}
            onClick={(e) =>
              handleEnter(
                e.currentTarget.getAttribute('id'),
                e.currentTarget.value
              )
            }
          >
            Enter
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

CustomModal.propTypes = {
  stockName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
}

CustomModal.defaultProps = {
  stockName: 'Modal Title',
  type: 'Modal Type',
  showModal: false,
  setShowModal: () => {}
}

export default CustomModal
