import React from 'react'
import PropTypes from 'prop-types'
import * as data from '../SearchPage/dataHelper.js'
// import { useNavigation } from 'react-navigation'

export default function Home (props) {
  const { theme } = props
  const [stock, setStock] = React.useState([])
  const topFive = []
  const priceList = []
  React.useEffect(() => {
    const fetchData = async () => {
      const stockData = await data.retrieveStocks()
      setStock(stockData)
    }
    fetchData()
  }, [])
  stock.map(stock => {
    const data = {
      name: stock.name, price: stock.currentPrice, percent: stock.percentChange
    }
    priceList.push(stock.currentPrice)
    topFive.push(data)
    return []
  })
  const fivePrice = priceList.sort((a, b) => b - a).slice(0, 5)
  const fiveStock = []
  fivePrice.map(price => {
    topFive.map(stock => {
      if (price === stock.price) {
        fiveStock.push(stock)
      }
      return []
    })
    return []
  })
  let k = 0
  const stocks = fiveStock.map(
    (thisStock) => {
      k++
      return (
        <React.Fragment key = {k}>
        <tr>
          <td>{thisStock.name}</td>
          <td>{thisStock.price}</td>
          <td>{thisStock.percent}</td>
        </tr>
        </React.Fragment>
      )
    }
  )
  // const navigation = useNavigation()
  // General data? Stocks notifications etc.
  return (
  <React.Fragment>
    <div style = {{ backgroundColor: theme }}>
    <div className ="container">
      <table className={`table table-${props.theme} table-striped`}>
        <thead>
          <tr>
            <th scope="col">Stock</th>
            <th scope="col">Price</th>
            <th scope="col">Change</th>
          </tr>
        </thead>
        <tbody>
          {stocks}
        </tbody>
        </table>
        </div>
    </div>
  </React.Fragment>
  )
}
Home.propTypes = {
  theme: PropTypes.string
}
Home.defaultProps = {
  theme: 'light'
}
