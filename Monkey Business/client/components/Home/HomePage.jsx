import React from 'react'
import PropTypes from 'prop-types'
// import { useNavigation } from 'react-navigation'

export default function Home (props) {
  const { theme, status, name } = props
  console.log('Home props: ', props)
  console.log('Home.theme prop type: ', typeof (theme))

  let content
  if (status !== false) {
    content = (<div> Welcome {name} </div>)
  } else {
    content = (<div> Home page placeholder</div>)
  }

  // const navigation = useNavigation()
  // General data? Stocks notifications etc.
  return (
  <React.Fragment>
    <div style = {{ backgroundColor: theme }}>
    <div className ="container">
      {content}
      <table className={`table table-${props.theme} table-striped`}>
        <thead>
          <tr>
            <th scope="col">Stock</th>
            <th scope="col">Price</th>
            <th scope="col">Change</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>Apple</td>
          <td>123</td>
          <td>123</td>
        </tr>
        </tbody>
        </table>
        </div>
    </div>
    <div>
      <tHome></tHome>
    </div>
  </React.Fragment>
  )
}
Home.propTypes = {
  theme: PropTypes.string,
  status: PropTypes.bool,
  name: PropTypes.string
}
Home.defaultProps = {
  theme: 'light',
  status: false,
  name: ''
}
