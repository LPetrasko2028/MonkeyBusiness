import queryMongoDatabase from '../data/mongoController.js'
import { getStockShort, getStockDetails, searchStockAPI, GetCompareData } from './callPythonScripts.js'

export async function getStockInfo (req, res) {
  const stockName = req.body.stockName
  if (stockName === undefined) {
    res.status(404).json({ error: true, message: 'No Stock Name Provided' })
  }
  const timeFrameMonths = (!req.body.timeFrameMonths) ? parseInt(req.body.timeFrameMonths) : 1
  try {
    let stockData = await getStockDetails(stockName, (!timeFrameMonths) ? timeFrameMonths : 1)
    stockData = stockData.split('\n')
    stockData.pop()
    stockData.pop()
    stockData.pop()
    stockData.shift()
    stockData.shift()
    const stockArray = []
    for (let i = 0; i < stockData.length; i++) {
      const date = stockData[i].split(/[\s, ]+/)
      date.pop()
      stockArray.push(date)
    }
    res.send((stockArray))
  } catch (err) {
    console.log(err)
  }
}

export async function searchForStock (req, res) {
  const searchQuery = req.body.stockName
  console.log(searchQuery)
  console.log(req.body)
  if (searchQuery === undefined) {
    res.status(404).json({ error: true, message: 'No Search Query Provided' })
  }
  const start = (req.body.start) ? parseInt(req.body.start) : 0
  const end = (req.body.end) ? parseInt(req.body.end) : 5
  try {
    const stockName = await searchStockAPI(searchQuery, start, end)
    const stockNames = parseSearchData(stockName)
    res.json(stockNames)
  } catch (err) {
    console.log(err)
  }
}

async function getInvestorStockNames (username) {
  queryMongoDatabase(async db => {
    const data = await db.collection('Investor').findOne({ username })
    if ((data) < 1) {
      return ('Failed to find investor')
    }
    const stockNames = []
    for (const stock of data.stocks) {
      stockNames.push(stock[0])
    }
    const userStockData = await getStockShort(stockNames)
    return (userStockData)
  }, 'MonkeyBusinessWebApp')
}

