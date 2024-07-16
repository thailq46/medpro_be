import {Router} from 'express'
import {
  changePasswordController,
  emailVerifyController,
  forgotPasswordController,
  loginController,
  logoutController,
  oauthController,
  refreshTokenController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  verifyForgotPasswordController
} from '~/controllers/auth.controllers'
import {
  accessTokenValidator,
  changePasswordValidator,
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
 * Description: Register new user
 * Path: /auth/register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601, gender: GenderType }
 */
authRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description: Login user
 * Path: /auth/login
 * Method: POST
 * Body: { email: string, password: string }
 */
authRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description: Logout user
 * Path: /auth/logout
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
authRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description: Login user with google
 * Path: /auth/oauth/google
 * Method: GET
 * Query: { code: string }
 */
authRouter.get('/oauth/google', wrapRequestHandler(oauthController))

/**
 * Description: Submit email to reset password, then send email to user
 * Path: /auth/forgot-password
 * Method: POST
 * Body: { email: string }
 */
authRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * Description: Verify link in email to reset password
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
 * Description: Reset password
 * Path: /auth/reset-password
 * Method: POST
 * Body: { forgot_password_token: string, password: string, confirm_password: string }
 */
authRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

/**
 * Description: Verify email when user client click on the link in email
 * Path: /auth/verify-email
 * Method: POST
 * Body: { email_verify_token : string }
 */
authRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(emailVerifyController))

/**
 * Description: Verify email when user client click on the link in email
 * Path: /auth/resend-verify-email
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: {}
 */
authRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

/**
 * Description: Refresh Token
 * Path: /auth/refresh-token
 * Method: POST
 * Body: { refresh_token: string }
 */
authRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

/**
 * Description: Change password
 * Path: /auth/change-password
 * Method: PUT
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { old_password: string, new_password: string, confirm_new_password: string }
 */
authRouter.put(
  '/change-password',
  accessTokenValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

export default authRouter
