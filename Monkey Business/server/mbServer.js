import Express from 'express'
import dataRouter from './api/mbRoutes.js'
import { testNodeCall, getStockShort, getStockDetails, searchStockAPI, getMonkeyPosition } from './services/callPythonScripts.js'
import { testLogin } from './controllers/loginController.js'
import schedule from 'node-schedule'
const PORT = 3000
const app = new Express()

app.use(Express.json())

app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.url}`)
  next()
})
// Statically serve the public folder
app.use(Express.static('./public'))

app.use('/api', dataRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})

const rule = new schedule.RecurrenceRule();
rule.minute = [0, 15, 30, 45];

const temp = schedule.scheduleJob(rule, function(){getMonkeyPosition("https://www.youtube.com/watch?v=jaPx8uOE5_0")});

// testLogin()
