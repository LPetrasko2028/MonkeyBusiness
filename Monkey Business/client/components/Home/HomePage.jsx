import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import StockTable from '../StockTable/StockTable.jsx'
import { retrieveInvestorStocks, retrieveStockDetails } from '../../mbdataHelper.js'
import { Card, Row } from 'react-bootstrap'
function Home (props) {
  const { name } = props
  const [userInvestments, setUserInvestments] = useState([])
  const [userInvestmentPage, setUserInvestmentPage] = useState(0)
  const [userInvestmentPageSize, setUserInvestmentPageSize] = useState(10)
  const [testStockDetails, setTestStockDetails] = useState([])
  const [testTimeFrame, setTestTimeFrame] = useState(1)
  useEffect(() => {
    if (name !== '') {
      const renderUserInvestments = async () => {
        const fetchUserInvestments = await retrieveInvestorStocks((userInvestmentPage * userInvestmentPageSize), ((userInvestmentPage + 1) * userInvestmentPageSize))
        setUserInvestments(fetchUserInvestments)
        fetchUserInvestments.forEach((stock) => {
          console.log(stock)
        })
      }
      renderUserInvestments()
    } else {
      const renderTestStockDetails = async () => {
        //const fetchTestStockDetails = await retrieveStockDetails('AAPL', testTimeFrame)
        //setTestStockDetails(fetchTestStockDetails)
        //fetchTestStockDetails.forEach((date) => {
          //console.log(date)
        //})
      }
      renderTestStockDetails()
      console.log(testStockDetails)
      console.log('User is not logged in')
    }
  }, [name])
  let content
  if (name !== '') {
    content = (
      <React.Fragment>
        <div className='px-4 mx-4 ' style={{ display: 'flex', justifyContent: 'space-between' }}><h2 id='name'> Welcome {name} </h2> <h2 id='amount'> Account Value: 40000 </h2></div>
        <StockTable stocks={userInvestments} page={userInvestmentPage} pageSize={userInvestmentPageSize} />
      </React.Fragment>
    )
  } else {
    content = (
      <React.Fragment>
        <h2> Welcome To Our Monkey Business Web App!</h2>
        <h4>Please Login To See All of Our App's Features </h4>

          <StockTable />
      </React.Fragment>
    )
  }
  return <React.Fragment>{content}</React.Fragment>
}
Home.propTypes = {
  name: PropTypes.string
}
Home.defaultProps = {
  name: ''
}
export default Home
