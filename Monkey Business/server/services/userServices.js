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

  queryMongoDatabase(async db => {
    const signupSuccess = await db.collection('Users').findOne({ username })

    if ((signupSuccess) !== null) { // Return error if username already exists
      res.status(404).json({ error: true, message: 'Username Already Exists.' })
      return
    }
    if (password !== passwordConfirm) { res.status(404).json({ error: true, message: 'Passwords do not match.' }); return } // Return error if passwords do not match
    else if (validateEmail(email) === false) { res.status(404).json({ error: true, message: 'Invalid Email.' }); return } // Return error if email is invalid
    const passwordHash = await hashPassword(password)
    const adminID = null
    const preferencesID = new ObjectId('651dec44f8c800a5da81622b')
    // initialize new_investor
    const investorID = await db.collection('Investor').insertOne({ username, stocks: [], amount: 10000, history: [] })
    if (investorID.insertedCount !== null) {
      const insertDoc = await db.collection('Users').insertOne({ username, password: passwordHash, email, preferencesID, adminID })
      if (insertDoc.insertedCount !== null) { res.json({ error: false, message: `User: ${username} Signed Up Successfully` }) } else { res.status(404).json({ error: true, message: 'Failed to insert user info!' }) }
    } else { res.status(404).json({ error: true, message: 'Failed to insert investor info!' }) }
  }, 'MonkeyBusinessWebApp')
}
export async function logout (req, res) {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: true, message: 'Failed to logout' })
      } else {
        res.sendStatus(401)
      }
    })
  } else {
    res.end()
  }
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

export async function getAccountDetails (req, res) {
  const username = req.body.username // eventually change to session

  queryMongoDatabase(async db => {
    const findAccount = await db.collection('Users').find({ username })
    const numDocs = await db.collection('Users').countDocuments({ username })

    if (numDocs === 0) { // check if no user / duplicate users
      res.status(404).json({ error: true, message: 'User not found' })
    } else if (numDocs > 1) {
      res.status(500).json({ error: true, message: 'Multiple users with same username' })
    } else {
      for await (const doc of findAccount) {
        res.json(doc)
      }
    }
  }, 'MonkeyBusinessWebApp')
}

export async function getPreferences (req, res) {
  const username = req.body.username // eventually change to session

  queryMongoDatabase(async db => {
    const findUsername = await db.collection('Users').findOne({ username })
    const numDocs = await db.collection('Users').countDocuments({ username })

    if (numDocs === 0) { // check if no user / duplicate users
      res.status(404).json({ error: true, message: 'User not found' })
    } else if (numDocs > 1) {
      res.status(500).json({ error: true, message: 'Multiple users with same username' })
    } else {
      const prefId = findUsername.preferencesID // either use this or findUsername[4]
      const findPreferences = await db.collection('Preferences').find({ _id: prefId })
      const numDocs2 = await db.collection('Preferences').countDocuments({ _id: prefId })
      if (numDocs2 === 0) {
        res.status(404).json('Preference set not found')
      } else {
        for await (const doc of findPreferences) {
          res.json(doc)
        }
        // res.json({ error: false, message: 'Preference set found' })
      }
    }
  }, 'MonkeyBusinessWebApp')
}
