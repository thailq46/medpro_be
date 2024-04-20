import {Request, Response, NextFunction} from 'express'
import {pick} from 'lodash'

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
