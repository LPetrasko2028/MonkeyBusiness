import React from 'react'
import * as dt from './dataHelper.js'
import { Row, Button } from 'react-bootstrap'
let myTheme = 'light'
let buttonTheme = 'outline-dark'
const isMidnight = true
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
    const array = await dt.retrieveStocks(searchInput)
    console.log('data is retrieved')
    console.log(array)
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
            <Button type = 'submit' variant={buttonTheme} onClick={onSubmit}>Submit Changes</Button>
        </Row>
        {stock}
      </React.Fragment>
  )
}
