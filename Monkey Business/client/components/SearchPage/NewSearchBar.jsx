import React from 'react'
import * as dt from './dataHelper.js'
import { Row, Button } from 'react-bootstrap'
let myTheme = 'light'
let buttonTheme = 'outline-dark'
const isMidnight = false
if (isMidnight) { myTheme = 'dark' }
if (myTheme === 'light') {
  buttonTheme = 'outline-dark'
} else {
  buttonTheme = 'outline-light'
}
export const SearchBar = () => {
  const [searchInput, setSearchInput] = React.useState('')
  const [stock, setStock] = React.useState([])
  async function onSubmit (e) {
    e.preventDefault()
    const data = {
      searchInput, start: 0, end: 20
    }
    setStock(dt.retrieveStocks(data))
  }
  return (
    <React.Fragment>
        <Row className = 'px-3 py-3 pt-1 pb-2 bg-dark'>
            <input
              id = 'searchForm'
              type='text'
              placeholder='Search'
              className='pl-1'
              value = {searchInput}
              onChange={ e => setSearchInput(e.target.value) }
            />
        </Row>
        <Row>
        <Button type = 'submit' variant={buttonTheme} onClick={onSubmit}>Submit Changes</Button>
        </Row>
        {stock}
      </React.Fragment>
  )
}
