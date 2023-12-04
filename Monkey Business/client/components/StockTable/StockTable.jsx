import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

export default function StockTable ({ stocks }) {
  console.log('stocks: ', stocks)
  return (
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
          <tr key={(stock.name) ? stock.name : ''}>
            <td>{(stock.name) ? stock.name : ''}</td>
            <td>{(stock.price) ? stock.price : ''}</td>
            <td>{(stock.volume) ? stock.volume : ''}</td>
            <td>{(stock.change) ? stock.change : ''}</td>
            <td>{(stock.marketCap) ? stock.marketCap : ''}</td>
          </tr>
        ))}
      </tbody>
    </Table>
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
  ).isRequired
}
StockTable.defaultProps = {
  stocks: [{
    name: '',
    price: 0,
    volume: 0,
    change: 0,
    marketCap: 0
  }]
}
