import queryMongoDatabase from '../data/mongoController.js'
import { getStockShort, getStockDetails, searchStockAPI, GetCompareData } from './callPythonScripts.js'

export async function getStockInfo (req, res) {
  const stockName = req.query.stockName
  if (stockName === undefined) {
    res.status(404).json({ error: true, message: 'No Stock Name Provided' })
    return
  }
  console.log(typeof req.query.timeFrame)
  const timeFrameMonths = (parseInt(req.query.timeFrame) < 1) ? 1 : parseInt(req.query.timeFrame)
  console.log(timeFrameMonths)
  try {
    let stockData = await getStockDetails(stockName, timeFrameMonths)
    console.log(stockData)
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
  const searchQuery = req.body.stockName.searchInput
  if (searchQuery === undefined) {
    res.status(404).json({ error: true, message: 'No Search Query Provided' })
  }
  const start = (req.body.stockName.start) ? parseInt(req.body.stockName.start) : 0
  const end = (req.body.stockName.end) ? parseInt(req.body.stockName.end) : 5
  try {
    const stockName = await searchStockAPI(searchQuery, start, end)
    const stockNames = parseSearchData(stockName)
    res.json(stockNames)
  } catch (err) {
    console.log(err)
  }
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
  // console.log('Session: ' + req.session)
  // console.log('Request body: ' + req.body)
  // console.log('Request params: ' + req.params)
  // console.log('Request params: ' + req.params.start)
  // console.log('Request params: ' + req.params.end)
  const username = req.session.username
  let start = (req.query.start) ? parseInt(req.query.start) : 0
  let end = (req.query.end) ? parseInt(req.query.end) : 5
  queryMongoDatabase(async db => {
    const data = await db.collection('Investor').findOne({ username })
    if ((data) < 1) {
      res.status(404).json({ error: true, message: 'Failed to find investor' })
      return
    }
    if (start > data.stocks.length) {
      start = 0
    }
    if (end > data.stocks.length) {
      end = data.stocks.length
    }
    const stockNames = []
    for (let i = start; i < end; i++) {
      stockNames.push(data.stocks[i].stockName)
    }
    console.log(stockNames)
    console.log(typeof stockNames)
    const userStockData = await getStockShort(stockNames)
    res.json(parseStockDataArray(userStockData))
  }, 'MonkeyBusinessWebApp')
}

export async function updateStockCount (req, res) {
  const username = req.session.username
  const stockName = req.body.stockName
  const stockPrice = req.body.stockPrice
  const changeAmount = req.body.changeAmount
  const changeType = req.body.changeType

  queryMongoDatabase(async db => {
    // check if investor collection exists
    const data = await db.collection('Investor').findOne({ username })
    if (data < 1) {
      res.status(404).json({ error: true, message: 'No Investor Found' })
      return
    }
    if (changeType === 'sell') { // handle the sale of stocks
      let foundStock = null
      let count = 0
      for (const stock of data.stocks) {
        if (stock.stockName === stockName) {
          foundStock = stock
          break
        }
        count++
      }
      if (foundStock === null) { // error if stock not found
        res.status(404).json({ error: true, message: 'Stock Not Found' })
        return
      }
      if (changeAmount > foundStock.amount) { // error if selling more stocks than owned
        res.status(404).json({ error: true, message: 'Not Enough Stocks To Sell' })
      } else if (changeAmount === foundStock.amount) { // remove stock if selling same amount of stocks owned
        const nameDelete = await db.collection('Investor').updateOne(
          { username },
          { $pull: { stocks: foundStock }, $set: { balance: data.balance + (changeAmount * stockPrice) } }
        )
        if (nameDelete.modifiedCount === null) { // error if stock could not be removed
          res.status(404).json({ error: true, message: 'Stock Could Not Be Removed' })
          return
        }
        res.json({ error: false, message: 'Stock Successfully Removed' })
      } else if (changeAmount < foundStock.amount) { // update amount of stocks in db otherwise
        const stockChange = await db.collection('Investor').updateOne(
          { username },
          { $set: { [`stocks.${count}`]: { stockName, amount: (foundStock.amount - changeAmount) }, balance: data.balance + (changeAmount * stockPrice) } })
        if (stockChange.modifiedCount === null) { // error if stock could not be updated
          res.status(404).json({ error: true, message: 'Stock Could Not Be Updated' })
          return
        }
        res.json({ error: false, message: 'Stock Successfully Updated' })
      }
      const date = new Date()
      const newHistoryObject = { changeType, stockName, changeAmount, date }
      const histUpdate = db.collection('Investor').updateOne({ username }, { $push: { stockHistory: newHistoryObject } })
      if (histUpdate.modifiedCount === null) { // error if history could not be updated
        console.log('History Could Not Be Updated')
      }
    } else if (changeType === 'buy') { // handle the purchase of stocks
      if (changeAmount * stockPrice > data.balance) { // error if user doesn't have enough funds to buy stock
        res.status(404).json({ error: true, message: 'Not Enough Money To Buy' })
        return
      }
      let foundStock = null
      let count = 0
      for (const stock of data.stocks) {
        if (stock.stockName === stockName) {
          foundStock = stock
          break
        }
        count++
      }
      if (foundStock === null) { // push to stocks array if purchasing new stock
        const stockInsert = await db.collection('Investor').updateOne({ username }, { $push: { stocks: { stockName, amount: changeAmount } }, $set: { balance: (data.balance - (changeAmount * stockPrice)) } })
        if (stockInsert.modifiedCount === null) { // error if stock could not be added
          res.status(404).json({ error: true, message: 'Stock Could Not Be Added' })
          return
        }
        res.json({ error: false, message: 'Stock Successfully Added' })
      } else { // update stock amount otherwise
        const newStockObj = { stockName, amount: (foundStock.amount + changeAmount) }
        const stockChange = await db.collection('Investor').updateOne({ username }, { $set: { [`stocks.${count}`]: newStockObj, balance: (data.balance - (changeAmount * stockPrice)) } })
        if (stockChange.modifiedCount === null) { // error if stock could not be updated
          res.status(404).json({ error: true, message: 'Stock Could Not Be Updated' })
          return
        }
        res.json({ error: false, message: 'Stock Successfully Updated' })
      }
      const date = new Date()
      const newHistoryObject = { changeType, stockName, changeAmount, date }
      const histUpdate = db.collection('Investor').updateOne({ username }, { $push: { stockHistory: newHistoryObject } })
      if (histUpdate.modifiedCount === null) { // error if history could not be updated
        console.log('History Could Not Be Updated')
      }
    }
  }, 'MonkeyBusinessWebApp')
}

export async function getUserMarketData (req, res) {
  const username = req.body.username
  const stockArr = []
  // query database to get the user's stock pool
  queryMongoDatabase(async db => {
    const data = await db.collection('Investor').findOne({ username })
    const numDocs = await db.collection('Investor').countDocuments({ username })
    if (numDocs === null) {
      res.status(404).json({ error: true, message: 'Investor Account Not Found' })
    }
    for (const stock of data.stocks) {
      stockArr.push(stock[0])
    }

    // call python script to grab stock data from stockArr names
    try {
      // console.log(stockArr)
      const compareData = await GetCompareData(stockArr)
      res.send(compareData)
    } catch (err) {
      console.log(err)
    }
  }, 'MonkeyBusinessWebApp')
}
