import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import { retrieveStockDetail } from './dataHelper'
export default function SearchResult (props) {
  const { stock, onDataRequested, k } = props
  async function handleClick (e) {
    e.preventDefault()
    const data = {
      stock
    }
    const stockDetail = await retrieveStockDetail(data)
    if (stockDetail !== null) {
      onDataRequested(stock, stockDetail.currentPrice, stockDetail.marketCap, stockDetail.percentChange, stockDetail.volume)
    }
  }
  return (
      <Card className = 'px-3 py-3 pt-1 pb-2' key = {k} onClick = {handleClick} > {stock} </Card>
  )
}
SearchResult.propTypes = {
  stock: PropTypes.string.isRequired,
  onDataRequested: PropTypes.func.isRequired,
  k: PropTypes.number.isRequired
}
