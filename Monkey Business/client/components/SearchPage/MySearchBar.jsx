import React from 'react'
import * as data from './dataHelper.js'
import { Modal, Row } from 'react-bootstrap'
import SearchResult from './SearchResult.jsx'
export const MySearchBar = () => {
  const [searchInput, setSearchInput] = React.useState('')
  const [stock, setStock] = React.useState([])
  const [searchResult, setSearchResult] = React.useState([''])
  const [price, setPrice] = React.useState(0)
  const [cap, setCap] = React.useState(0)
  const [percent, setPercent] = React.useState(0)
  const [volume, setVol] = React.useState(0)
  const [name, setName] = React.useState('')
  const [show, setShow] = React.useState(false)

  function setModal (nName, nPrice, nCap, nPer, nVol) {
    setCap(nCap)
    setName(nName)
    setPercent(nPer)
    setVol(nVol)
    setPrice(nPrice)
    setShow(true)
  }
  function handleClose (e) {
    setShow(false)
  }
  React.useEffect(() => {
    const fetchData = async () => {
      const stockData = await data.retrieveStocks()
      setStock(stockData)
    }
    fetchData()
  }, [])
  const handleChange = (e) => {
    e.preventDefault()
    const newStocksName = []
    setSearchInput(e.target.value)
    if (e.target.value.length > 0) {
      const regex = new RegExp(e.target.value, 'gmi')
      stock.map((stockData) => {
        if (String(stockData.name).match(regex) != null) {
          newStocksName.push(stockData.name)
        }
        return ([])
      })
    } else {
      stock.map((stockData) => {
        newStocksName.push(stockData.name)
        return ([])
      })
    }
    setSearchResult(newStocksName)
  }
  let k = 0
  const stocks = searchResult.map(
    (thisStock) => {
      k++
      return (
      <SearchResult key = {k} k = {k} onDataRequested={setModal} stock={thisStock} ></SearchResult>
      )
    }
  )
  // getting info into this and make a card out of it, with a onclick dropdown thingy
  return (
    <React.Fragment>
        <Row className = 'px-3 py-3 pt-1 pb-2 bg-dark'>
            <input
              id = 'searchForm'
              type='text'
              placeholder='Search'
              className='pl-1'
              value = {searchInput}
              onChange={ handleChange }
            />
        </Row>
        {stocks}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stock: {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            Current Price: {price}
          </Row>
          <Row>
            Market Cap: {cap}
          </Row>
          <Row>
            Percent Change: {percent}
          </Row>
          <Row>
            Volume: {volume}
          </Row>
        </Modal.Body>
      </Modal>
      </React.Fragment>
  )
}
