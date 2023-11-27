import Express from 'express'
import { validationErrorMiddleware, validator, loginSchema, signupSchema, stockSchema, monkeySchema } from './../middleware/validation.js'

import { updateMonkey, getMonkeyInvestments, getMonkeyHistory } from './../services/monkeyServices.js'
import { getInvestorStocks, searchForStock, updateStockCount, getStockInfo, getUserMarketData } from './../services/stockServices.js'
import { login, signup, logout, updatePreferences, getPreferences, deleteUser, getAccountDetails } from './../services/userServices.js'

import { isAuthenticated } from '../middleware/authentication.js'
import { getAccountDetails, updateAccount, forgotPassword, resetPassword } from './../services/accountServices.js'

const dataRouter = new Express.Router()

dataRouter.use(validationErrorMiddleware)

// ------------------------------------ Stock Routes ------------------------------------
dataRouter.get('/stocks/:search', searchForStock) // anyone can access * with restrictions to prevent abuse
dataRouter.get('/stocks', getInvestorStocks) // corresponding user can get their stocks
dataRouter.get('/stockDetails', getStockInfo)

dataRouter.post('/stockChange', updateStockCount)
dataRouter.post('/userMarketData', getUserMarketData)

// ------------------------------------ Auth Routes ------------------------------------
dataRouter.post('/login', validator.validate({ body: loginSchema }), login) // open
dataRouter.get('/logout', logout) // open to only logged in users
dataRouter.post('/signup', validator.validate({ body: signupSchema }), signup) // open
dataRouter.post('/forgotPassword', forgotPassword)

// ------------------------------------ User Routes ------------------------------------
dataRouter.get('/account', isAuthenticated, getAccountDetails)
dataRouter.delete('/account/:username', deleteUser) // corresponding user or admin can delete account
dataRouter.post('/account', updateAccount) // corresponding user can update account
dataRouter.post('/resetPassword', resetPassword)

dataRouter.get('/user', isAuthenticated, (req, res) => { res.send(req.session.username) }) // corresponding user can get their session

dataRouter.get('/preferences', getPreferences) // corresponding user can get preferences
dataRouter.post('/preferences', updatePreferences) // corresponding user can update preferences
dataRouter.get('/preferences', getPreferences)
dataRouter.get('/accountDetails', getAccountDetails)

// ------------------------------------ Monkey Routes ------------------------------------
dataRouter.post('/monkey', validator.validate({ body: monkeySchema }), updateMonkey) // corresponding user can update monkey
dataRouter.get('/monkey', getMonkeyInvestments) // corresponding user can get monkey investments

dataRouter.get('/monkeyHistory', getMonkeyHistory)

// Make the router available to import in other files
export default dataRouter
