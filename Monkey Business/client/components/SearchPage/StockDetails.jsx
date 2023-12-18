import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Card } from 'react-bootstrap'
import { retrieveStockDetail } from './dataHelper'
export default function StockDetails (props) {
  const { stockName } = props
  const [show, setShow] = React.useState(false)
  const [open, setOpen] = React.useState('')
  const [low, setLow] = React.useState('')
  const [close, setClose] = React.useState('')
  const [vol, setVol] = React.useState('')
  const [date, setDate] = React.useState('')
  const [high, setHigh] = React.useState('')
  function handleClose () {
    setShow(false)
  }
  async function handleClick () {
    const detail = await retrieveStockDetail(stockName)
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
      <Card onClick={handleClick}> { stockName } </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stock: { stockName } </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Date: {date} <br/>
          Open: {'$' + open} <br/>
          Low: {'$' + low} <br/>
          High: {'$' + high} <br/>
          Close: {'$' + close} <br/>
          Volume: {vol} <br/>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}
StockDetails.propTypes = {
  stockName: PropTypes.string.isRequired
}
