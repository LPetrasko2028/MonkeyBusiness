import bcryptjs from 'bcrypt'

import dotenv from 'dotenv'
dotenv.config()

export async function comparePasswords (password, hash) {
  const result = await bcryptjs.compare(password, hash) // process.env.PEPPER
  return result
}
