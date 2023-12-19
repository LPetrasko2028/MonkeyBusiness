import React from 'react'
import { searchStockAPI, postBuySellStock } from '../../mbdataHelper.js'
import { Card, Button, Table, Modal } from 'react-bootstrap'
import StockDetails from './StockDetails.jsx'
import CustomModal from './Modal.jsx'
export const MySearchBar = () => {
  const [searchInput, setSearchInput] = React.useState('')
  const [searchResult, setSearchResult] = React.useState([''])
  const searchForm = React.useRef()
  let content
  React.useEffect(() => {
    document.body.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  async function onKeyDown (event) {
    const submit = event.key === 'Enter'
    if (submit) {
      await handleSearch()
    }
  }
  React.useEffect(() => {
    searchForm.current.focus()
  }, [])
  const start = 0
  const end = 10

  const handleChange = async (e) => {
    e.preventDefault()
    console.log('searchInput: ', searchInput)
    console.log('e.target.value: ', e.target.value)
    setSearchInput(e.target.value)
  }
  function handleClick (stockName) {
    if (stockName !== null) {
      content = (
        <StockDetails stockName = {stockName} />
      )
    } else {
      content = (<div></div>)
    }
    console.log(stockName)
  }
  async function handleSearch () {
    const searchInput = searchForm.current.value
    if (searchInput === '') {
      console.log('searchInput is empty')
      setSearchResult([''])
    } else {
      const searchResult = await searchStockAPI({ searchInput, start, end })
      if (searchResult) {
        setSearchResult(searchResult)
      } else {
        setSearchResult([''])
      }
    }
  }

  // end of button code
  let stocks = ['']
  if (searchResult !== null) {
    stocks = searchResult.map(
      (stock) => {
        return (
          <tr key={stock.symbol} >
          <StockDetails stock = {stock}/>
        </tr>
        )
      }
    )
  }
  return (
    <React.Fragment>
      <Card className="mx-5">
      <Card.Header>Stock Search</Card.Header>
        <Card.Body>
          <Card.Text>
            Search for a stock by symbol or name
          </Card.Text>
          <div className='input-group '>
          <input
            id="searchForm"
            type="text"
            placeholder="Search"
            className="fill"
            value={searchInput}
            onChange={handleChange}
            ref={searchForm}
          />
          <Button
            variant="outline-success"
            className="ml-2"
            onClick={handleSearch}
          >
            Search
          </Button>
          </div>
        </Card.Body>
      </Card>
      <Card className="mx-5">
        <Card.Header>Search Results</Card.Header>
        <Card.Body>
          <Table className="table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Quote Type</th>
                <th>Industry</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              { stocks }
            </tbody>
          </Table>
          {content}
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}
