import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

export default function StockTable ({ stocks }) {
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
          <tr key={stock.name}>
            <td>{stock.name}</td>
            <td>{stock.price}</td>
            <td>{stock.volume}</td>
            <td>{stock.change}</td>
            <td>{stock.marketCap}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
StockTable.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired
}
