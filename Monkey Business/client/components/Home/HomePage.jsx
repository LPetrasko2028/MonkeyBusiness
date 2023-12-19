import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import StockTable from '../StockTable/StockTable.jsx'
import { retrieveInvestorStocks, retrieveStockDetails } from '../../mbdataHelper.js'
import { Card, Row } from 'react-bootstrap'
import IntroPage from '../Intro/IntroPage.jsx'
function Home (props) {
  const { name, buttonTheme } = props
  const [userInvestments, setUserInvestments] = useState([])
  const [userInvestmentPage, setUserInvestmentPage] = useState(0)
  const [userInvestmentPageSize, setUserInvestmentPageSize] = useState(10)
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
      console.log('User is not logged in')
    }
  }, [name])
  let content
  if (name !== '') {
    content = (
      <React.Fragment>
        <div className='px-4 mx-4 ' style={{ display: 'flex', justifyContent: 'space-between' }}><h2 id='name'> Welcome {name} </h2> <h2 id='amount'> Account Value: 40000 </h2></div>
        <StockTable stocks={userInvestments} page={userInvestmentPage} pageSize={userInvestmentPageSize} buttonThem = { buttonTheme }/>
      </React.Fragment>
    )
  } else {
    content = (
      <React.Fragment>
        <h2> Welcome To Our Monkey Business Web App!</h2>
        <h4>Please Login To See All of Our App`s Features </h4>

          <IntroPage />
      </React.Fragment>
    )
  }
  return <React.Fragment>{content}</React.Fragment>
}
Home.propTypes = {
  name: PropTypes.string,
  buttonTheme: PropTypes.string
}
Home.defaultProps = {
  name: ''
}
export default Home
