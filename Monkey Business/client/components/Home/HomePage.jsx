import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import StockTable from '../StockTable/StockTable.jsx'
import { retrieveInvestorStocks } from '../../mbdataHelper.js'
function Home (props) {
  const { name } = props
  const [userInvestments, setUserInvestments] = useState([])
  useEffect(() => {
    if (name !== '') {
      const renderUserInvestments = async () => {
        const fetchUserInvestments = await retrieveInvestorStocks()
        setUserInvestments(fetchUserInvestments)
        console.log('fetchUserInvestments: ' + fetchUserInvestments)
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
        <div> Welcome {name} </div>
        <StockTable stocks={(userInvestments.length < 1) ? userInvestments : [{}]}/>
      </React.Fragment>
    )
  } else {
    content = (
      <React.Fragment>
        <div>
          {' '}
          Welcome To Our Monkey Business Web App! Please Login To See All of Our
          App's Features{' '}
        </div>
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
