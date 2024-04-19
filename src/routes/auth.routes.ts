import {Router} from 'express'
import {
  emailVerifyController,
  forgotPasswordController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  verifyForgotPasswordController
} from '~/controllers/auth.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/auth.middlewares'
import {wrapRequestHandler} from '../utils/handlers'

const authRouter = Router()
/**
 * Desscription: Register new user
 * Path: /auth/register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601, gender: GenderType }
 */
authRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Desscription: Login user
 * Path: /auth/login
 * Method: POST
 * Body: { email: string, password: string }
 */
authRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Desscription: Logout user
 * Path: /auth/logout
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
authRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Desscription: Submit email to reset password, then send email to user
 * Path: /auth/forgot-password
 * Method: POST
 * Body: { email: string }
 */
authRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * Desscription: Verify link in email to reset password
 * Path: /auth/verify-forgot-password
 * Method: POST
 * Body: { forgot_password_token: string }
 */
authRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)

/**
 * Desscription: Reset password
 * Path: /auth/reset-password
 * Method: POST
 * Body: { forgot_password_token: string, password: string, confirm_password: string }
 */
authRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

/**
 * Desscription: Verify email when user client click on the link in email
 * Path: /auth/verify-email
 * Method: POST
 * Body: { email_verify_token : string }
 */
authRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(emailVerifyController))

/**
 * Desscription: Verify email when user client click on the link in email
 * Path: /auth/resend-verify-email
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: {}
 */
authRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

/**
 * Desscription: Refresh Token
 * Path: /auth/refresh-token
 * Method: POST
 * Body: { refresh_token: string }
 */
authRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

export default authRouter
