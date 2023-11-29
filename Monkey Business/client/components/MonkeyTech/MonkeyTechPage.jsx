import React, {useState} from 'react'
import { getMonkeyInvestments} from '../../mbdataHelper'
import { Alert, Table } from 'react-bootstrap'



function MonkeTech () {
  const [tableData,setTableData] = useState([])
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
  const onSuccessMessage = 'Monkey Investments retrieved'
    const onFailMessage = 'Failed to retrieve monkey investments'



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
// Will show live vids of the monkeys?
  return (
    

    <React.Fragment>
      
       <Alert show={show} variant= {success ? "success" : "danger"} onClose={handleClose} dismissible>
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
        {
            tableData.map((obj) => {
              return (
                <tr>
                  <td>{obj.name}</td>
                  <td>{obj.stocks}</td>
                  <td>{obj.history}</td>
                  <td>{obj.stockPool}</td>
                  <td>{obj.amount}</td>
                </tr>
              );
            })
          }  
        </tbody>
        
      </Table>
      
    </React.Fragment>
    
  )
 
}

export default MonkeTech
