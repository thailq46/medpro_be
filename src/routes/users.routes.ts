import {Router} from 'express'
import {loginController, logoutController, registerController} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import {wrapRequestHandler} from './../utils/handlers'

const usersRouter = Router()
/**
 * Desscription: Register new user
 * Path: /users/register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601, gender: GenderType }
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Desscription: Login user
 * Path: /users/login
 * Method: POST
 * Body: { email: string, password: string }
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Desscription: Logout user
 * Path: /users/logout
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

export default usersRouter
