import React from 'react'
import PropTypes from 'prop-types'
import { Table, Card, Button } from 'react-bootstrap'

export default function StockTable ({ stocks, page, pageSize, buttonTheme }) {
  console.log('stocks: ', stocks)
  return (
    <Card className="px-2 mx-5">
      <Table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Volume</th>
            <th>Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.name ? stock.name : ''}>
              <td>{stock.name ? stock.name : ''}</td>
              <td>{stock.price ? stock.price : ''}</td>
              <td>{stock.volume ? stock.volume : ''}</td>
              <td>{stock.change ? stock.change : ''}</td>
              <td>{stock.marketCap ? stock.marketCap : ''}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Card.Footer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button
              type="button"
              variant='outline'
              className={(page > 1) ? buttonTheme : buttonTheme + ' disabled'}
              onClick={() => {
                console.log('Previous')
              }}
            >
              Previous Page
            </Button>
          </div>
          <div>
            <span>
              Page {page + 1} of {Math.ceil(stocks.length / pageSize)} (Stocks: {page * pageSize} - {(((page + 1) * pageSize) < stocks.length) ? ((page + 1) * pageSize) : stocks.length} of {stocks.length})
            </span>
          </div>
          <div>
            <Button
              type="button"
              variant='outline'
              className= {(page > 1) ? buttonTheme : buttonTheme + ' disabled'}
              onClick={() => {
                console.log('Next')
              }}
            >
              Next Page
            </Button>
          </div>
        </div>
      </Card.Footer>
    </Card>
  )
}
StockTable.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      volume: PropTypes.number.isRequired,
      change: PropTypes.number.isRequired,
      marketCap: PropTypes.number.isRequired
    })
  ).isRequired,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  buttonTheme: PropTypes.string
}
StockTable.defaultProps = {
  stocks: [{
    name: '',
    price: 0,
    volume: 0,
    change: 0,
    marketCap: 0
  }],
  page: 0,
  pageSize: 10
}
