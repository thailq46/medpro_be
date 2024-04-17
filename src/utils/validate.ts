import {Request, Response, NextFunction} from 'express'
import {ValidationChain, validationResult} from 'express-validator'
import {RunnableValidationChains} from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import {EntityError, ErrorWithStatus} from '~/models/Errors'

const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const errorsObject = errors.mapped()
    /**
     * errorsObject = {
        type: 'field',
        value: 'thai@123',
        msg: 'Invalid value',
        path: 'email',
        location: 'body',}
     */
    const entityError = new EntityError({errors: {}})

    for (const key in errorsObject) {
      const {msg} = errorsObject[key]
      console.log('return ~ msg', msg)
      // Trả về lỗi không phải là lỗi validate
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      entityError.errors[key] = errorsObject[key]
    }
    next(entityError)
  }
}
export default validate
