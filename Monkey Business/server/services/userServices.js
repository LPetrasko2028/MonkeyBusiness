import queryMongoDatabase from '../data/mongoController.js'
import { validateEmail, deleteInvestor } from '../middleware/generalServerFunctions.js'
import { ObjectId } from 'mongodb'
import { hashPassword } from '../controllers/signupController.js'
import { comparePasswords } from '../controllers/loginController.js'

export async function login (req, res) {
  const username = req.body.username
  const password = req.body.password

  queryMongoDatabase(async db => {
    const loginSuccess = await db.collection('Users').findOne({ username })
    if (loginSuccess < 1) { res.status(404).json({ error: true, message: 'Username or Password could not be found.' }) } else {
      const match = await comparePasswords(password, loginSuccess.password)
      if (match.valueOf() === true) {
        if (req.session.username === username) {
          res.json({ error: true, message: `User: ${username} Already Logged In Successfully` })
        } else {
          req.session.username = username
          const session = req.session
          res.send(session)
        // res.json({ error: false, message: `User: ${username} Logged In Successfully` })
        }
      } else {
        res.status(404).json({ error: true, message: 'Username or Password could not be found.' })
      }
    }
  }, 'MonkeyBusinessWebApp')
}

export async function signup (req, res) { // working without authentication ------------------TO DO --------------------
  const username = req.body.username
  const password = req.body.password
  const passwordConfirm = req.body.passwordConfirm
  const email = req.body.email

  // let errors = []
  // if (!username || !password || !passwordConfirm || !email) { // file for validation errors ------------------TO DO --------------------
  //   errors.push({ message: 'Please enter all fields' })
  // }
  queryMongoDatabase(async db => {
    const signupSuccess = await db.collection('Users').findOne({ username })

    if ((signupSuccess) !== null) { res.status(404).json({ error: true, message: 'Username Already Exists.' }) } else {
      if (password !== passwordConfirm) { res.status(404).json({ error: true, message: 'Passwords do not match.' }) } else if (validateEmail(email) === false) { res.status(404).json({ error: true, message: 'Invalid Email.' }) }

      // Encrypt Password before database insertion ------------------TO DO --------------------
      const passwordHash = await hashPassword(password)
      const adminID = null
      const preferencesID = new ObjectId('651dec44f8c800a5da81622b')
      // initialize new_investor
      const investorID = await db.collection('Investor').insertOne({ username, stocks: [], monkey: [] })
      if (investorID.insertedCount !== null) {
        const insertDoc = await db.collection('Users').insertOne({ username, password: passwordHash, email, preferencesID, adminID })
        if (insertDoc.insertedCount !== null) { res.json({ error: false, message: `User: ${username} Signed Up Successfully` }) } else { res.status(404).json({ error: true, message: 'Failed to insert user info!' }) }
      } else { res.status(404).json({ error: true, message: 'Failed to insert investor info!' }) }
    }
  }, 'MonkeyBusinessWebApp')
}

export async function logout (next, req, res) { // maybe POST to introduce authentication ------------------TO DO --------------------
  // if authenticated, logout, else redirect to login page
  req.session.user = null
  req.session.save(function (err) {
    if (err) return next(err)
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    }
    )
  })
  req.session.destroy(function (err) {
    if (err) return next(err)
    res.redirect('/')
  })
}

export async function updatePreferences (req, res) {
  // turn parameters into variables
  const username = req.body.username // const username = req.session.user
  const colorScheme = req.body.colorScheme
  const graphColor = req.body.graphColor
  const fontSize = req.body.fontSize
  const query = { colorScheme, graphColor, fontSize }

  let newPrefId

  queryMongoDatabase(async db => {
    // check for matching set of preferences
    const foundPreferences = await db.collection('Preferences').findOne(query)

    if (foundPreferences === null) { // if no match, add new set to database
      const insert = await db.collection('Preferences').insertOne(query)
      if (insert.insertedCount === null) {
        res.status(404).json({ error: true, message: 'Failed to insert new preference set!' })
      } else {
        newPrefId = await db.collections('Preferences').findOne(query, { projection: { _id: 1, colorScheme: 0, graphColor: 0, fontSize: 0 } })
      }
    } else { // if match, get id of matching set
      newPrefId = foundPreferences._id
    }
    // update user's preference set with new id
    const updateDoc = {
      $set: {
        preferencesID: newPrefId
      }
    }
    const update = await db.collection('Users').updateOne({ username }, updateDoc)
    if (update.modifiedCount === null) {
      res.status(404).json({ error: true, message: 'Failed to update user preferences!' })
    } else {
      res.json({ error: false, message: 'Preferences Updated' })
    }
  }, 'MonkeyBusinessWebApp')
}

export async function deleteUser (req, res) {
  // const username = req.session.user
  const username = req.params.username

  queryMongoDatabase(async db => {
    const findAccount = await db.collection('Users').findOne({ username })
    if (findAccount === 0) {
      res.status(404).json({ error: true, message: 'User could not be found.' })
    } else {
      if (findAccount.investorID !== null) {
        deleteInvestor(username)
      }
      const data = await db.collection('Users').deleteOne({ username })
      if (data.deletedCount === 1) {
        res.json({
          error: false,
          message: `User ${username} Deleted`
        })
      } else {
        res.status(404).json({ error: true, message: `User ${username} not found` })
      }
    }
  }, 'MonkeyBusinessWebApp')
}

export async function getPreferences (req, res) {
  const username = req.session.user
  queryMongoDatabase(async db => {
    const findPreferences = await db.collection('Preferences').findOne({ username }).projection({ _id: 0 })
    if (findPreferences === null) {
      res.status(404).json({ error: true, message: 'Preferences could not be found.' })
    } else {
      res.json(findPreferences)
    }
  })
}
