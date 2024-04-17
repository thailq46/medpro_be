import {Router} from 'express'
import {registerController} from '~/controllers/users.controllers'
import {registerValidator} from '~/middlewares/users.middlewares'
import {wrapRequestHandler} from './../utils/handlers'

const usersRouter = Router()
/**
 * Desscription: Register new user
 * Path: /users/register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601, gender: GenderType }
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

export default usersRouter
