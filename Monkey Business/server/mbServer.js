import Express from 'express'
import dataRouter from './api/mbRoutes.js'
import { getMonkeyPosition } from './services/callPythonScripts.js'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import { Mongo, url } from './data/mongoController.js'
import MongoDBStore from 'connect-mongodb-session'
import path from 'path'

import schedule from 'node-schedule'

const store = new session.MemoryStore()
path.__dirname = path.resolve(path.dirname('./public/index.html'))


const PORT = 3000
const app = new Express()

app.use(Express.json())

//create client connection to mongoDB to use in session store
// const client = await mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// const sess = {
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 // 1 day
//   },
//   store: MongoStore.create({ client }),
//   saveUninitialized: false,
//   httpOnly: true,
//   resave: false,
//   secret: 'secret'
// }
// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// const mongoStore = new MongoDBStore({
//   uri: url,
//   collection: 'Sessions'
// })

// } // later put the secret in .env file and make it more secure
const sessionOptions = {
  name: 'example.sid', // default name is 'connect.sid
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store, // : MongoStore.create({ client: Mongo, dbName: 'MonkeyBusinessWebApp' }), // store: new MongoStore.Session({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}

app.use(session(sessionOptions))

app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.url}`)
  next()
})
// Statically serve the public folder
app.use(Express.static(path.join('./public')))

app.use('/api', dataRouter)

app.get('resetPassword/*', (req, res) => {
  console.log('resetPassword')
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: './public' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})

var rule = new schedule.RecurrenceRule()
rule.minute = [0, 15, 30, 45]
schedule.scheduleJob(rule, () => {getMonkeyPosition("https://www.youtube.com/watch?v=jaPx8uOE5_0", 1)})
// getMonkeyPosition("https://www.youtube.com/watch?v=EBer-aLmzM8", 1) // "https://www.youtube.com/watch?v=jaPx8uOE5_0"
