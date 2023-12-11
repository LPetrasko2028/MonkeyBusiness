import React, { useRef, useEffect, useState } from 'react'
import { searchStockAPI } from '../../mbdataHelper.js'
import { Card, Button, Table, Modal} from 'react-bootstrap'
import { postBuySellStock } from '../../mbdataHelper.js'

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
  const end = 10

  const handleChange = async (e) => {
    e.preventDefault()
    console.log('searchInput: ', searchInput)
    console.log('e.target.value: ', e.target.value)
    setSearchInput(e.target.value)
  }

//this is to add the button to add and sell stocks

const [showModal, setShowModal] = useState(false);
const [inputValue, setInputValue] = useState('');
const [storedValue, setStoredValue] = useState(0);

const handleCloseModal = () => {
    setShowModal(false);
};

const handleOpenModal = () => {
    setShowModal(true);
};

const handleInputChange = (e) => {
    setInputValue(e.target.value);
};

const handleEnter = () => {
    const intValue = parseInt(inputValue);
    if (!isNaN(intValue)) {
        setStoredValue(intValue);
    }
    setInputValue('');
    setShowModal(false);
};
  //end of button code

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
      <Card className="mx-5">
        <Card.Body>
          <Card.Header>Stock Search</Card.Header>
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
              {searchResult.map((stock) => (
                <tr key={stock.symbol}>
                  <td>{stock.symbol}</td>
                  <td>{stock.name}</td>
                  <td>{stock.quoteType}</td>
                  <td>{stock.industry}</td>
                  <td>{stock.score}</td>
                  <td>

                    {stock.symbol ? <Button onClick={handleOpenModal}variant="primary">Buy Stock</Button> : null}
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal Title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input type="number" value={inputValue} onChange={handleInputChange} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleEnter}>
                                Enter
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {stock.symbol ? <Button onClick={handleOpenModal} variant="danger">Sell Stock</Button> : null}
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal Title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input type="number" value={inputValue} onChange={handleInputChange} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleEnter}>
                                Enter
                            </Button>
                        </Modal.Footer>
                    </Modal>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}
