import { Validator, ValidationError } from 'express-json-validator-middleware'

export const validator = new Validator({ allErrors: true })
export function loginSchema () {
  return (
    {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    }
  )
}
export const signupSchema = {
  type: 'object',
  required: ['username', 'password', 'passwordConfirm', 'email'],
  properties: {
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirm: {
      type: 'string'
    },
    email: {
      type: 'string'
    }
  }
}
export function stockSchema () {
  return {
    type: 'object',
    required: ['name', 'amount', 'price', 'userID'],
    properties: {
      name: {
        type: 'string'
      },
      amount: {
        type: 'integer'
      },
      price: {
        type: 'number'
      },
      userID: {
        type: 'integer'
      }
    }
  }
}

export function validationErrorMiddleware (err, req, res, next) {
  console.log(err)
  console.log(err.validationErrors)
  console.log(err.validationErrors.body)
  console.log(req.body)
  if (res.headersSent) {
    return next(err)
  }

  const isValidationError = err instanceof ValidationError
  if (!isValidationError) {
    return next(err)
  }
  res.status(400).json({ error: true, message: err.validationErrors })
  next()
}