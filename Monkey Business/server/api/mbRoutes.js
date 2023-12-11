import Express from 'express'
import { validationErrorMiddleware, validator, loginSchema, signupSchema, stockSchema, monkeySchema } from './../middleware/validation.js'

import { updateMonkey, getMonkeyInvestments } from './../services/monkeyServices.js'
import { getInvestorStocks, searchForStock, updateStockCount, getStockInfo, getGeneralStocks } from './../services/stockServices.js'
import { login, signup, logout, updatePreferences, getPreferences, deleteUser } from './../services/userServices.js'

import { isAuthenticated } from '../middleware/authentication.js'
import { getAccountDetails, updateAccount, forgotPassword } from './../services/accountServices.js'


const dataRouter = new Express.Router()

dataRouter.use(validationErrorMiddleware)

// ------------------------------------ Stock Routes ------------------------------------
dataRouter.get('/stocks/:search', searchForStock) // anyone can access * with restrictions to prevent abuse
dataRouter.get('/stocks', getInvestorStocks) // corresponding user can get their stocks
dataRouter.get('/stockDetails', getStockInfo)

dataRouter.get('/generalstocks', getGeneralStocks)

dataRouter.post('/stockChange', updateStockCount)

// ------------------------------------ Auth Routes ------------------------------------
dataRouter.post('/login', validator.validate({ body: loginSchema }), login) // open
dataRouter.get('/logout', logout) // open to only logged in users
dataRouter.post('/signup', validator.validate({ body: signupSchema }), signup) // open
dataRouter.post('/forgotPassword', forgotPassword)

// ------------------------------------ User Routes ------------------------------------
dataRouter.get('/account', isAuthenticated, getAccountDetails)
dataRouter.delete('/account/:username', deleteUser) // corresponding user or admin can delete account
dataRouter.post('/account', updateAccount) // corresponding user can update account

dataRouter.get('/preferences', getPreferences) // corresponding user can get preferences
dataRouter.post('/preferences', updatePreferences) // corresponding user can update preferences

// ------------------------------------ Monkey Routes ------------------------------------
dataRouter.post('/monkey', validator.validate({ body: monkeySchema }), updateMonkey) // corresponding user can update monkey
dataRouter.get('/monkey', getMonkeyInvestments) // corresponding user can get monkey investments

// Make the router available to import in other files
export default dataRouter
