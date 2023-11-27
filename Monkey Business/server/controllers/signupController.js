import bcryptjs from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

export async function hashPassword (password) {
  const saltRounds = 10
  const salt = await bcryptjs.genSalt(saltRounds)
  const hash = await bcryptjs.hash(password, salt) // process.env.PEPPER
  return hash
}
