import express from 'express'
import { redirect } from 'react-router-dom'
const baseRouter = new express.Router()

baseRouter.get('/', (req, res) => {
  res.send('Hello World!')
})
baseRouter.get('/stats', (req, res) => {
  redirect('/stats')
})


export default baseRouter
