import queryMongoDatabase from '../data/mongoController.js'
import { validateEmail } from '../middleware/generalServerFunctions.js'
import { hashPassword } from '../controllers/signupController.js'
import { comparePasswords } from '../controllers/loginController.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
// change password - requires password

// forgot password - send to email

// change username - requires password

// change email - requires password

export async function updateAccount (req, res) {
  // const username = req.session.username
  const username = req.body.username
  const password = req.body.password
  const changeType = req.body.changeType
  if (changeType === 'password') {
    const newPassword = req.body.newPassword
    const newPasswordConfirm = req.body.newPasswordConfirm
    if (newPassword !== newPasswordConfirm) {
      res.status(404).json({ error: true, message: 'Passwords do not match.' })
    } else {
      queryMongoDatabase(async db => {
        const user = await db.collection('Users').findOne({ username })
        if (user === null) {
          res.status(404).json({ error: true, message: 'User does not exist.' })
        } else {
          // const passwordMatch = await comparePasswords(password, user.password)
          const passwordMatch2 = (password === user.password)
          if (passwordMatch2 === false) {
            res.status(404).json({ error: true, message: 'Incorrect Password.' })
          } else {
            // const hashedPassword = await hashPassword(newPassword)
            const hashedPassword = newPassword
            const updateDoc = await db.collection('Users').updateOne({ username }, { $set: { password: hashedPassword } })
            if (updateDoc.modifiedCount !== null) {
              res.json({ error: false, message: `User: ${username} Updated Successfully` })
            } else {
              res.status(404).json({ error: true, message: 'Failed to update user info!' })
            }
          }
        }
      }, 'MonkeyBusinessWebApp')
    }
  } else if (changeType === 'username') {
    const newUsername = req.body.newUsername
    queryMongoDatabase(async db => {
      const user = await db.collection('Users').findOne({ username })
      if (user === null) {
        res.status(404).json({ error: true, message: 'User does not exist.' })
      } else {
        // const passwordMatch = await comparePasswords(password, user.password)
        const passwordMatch2 = (password === user.password)
        if (passwordMatch2 === false) {
          res.status(404).json({ error: true, message: 'Incorrect Password.' })
        } else {
          const updateDoc = await db.collection('Users').updateOne({ username }, { $set: { username: newUsername } })
          if (updateDoc.modifiedCount !== null) {
            res.json({ error: false, message: `User: ${username} Updated Successfully` })
          } else {
            res.status(404).json({ error: true, message: 'Failed to update user info!' })
          }
        }
      }
    }, 'MonkeyBusinessWebApp')
  } else if (changeType === 'email') {
    const newEmail = req.body.newEmail
    queryMongoDatabase(async db => {
      const user = await db.collection('Users').findOne({ username })
      if (user === null) {
        res.status(404).json({ error: true, message: 'User does not exist.' })
      } else {
        // const passwordMatch = await comparePasswords(password, user.password)
        const passwordMatch2 = (password === user.password)
        if (passwordMatch2 === false) {
          res.status(404).json({ error: true, message: 'Incorrect Password.' })
        } else {
          if (validateEmail(newEmail) === false) {
            res.status(404).json({ error: true, message: 'Invalid Email.' })
          } else {
            const updateDoc = await db.collection('Users').updateOne({ username }, { $set: { email: newEmail } })
            if (updateDoc.modifiedCount !== null) {
              res.json({ error: false, message: `User: ${username} Updated Successfully` })
            } else {
              res.status(404).json({ error: true, message: 'Failed to update user info!' })
            }
          }
        }
      }
    }, 'MonkeyBusinessWebApp')
  } else {
    res.status(404).json({ error: true, message: 'Invalid Change Type.' })
  }
}

export async function forgotEmail (req, res) {
  const username = req.session.username
  const email = req.body.email
  queryMongoDatabase(async db => {
    const user = await db.collection('Users').findOne({ username })
    if (user === null) {
      res.status(401).json({ error: true, message: 'User does not exist.' })
    } else {
      if (email !== user.email) {
        res.status(401).json({ error: true, message: 'Incorrect Email.' })
      } else {
        // send email to user with link to change password
        res.json({ error: false, message: `Email sent to ${email}` })
      }
    }
  }, 'MonkeyBusinessWebApp')
}

export async function forgotPassword (req, res) {
  const username = req.body.username
  const email = req.body.email
  queryMongoDatabase(async db => {
    const user = await db.collection('Users').findOne({ username, email })
    if (user === null) {
      res.status(404).json({ error: true, message: 'User does not exist.' })
    } else {
      // create an encrypted link to the password reset page
      const accessKey = (user.username) // !!! change this to a random token and a timestamp. Probably need to create a new collection for this
      const link = `http://localhost:3000/resetPassword/${accessKey}`
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS

        }
      })
      console.log(process.env.EMAIL)
      console.log(process.env.EMAIL_PASS)
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Monkey Business Password Reset',
        text: `Please click the link to access your password reset page: ${link}`
      }
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
          res.status(404).json({ error: true, message: 'Failed to send email.' })
        } else {
          console.log('Email sent: ' + info.response)
          res.json({ error: false, message: 'Email sent successfully.' })
        }
      })
    }
  }, 'MonkeyBusinessWebApp')
}

export async function resetPassword (req, res) {
  const hashedUsername = req.body.accessKey
  const username = req.body.username
  const newPassword = req.body.newPassword
  const newPasswordConfirm = req.body.newPasswordConfirm
  const usernameMatch = await comparePasswords(username, hashedUsername)

  if (newPassword !== newPasswordConfirm) {
    res.status(404).json({ error: true, message: 'Passwords do not match.' })
  } else if (usernameMatch === false) {
    res.status(404).json({ error: true, message: 'Incorrect Username.' })
  } else {
    queryMongoDatabase(async db => {
      const user = await db.collection('Users').findOne({ username })
      if (user === null) {
        res.status(404).json({ error: true, message: 'User does not exist.' })
      } else {
        const hashedPassword = await hashPassword(newPassword)
        const updateDoc = await db.collection('Users').updateOne({ username }, { $set: { password: hashedPassword } })
        if (updateDoc.modifiedCount !== null) {
          res.json({ error: false, message: `User: ${hashedUsername} Updated Successfully` })
        } else {
          res.status(404).json({ error: true, message: 'Failed to update user info!' })
        }
      }
    }, 'MonkeyBusinessWebApp')
  }
}

export async function getAccountDetails (req, res) {
  const username = req.session.username
  console.log(username)
  queryMongoDatabase(async db => {
    const user = await db.collection('Users').findOne({ username }, { projection: { _id: 0, password: 0 } })
    if (user === null) {
      res.status(404).json({ error: true, message: 'User does not exist.' })
    } else {
      res.json(user)
    }
  }, 'MonkeyBusinessWebApp')
}
