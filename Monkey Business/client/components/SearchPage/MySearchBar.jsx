import React, { useRef, useEffect } from 'react'
import { searchStockAPI } from '../../mbdataHelper.js'
import { Card, Button, Table } from 'react-bootstrap'
export const MySearchBar = () => {
  const [searchInput, setSearchInput] = React.useState('')
  const [searchResult, setSearchResult] = React.useState([''])
  const searchForm = useRef()

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
  const end = 5

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
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center px-1 py-3">
        <Card>
          <Card.Body>
            <Card.Header>Stock Search</Card.Header>
            <input
              id="searchForm"
              type="text"
              placeholder="Search"
              className="pl-1"
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
          </Card.Body>
        </Card>
      </div>

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
          {searchResult.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{stock.quoteType}</td>
              <td>{stock.industry}</td>
              <td>{stock.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  )
}
