import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Alert, Button } from 'react-bootstrap'
import { getMonkeyInvestments } from '../../mbdataHelper'
import './testStyle.css'

function MonkeyTech () {
  const [tableData, setTableData] = useState([])
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [editStockPool, setEditStockPool] = useState(false) // Added state for editStockPool
  const [stockPool, setStockPool] = useState([]) // Added state for stockPool
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const onSuccessMessage = 'Monkey Investments retrieved'
  const onFailMessage = 'Failed to retrieve monkey investments'

  useEffect(() => {
    const renderMonkeyInvestments = async () => {
      const fetchMonkeyInvestments = await getMonkeyInvestments()
      if (fetchMonkeyInvestments) {
        setSuccess(true)
        setTableData(fetchMonkeyInvestments)
      } else {
        setSuccess(false)
      }
      handleShow()

      console.log(fetchMonkeyInvestments)
    }
    renderMonkeyInvestments()
  }, [])

  const handleDelete = (name) => {
    const updatedTableData = tableData.filter((item) => item.name !== name)
    setTableData(updatedTableData)
  }

  const handleEditStockPool = () => {
    setEditStockPool(!editStockPool)
  }
  const handleRemoveFromStockPool = (name) => {
    console.log('Remove from stock pool')
    const updatedStockPool = stockPool.filter((item) => item.name !== name)
    setStockPool(updatedStockPool)
  }

  return (
    <React.Fragment>
      <Alert show={show} variant={success ? 'success' : 'danger'} onClose={handleClose} dismissible>
        <Alert.Heading>Retrieving Monkey Stock Details</Alert.Heading>
        <p>
          {success ? onSuccessMessage : onFailMessage}
        </p>
      </Alert>

      {tableData.map((currentValue) => (
        <Card key={currentValue.name} className="mx-3">
          <Card.Body>
            <Card.Title>
              <div>
                {currentValue.name}
                <div>Monkey Investment Total: {currentValue.amount}</div>
              </div>
              <div>
                <Button variant="link" onClick={handleEditStockPool}>
                  {editStockPool ? 'Save' : 'Edit'} Stock Pool
                </Button>
              </div>
            </Card.Title>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Stocks</td>
                  <td>
                    <Container fluid>
                      <Row>
                        {currentValue.stocks.map((stock) => (
                          <Col key={stock.stockName}>
                            <Card key={stock.stockName}>
                              <Card.Body>{stock.stockName + ', ' + stock.amount}</Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  </td>
                </tr>
                <tr>
                  <td>History</td>
                  <td>
                    <Container fluid>
                      <Row>
                        {currentValue.history.map((history) => (
                          <Col key={history.name}>
                            <Card
                              key={history.name}
                              className={history.type === 'buy' ? 'buy-class' : 'sell-class'}
                            >
                              <Card.Body>
                                {history.name + ', ' + history.date + ', ' + history.type + ', ' + history.amount}
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  </td>
                </tr>
                <tr>
                  <td>Stock Pool</td>
                  <td>
                    {!editStockPool
                      ? (
                      <Container fluid>
                        <Row>
                          {currentValue.stockPool.map((stockName) => (
                            <Col key={stockName}>
                              <Card key={stockName}>
                                <Card.Body>{stockName}</Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </Container>
                        )
                      : (
                      <Container fluid>
                        <Row>
                          {currentValue.stockPool.map((stockName) => (
                            <Col key={stockName}>
                              <Card key={stockName}>
                                <Card.Body><Button className='mx-2' onClick={() => handleRemoveFromStockPool(stockName)}>X</Button>{stockName}</Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </Container>
                        )}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button variant="danger" onClick={() => handleDelete(currentValue.name)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </React.Fragment>
  )
}

export default MonkeyTech
