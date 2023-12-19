import queryMongoDatabase from '../data/mongoController.js'
import { getStockShort } from './callPythonScripts.js'

export async function runMonkeyAlgorithm (coordSpace) {

  if (coordSpace === undefined) {
    return () => { throw new Error('No coordSpace provided') }
  } else {
    console.log('coordSpace: ', coordSpace)
  }
  queryMongoDatabase(async db => {
    const data = await db.collection('Monkey').find({})
    if ((await db.collection('Monkey').countDocuments()) < 1) {
      return () => { throw new Error('No Monkey Investments Found') }
    } else {
      const monkeyInvestmentArray = []
      for await (const doc of data) {
        monkeyInvestmentArray.push(doc)
      }
      monkeyInvestmentArray.forEach(x => {
        const stockPool = x.stockPool
        const stocks = x.stocks
        const cash = x.cash
        const name = x.name
        const username = x.username
        const history = x.history // Save this for later if possible


        const newStocks = stocks
        const newMonkey = {
          username,
          name,
          stocks: newStocks,
          history,
          stockPool,
          cash
        }
        const update = db.collection('Monkey').updateOne({ username, name }, { $set: newMonkey })
        if (update.modifiedCount === null) {
          return () => { throw new Error('Error updating data') }
        }
      })
    }
  }, 'MonkeyBusinessWebApp')
}

export async function getMonkeyInvestments (req, res) { // returns all monkey investments for a user. A User can have multiple monkey investments (each with a unique name) that can use different stock pools.
  const username = req.session.username
  queryMongoDatabase(async db => {
    const data = await db.collection('Monkey').find({ username }, { projection: { _id: 0, username: 0 } })
    if ((await db.collection('Monkey').countDocuments({ username })) < 1) {
      res.status(404).json({ error: true, message: 'No Monkey Investment Found' })
    } else {
      const monkeyArray = []
      for await (const doc of data) {
        monkeyArray.push(doc)
      }
      res.json(monkeyArray)
    }
  }, 'MonkeyBusinessWebApp')
}

export async function getMonkeyStocks (req, res) { // returns the stocks for a specific monkey investment
  const username = req.session.username
  const name = req.body.monkeyName
  queryMongoDatabase(async db => {
    const data = await db.collection('Monkey').findOne({ username, name }, { projection: { _id: 0, username: 0, history: 0, stockPool: 0 } })
    if (data < 1) {
      res.status(404).json({ error: true, message: 'No Monkey Investment Found' })
    } else {
      const monkeyStocks = (data.stocks)
      res.json(monkeyStocks)
    }
  }, 'MonkeyBusinessWebApp')
}

export async function getMonkeyHistory (req, res) { // returns the history for a specific monkey investment ------------ Might change this to get Details
  const username = req.session.username
  const name = req.body.name
  console.log(username, name)
  queryMongoDatabase(async db => {
    const data = await db.collection('Monkey').findOne({ username, name }, { projection: { _id: 0, username: 0, name: 0, stocks: 0, amount: 0, stockPool: 0 } })
    if (data < 1) {
      res.status(404).json({ error: true, message: 'No Monkey Investment Found' })
    } else {
      const monkeyHistory = (data.history)
      res.json(monkeyHistory)
    }
  }, 'MonkeyBusinessWebApp')
}

export async function updateMonkey (req, res) { // can change stockPool and amount only. Everything else is calculated by the monkey Algorithm (buy, sell, history, etc.)
  const monkey = req.body
  const username = req.session.username

  queryMongoDatabase(async db => {
    const data = await db.collection('Monkey').findOne({ username, name: monkey.name }, { projection: { _id: 0, username: 0, name: 0, stocks: 0, history: 0, amount: 0 } })
    if (data < 1) {
      // create new monkey
      const newMonkey = {
        username,
        name: monkey.name,
        stocks: monkey.stocks,
        history: monkey.history,
        stockPool: monkey.stockPool,
        cash: monkey.cash,
        value: monkey.value
      }
      const insert = await db.collection('Monkey').insertOne(newMonkey)
      if (insert.insertedCount !== 1) {
        res.status(500).json({ error: true, message: 'Error inserting data' })
        return
      }
    } else {
      // update monkey
      const update = await db.collection('Monkey').updateOne({ username, name: monkey.name }, { $set: { stockPool: monkey.stockPool, amount: monkey.amount } })
      if (update.modifiedCount === null) {
        res.status(500).json({ error: true, message: 'Error updating data' })
        return
      }
    }
    res.json({ error: false, message: 'Success' })
  }, 'MonkeyBusinessWebApp')
}

