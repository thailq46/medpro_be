import {Request, Response, NextFunction} from 'express'
import {checkSchema} from 'express-validator'
import {pick} from 'lodash'
import validate from '~/utils/validate'

type TypeFilterKeys<T> = Array<keyof T>

export const filterMiddleware =
  <T>(filterKeys: TypeFilterKeys<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKeys)
    next()
  }

export const isUserLoggedInValidator = (middleware: (req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      return middleware(req, res, next)
    }
    next()
  }
}

export const paginationValidator = validate(
  checkSchema(
    {
      limit: {
        isNumeric: true,
        custom: {
          options: async (value) => {
            const num = Number(value)
            if (num > 100 || num < 1) {
              throw new Error('1 <= limit <= 100')
            }
            return true
          }
        }
      },
      page: {isNumeric: true}
    },
    ['query']
  )
)
