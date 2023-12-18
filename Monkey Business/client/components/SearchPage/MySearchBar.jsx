import React from 'react'
import * as data from './dataHelper.js'
import { Row, Button, Modal } from 'react-bootstrap'
import StockDetails from './StockDetails.jsx'
export const MySearchBar = () => {
  const [searchInput, setSearchInput] = React.useState('')
  const [stock, setStock] = React.useState([''])
  const [searchResult, setSearchResult] = React.useState([''])
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    const fetchData = async () => {
      const stockData = await data.retrieveStocks()
      setStock(stockData)
    }
    fetchData()
  }, [])
  async function handleSubmit (e) {
    e.preventDefault()
    if (await data.retrieveStocks(searchInput)) {
      const result = await data.retrieveStocks(searchInput)
      setStock(result)
      console.log(result)
    } else {
      setShow(true)
    }
  }
  function handleClose () {
    setShow(false)
  }
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }
  let k = 0
  let stocks = ['']
  if (stock !== null) {
    stocks = stock.map(
      (thisStock) => {
        k++
        return (
      <Row key = {k} className = 'px-3 py-3 pt-1 pb-2'>
        <StockDetails stockName={thisStock}/>
      </Row>
        )
      }
    )
  }
  return (
    <React.Fragment>
        <Row className = 'px-3 py-3 pt-1 pb-2'>
          <form method = "get" onSubmit={handleSubmit}>
            <input
              id = 'searchForm'
              type='text'
              placeholder='Search'
              className='px-3 py-3 pt-1 pb-2 w-75'
              value = {searchInput}
              onChange={ handleChange }
            />
            <Button type = 'submit' > Search </Button>
            </form>
        </Row>
        {stocks}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          No stock found!
        </Modal.Header>
        <Modal.Body>
          Please check your input and make sure you have the right name to search for.
        </Modal.Body>
      </Modal>
      </React.Fragment>
  )
}
