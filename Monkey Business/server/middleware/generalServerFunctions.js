import queryMongoDatabase from '../data/mongoController.js'
export function validateEmail (email) {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}
// Regular Expression for email validation just checks for No White Space \S, At Sign @, and ONE period \.
export function deleteInvestor (username) {
  queryMongoDatabase(async (db) => {
    const deleteInvestor = db.collection('Investor').deleteOne({ username })

    if ((await deleteInvestor).deletedCount === 0) {
      console.log('Investor not found')
    }
  }, 'MonkeyBusinessWebApp')
}

export function wait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export function makeToken(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}