export async function updateMonkeyStockPool (req, res) { // can change stockPool and amount only. Everything else is calculated by the monkey Algorithm (buy, sell, history, etc.)
  const name = req.body.name
  const username = req.session.username
  const stockPool = req.body.stockPool // array of stock symbols
  const changeType = req.body.changeType // buy or sell

  queryMongoDatabase(async db => {
    const data = await db.collection('Monkey').findOne({ username, name }, { projection: { _id: 0, username: 0, name: 0 } })
    if (data === null) {
      res.status(404).json({ error: true, message: 'No Monkey Investment Found' })
    } else {
      // update monkey
      if (stockPool === data.stockPool) {
        res.json({ error: true, message: 'Trying to set the same stock pool' })
        return
      }

      if (changeType === 'sell') {
        const stocksToBeRemoved = data.stocks.filter(x => !stockPool.includes(x.stockName))
        const update = await db.collection('Monkey').updateOne({ username, name }, { $set: { stockPool } })
        if (update.modifiedCount === null) {
          res.status(500).json({ error: true, message: 'Error updating data' })
          return
        }
        const sell = await sellMonkeyStocks(stocksToBeRemoved)
        if (sell === null) {
          res.status(500).json({ error: true, message: 'Error selling stocks' })
          return
        }
        res.json({ error: false, message: 'Success' })
      } else if (changeType === 'buy') {
        const stocksToBeAdded = stockPool.filter(x => !data.stocks.includes(x.stockName))
        const update = await db.collection('Monkey').updateOne({ username, name }, { $set: { stockPool } })
        if (update.modifiedCount === null) {
          res.status(500).json({ error: true, message: 'Error updating data' })
          return
        }
        res.json({ error: false, message: 'Success' })
      } else {
        res.json({ error: true, message: 'Invalid changeType' })
      }
    }
  }, 'MonkeyBusinessWebApp')
}
async function sellMonkeyStocks (stocksToBeRemoved, monkeyInvestmentId) { // stocksToBeRemoved is an array of stock objects {name, amount}
  queryMongoDatabase(async db => {
    const monkeyInvestment = await db.collection('Monkey').findOne({ _id: monkeyInvestmentId }, { projection: { _id: 0, username: 0, name: 0, stockPool: 0, history: 0 } })
    if (monkeyInvestment === null) {
      return () => { throw new Error('Monkey Investment not found') }
    }
    const stockNames = stocksToBeRemoved.filter(x => x.stockName)
    const stocksData = await getStockShort(stockNames)
    if (stocksData === null) {
      return () => { throw new Error('Error retrieving stock data') }
    }
    let total = 0
    for (let i = 0; i < stocksToBeRemoved.length; i++) {
      total += stocksData[i].price * stocksToBeRemoved[i].amount // potentially a check if amount is greater than what they have
    }
    const cash = monkeyInvestment.cash + total // needs to be workshopped
    const setCash = await db.collection('Monkey').updateOne({ _id: monkeyInvestmentId }, { $set: { cash } })
    if (setCash.modifiedCount === null) {
      return () => { throw new Error('Error updating Cash') }
    }
    const keepStocks = monkeyInvestment.stocks.filter(x => !stockNames.includes(x.stockName))
    const setNewStocks = await db.collection('Monkey').updateOne({ _id: monkeyInvestmentId }, { $set: { stocks: keepStocks } })
    if (setNewStocks.modifiedCount === null) {
      return () => { throw new Error('Error updating Stocks') }
    }
    // add to history
    const history = monkeyInvestment.history
    stocksToBeRemoved.forEach(x => {
      history.push({ name: x.stockName, date: new Date(), type: 'sell', amount: x.amount })
    })
    const setHistory = await db.collection('Monkey').updateOne({ _id: monkeyInvestmentId }, { $set: { history } })
    if (setHistory.modifiedCount === null) {
      return () => { throw new Error('Error updating History') }
    }
  }, 'MonkeyBusinessWebApp')
}
async function buyMonkeyStocks (stocksToBeAdded, monkeyInvestmentId) { // stocksToBeAdded is an array of stock objects {name, amount}
  queryMongoDatabase(async db => {
    const monkeyInvestment = await db.collection('Monkey').findOne({ _id: monkeyInvestmentId }, { projection: { _id: 0, username: 0, name: 0, stockPool: 0, history: 0 } })
    if (monkeyInvestment === null) {
      return () => { throw new Error('Monkey Investment not found') }
    }
    const stockNames = stocksToBeAdded.filter(x => x.stockName)
    const stocksData = await getStockShort(stockNames)
    if (stocksData === null) {
      return () => { throw new Error('Error retrieving stock data') }
    }
    let total = 0
    for (let i = 0; i < stocksToBeAdded.length; i++) {
      total += stocksData[i].price * stocksToBeAdded[i].amount // potentially a check if amount is greater than what they have
    }
    const cost = total
    if (cost > monkeyInvestment.cash) {
      return () => { throw new Error('Not enough cash to buy stocks') }
    }
    const setCash = await db.collection('Monkey').updateOne({ _id: monkeyInvestmentId }, { $set: { cash: monkeyInvestment.cash - cost } })
    if (setCash.modifiedCount === null) {
      return () => { throw new Error('Error updating Cash') }
    }
    const stocks = monkeyInvestment.stocks
    stocksToBeAdded.forEach(x => {
      if (!monkeyInvestment.stocks.includes(x)) stocks.push(x)
    })
    const setNewStocks = await db.collection('Monkey').updateOne({ _id: monkeyInvestmentId }, { $set: { stocks } })
    if (setNewStocks.modifiedCount === null) {
      return () => { throw new Error('Error updating Stocks') }
    }
    // add to history
    const history = monkeyInvestment.history
    stocksToBeAdded.forEach(x => {
      history.push({ name: x.stockName, date: new Date(), type: 'buy', amount: x.amount })
    })
    const setHistory = await db.collection('Monkey').updateOne({ _id: monkeyInvestmentId }, { $set: { history } })
    if (setHistory.modifiedCount === null) {
      return () => { throw new Error('Error updating History') }
    }
  }, 'MonkeyBusinessWebApp')
}
