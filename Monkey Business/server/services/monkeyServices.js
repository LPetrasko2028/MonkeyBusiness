import queryMongoDatabase from '../data/mongoController.js'

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
        amount: monkey.amount
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

export async function updateMonkeyStocks (req, res) { // can change stockPool and amount only. Everything else is calculated by the monkey Algorithm (buy, sell, history, etc.)
  const name = req.body.name
  const username = req.session.username
  const changeType = req.body.changeType
  const stock = req.body.stock
  const amount = req.body.amount

  queryMongoDatabase(async db => {
    const data = await db.collection('Monkey').findOne({ username, name }, { projection: { _id: 0, username: 0, name: 0 } })
    if (data === null) {
      res.status(404).json({ error: true, message: 'No Monkey Investment Found' })
      return
    } else {
      // update monkey
      const update = await db.collection('Monkey').updateOne({ username, name }, { $set: { stocks: monkey.stocks } })
      if (update.modifiedCount === null) {
        res.status(500).json({ error: true, message: 'Error updating data' })
        return
      }
    }
    res.json({ error: false, message: 'Success' })
  }, 'MonkeyBusinessWebApp')
}