function parseSearchData (searchData) {
  // parse stock data
  // return parsed data
  console.log(searchData)

  const regex = /(?<=\[)(.*?)(?=\])/g
  const matches = String(searchData.match(regex))
  const data = matches.substring(1, matches.length - 1)
  const parsedData = data.split(',\'')
  const parsedDataArray = parsedData.map((stock) => {
    stock = stock.split(/', '|', /g)
    console.log(stock)
    const stockObj = {
      symbol: stock[0].replace(/'/g, ''),
      name: stock[1],
      quoteType: stock[2],
      industry: stock[3],
      score: parseFloat(stock[4])
    }
    return (stockObj)
  })

  return (parsedDataArray)
}

function parseStockDataArray (stockData) {
  // parse stock data
  // return parsed data

  const regex = /(?<=\[)(.*?)(?=\])/g
  const matches = String(stockData.match(regex))
  const data = matches.substring(1, matches.length - 1)
  const parsedData = data.split(',\'')
  const parsedDataArray = parsedData.map((stock) => {
    stock = stock.replace(/'/g, '')
    stock = stock.split(', ')
    const stockObj = {
      name: stock[0],
      price: parseFloat(stock[1]),
      volume: parseInt(stock[2]),
      change: parseFloat(stock[3]),
      marketCap: parseFloat(stock[4])
    }
    // stock[1] = parseFloat(stock[1])
    // stock[2] = parseInt(stock[2])
    // stock[3] = parseFloat(stock[3])
    // stock[4] = parseFloat(stock[4])
    return (stockObj)
  })
  return (parsedDataArray)
}

export async function getInvestorStocks (req, res) {
  const username = req.session.username
  const start = (req.body.start) ? parseInt(req.body.start) : 0
  const end = (req.body.end) ? parseInt(req.body.end) : 5
  queryMongoDatabase(async db => {
    const data = await db.collection('Investor').findOne({ username })
    if ((data) < 1) {
      res.status(404).json({ error: true, message: 'Failed to find investor' })
      return
    }
    if (start > data.stocks.length || end > data.stocks.length) {
      res.json({ error: true, message: 'Invalid Range' })
      return
    }
    const stockNames = []
    for (let i = start; i < end; i++) {
      stockNames.push(data.stocks[i][0])
    }
    console.log(stockNames)
    console.log(typeof stockNames)
    const userStockData = await getStockShort(stockNames)
    res.json(parseStockDataArray(userStockData))
  }, 'MonkeyBusinessWebApp')
}

export async function updateStockCount (req, res) {
  const username = req.body.username
  const stockName = req.body.stockName
  const stockPrice = req.body.stockPrice
  const changeAmount = req.body.changeAmount
  const changeType = req.body.changeType

  queryMongoDatabase(async db => {
    // check if investor collection exists
    const data = await db.collection('Investor').findOne({ username })
    if (data < 1) {
      res.status(404).json({ error: true, message: 'No Investor Found' })
    } else {
      if (changeType === 'sell') {
        // handle the sale of stocks
        let foundStock = null
        let count = 0
        for (const stock of data.stocks) {
          if (stock[0] === stockName) {
            foundStock = stock
            break
          }
          count++
        }
        if (foundStock === null) {
          res.status(404).json({ error: true, message: 'Stock Not Found' })
        } else {
          if (changeAmount > foundStock[1]) {
            // error if selling more stocks than owned
            res.status(404).json({ error: true, message: 'Not Enough Stocks To Sell' })
          } else if (changeAmount === foundStock[1]) {
            // remove stock if selling same amount of stocks owned
            const nameDelete = await db.collection('Investor').updateOne(
              { username },
              { $pull: { stocks: foundStock }, $set: { balance: data.balance + (changeAmount * stockPrice) } }
            )
            if (nameDelete.modifiedCount === null) {
              res.status(404).json({ error: true, message: 'Stock Could Not Be Removed' })
            } else {
              const newHistoryArray = [changeType, stockName, changeAmount]
              const histUpdate = db.collection('Investor').updateOne(
                { username },
                { $push: { stockHistory: newHistoryArray } }
              )
              if (histUpdate.modifiedCount === null) {
                res.status(404).json({ error: true, message: 'History Could Not Be Updated' })
              }
              res.json({ error: false, message: 'Stock Successfully Removed' })
            }
          } else {
            // update amout of stocks in db otherwise
            const stockChange = await db.collection('Investor').updateOne(
              { username },
              { $set: { [`stocks.${count}`]: [stockName, (foundStock[1] - changeAmount)], balance: data.balance + (changeAmount * stockPrice) } })
            if (stockChange.modifiedCount === null) {
              res.status(404).json({ error: true, message: 'Stock Could Not Be Updated' })
            } else {
              const newHistoryArray = [changeType, stockName, changeAmount]
              const histUpdate = db.collection('Investor').updateOne({ username }, { $push: { stockHistory: newHistoryArray } })
              if (histUpdate.modifiedCount === null) {
                res.status(404).json({ error: true, message: 'History Could Not Be Updated' })
              }
              res.json({ error: false, message: 'Stock Successfully Updated' })
            }
          }
        }
      } else if (changeType === 'buy') {
      // handle the purchase of stocks
        if (changeAmount * stockPrice > data.balance) {
          // error if user doesn't have enough funds to buy stock
          res.status(404).json({ error: true, message: 'Not Enough Money To Buy' })
        } else {
          let foundStock = null
          let count = 0
          for (const stock of data.stocks) {
            if (stock[0] === stockName) {
              foundStock = stock
              break
            }
            count++
          }
          if (foundStock === null) {
            // push to stocks array if purchasing new stock
            const stockInsert = await db.collection('Investor').updateOne({ username }, { $push: { stocks: [stockName, changeAmount] }, $set: { balance: (data.balance - (changeAmount * stockPrice)) } })
            if (stockInsert.modifiedCount === null) {
              res.status(404).json({ error: true, message: 'Stock Could Not Be Added' })
            } else {
              const newHistoryArray = [changeType, stockName, changeAmount]
              const histUpdate = db.collection('Investor').updateOne({ username }, { $push: { stockHistory: newHistoryArray } })
              if (histUpdate.modifiedCount === null) {
                res.status(404).json({ error: true, message: 'History Could Not Be Updated' })
              }
              res.json({ error: false, message: 'Stock Successfully Added' })
            }
          } else {
            // update stock amount otherwise
            const stockChange = await db.collection('Investor').updateOne({ username }, { $set: { [`stocks.${count}`]: [stockName, (foundStock[1] + changeAmount)], balance: (data.balance - (changeAmount * stockPrice)) } })
            if (stockChange.modifiedCount === null) {
              res.status(404).json({ error: true, message: 'Stock Could Not Be Updated' })
            } else {
              const newHistoryArray = [changeType, stockName, changeAmount]
              const histUpdate = db.collection('Investor').updateOne({ username }, { $push: { stockHistory: newHistoryArray } })
              if (histUpdate.modifiedCount === null) {
                res.status(404).json({ error: true, message: 'History Could Not Be Updated' })
              }
              res.json({ error: false, message: 'Stock Successfully Updated' })
            }
          }
        }
      }
    }
  }, 'MonkeyBusinessWebApp')
}

export async function getUserMarketData (req, res) {
  const username = req.body.username
  let stockArr = []
  //query database to get the user's stock pool
  queryMongoDatabase( async db=> {
    const data = await db.collection('Investor').findOne({ username })
    const numDocs = await db.collection('Investor').countDocuments({ username })
    if(numDocs === null) {
      res.status(404).json({error: true, message: 'Investor Account Not Found'})
    }
    for(const stock of data.stocks) {
      stockArr.push(stock[0])
    }

    //call python script to grab stock data from stockArr names
    try {
      //console.log(stockArr)
      const compareData = await GetCompareData(stockArr)
      res.send(compareData)
    } catch (err) {
      console.log(err)
    }

  }, 'MonkeyBusinessWebApp')
}
