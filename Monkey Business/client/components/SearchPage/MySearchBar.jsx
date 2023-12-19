import React, { useRef, useEffect } from 'react'
import { searchStockAPI } from '../../mbdataHelper.js'
import { Card, Button, Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import StockDetails from './StockDetails.jsx'
export default function MySearchBar (props) {
  const { buttonTheme, buttonTheme2 } = props
  const [searchInput, setSearchInput] = React.useState('')
  const [searchResult, setSearchResult] = React.useState([''])
  const searchForm = useRef()
  let content
  useEffect(() => {
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
  useEffect(() => {
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
  let stocks = ['']
  if (searchResult !== null) {
    stocks = searchResult.map(
      (stock) => {
        return (
          <tr key={stock.symbol} >
          <StockDetails stock = {stock} buttonTheme={buttonTheme} buttonTheme2={buttonTheme2}/>
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
            type = 'button'
            variant='outline'
            className= {buttonTheme + ' ml-2'}
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
MySearchBar.propTypes = {
  buttonTheme: PropTypes.string,
  buttonTheme2: PropTypes.string
}
