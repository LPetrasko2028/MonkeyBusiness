import React, { useEffect, useState } from 'react'
import { Table, Alert } from 'react-bootstrap'
import { getMonkeyInvestments } from '../../mbdataHelper'

function MonkeTech () {
  const [tableData, setTableData] = useState([])
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const onSuccessMessage = 'Monkey Investments retrieved'
  const onFailMessage = 'Failed to retrieve monkey investments'

  useEffect(() => {
    const renderMonkeyInvestments = async (e) => {
      const fetchMonkeyInvestments = await getMonkeyInvestments()
      if (fetchMonkeyInvestments) {
        setSuccess(true)
      } else {
        setSuccess(false)
      }
      handleShow()
      setTableData(fetchMonkeyInvestments)
    }
    renderMonkeyInvestments()
  }, [])
  // function mapMonkeyInvestments () {
  //   return tableData.map((currentValue) => {
  //     return (
  //     <tr>
  //       <td>{currentValue.stockName}</td>
  //       <td>{currentValue.stocks}</td>
  //       <td>{currentValue.history}</td>
  //       <td>{currentValue.stockPool}</td>
  //       <td>{currentValue.amount}</td>
  //     </tr>
  //     )
  //   })
  // }

  // Will show live vids of the monkeys?
  return (

    <React.Fragment>

       <Alert show={show} variant= {success ? 'success' : 'danger'} onClose={handleClose} dismissible>
        <Alert.Heading>Retrieving Monkey Stock Details</Alert.Heading>
        <p>
          {success ? onSuccessMessage : onFailMessage}
        </p>
      </Alert>

      <Table striped border hover id='monkeyTable'>
        <thead>
          <tr>
            <th scope="col">Stock Name</th>
            <th scope="col">Stocks</th>
            <th scope="col">History</th>
            <th scope="col">Stock Pool</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>

        </tbody>

      </Table>
<div >{ tableData }</div>
    </React.Fragment>

  )
}

export default MonkeTech
