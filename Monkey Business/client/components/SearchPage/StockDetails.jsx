import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import { retrieveStockDetail } from './dataHelper'
import CustomModal from './Modal.jsx'
import { postBuySellStock } from '../../mbdataHelper.js'
export default function StockDetails (props) {
  const { stock } = props
  const [show, setShow] = React.useState(false)
  const [open, setOpen] = React.useState('')
  const [low, setLow] = React.useState('')
  const [close, setClose] = React.useState('')
  const [vol, setVol] = React.useState('')
  const [date, setDate] = React.useState('')
  const [high, setHigh] = React.useState('')

  const [showModal, setShowModal] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [storedValue, setStoredValue] = React.useState(0)
  const [stockSymbol, setStockSymbol] = React.useState('')
  const [type, setType] = React.useState('')

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleOpenModal = (e) => {
    const stockSymbol = e.target.id
    const type = e.target.value
    setStockSymbol(stockSymbol)
    setType(type)
    setShowModal(true)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  async function handleEnter (stockSymbol, type) {
    const intValue = parseInt(inputValue)
    if (!isNaN(intValue)) {
      setStoredValue(intValue)
      const submitSuccess = await postBuySellStock(stockSymbol, 'unknown', type, intValue)
      if (submitSuccess) {
        console.log('submitSuccess: ', submitSuccess)
      } else {
        console.log('submitSuccess: ', submitSuccess)
      }
    }
    // setInputValue('')
    setShowModal(false)
  }
  function handleClose () {
    setShow(false)
  }
  async function handleClick () {
    const detail = await retrieveStockDetail(stock.symbol)
    console.log ('detail: ', detail)
    const stockDetail = detail[detail.length - 1]
    setOpen(stockDetail[2])
    setLow(stockDetail[3])
    setHigh(stockDetail[4])
    setClose(stockDetail[5])
    setVol(stockDetail[6])
    setDate(stockDetail[0])
    setShow(true)
  }
  return (
    <React.Fragment>
      <td>{stock.symbol}</td>
      <td>{stock.name}</td>
      <td>{stock.quoteType}</td>
      <td>{stock.industry}</td>
      <td>{stock.score}</td>
      <td>
        {stock.symbol
          ? (
          <Button
            onClick={handleOpenModal}
            id={stock.symbol}
            value="Buy"
            variant="primary"
          >
            Buy Stock
          </Button>
            )
          : null}
        <CustomModal
          stockName={stockSymbol}
          type={type}
          showModal={showModal}
          setShowModal={handleCloseModal}
        />

        {stock.symbol
          ? (
          <Button
            onClick={handleOpenModal}
            id={stock.symbol}
            value="Sell"
            variant="danger"
          >
            Sell Stock
          </Button>
            )
          : null}
        <CustomModal
          stockName={stockSymbol}
          type={type}
          showModal={showModal}
          setShowModal={handleCloseModal}
        />
      </td>
      <Button onClick={handleClick}> Get Details </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stock: {stock.symbol} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Date: {date} <br />
          Open: {'$' + open} <br />
          Low: {'$' + low} <br />
          High: {'$' + high} <br />
          Close: {'$' + close} <br />
          Volume: {vol} <br />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}
StockDetails.propTypes = {
  stock: PropTypes.object.isRequired
}
