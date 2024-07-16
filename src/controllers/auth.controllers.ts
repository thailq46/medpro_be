import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {ObjectId} from 'mongodb'
import {envConfig} from '~/constants/config'
import {USERS_MESSAGE} from '~/constants/messages'
import {
  ChangePasswordReqBody,
  EmailVerifyReqBody,
  ForgotPasswordReqBody,
  LoginReqBody,
  LogoutReqBody,
  RefreshTokenReqBody,
  RegisterReqBody,
  ResetPasswordReqBody,
  VerifyForgotPasswordReqBody
} from '~/models/request/User.request'
import User from '~/models/schemas/User.schema'
import authService from '~/services/auth.service'
import {TokenPayload} from '~/utils/jwt'

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const results = await authService.register(req.body)
  return res.json({
    message: USERS_MESSAGE.REGISTER_SUCCESS,
    data: results
  })
}

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const {user} = req as {user: User}
  const user_id = user._id as ObjectId
  const {verify, role} = user
  console.log('loginController ~ user', user)
  const results = await authService.login({user_id: user_id.toString(), verify, role})
  return res.json({
    message: USERS_MESSAGE.LOGIN_SUCCESS,
    data: {...results, role: user.role}
  })
}
export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const {refresh_token} = req.body
  await authService.logout(refresh_token)
  return res.json({
    message: USERS_MESSAGE.LOGOUT_SUCCESS
  })
}

export const oauthController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const {code} = req.query
  const result = await authService.oauthGoogle(code as string)
  const urlRedirect = `${envConfig.clientRedirectCallback}?access_token=${result.access_token}&refresh_token=${result.refresh_token}&new_user=${result.newUser}&verify=${result.verify}`
  return res.redirect(urlRedirect)
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response
) => {
  const {_id, verify} = req.user as User
  const result = await authService.forgotPassword({
    user_id: (_id as ObjectId).toString(),
    verify
  })
  return res.json(result)
}

export const verifyForgotPasswordController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordReqBody>,
  res: Response
) => {
  return res.json({
    message: USERS_MESSAGE.VERIFY_FORGOT_PASSWORD_SUCCESS
  })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response
) => {
  const {user_id} = req.decoded_forgot_password_token as TokenPayload
  const {password} = req.body
  const result = await authService.resetPassword({user_id, password})
  return res.json(result)
}

export const emailVerifyController = async (req: Request<ParamsDictionary, any, EmailVerifyReqBody>, res: Response) => {
  const {user_id} = req.decoded_email_verify_token as TokenPayload
  return await authService.emailVerify(user_id, res)
}

export const resendVerifyEmailController = async (req: Request, res: Response) => {
  const {user_id} = req.decode_authorization as TokenPayload
  return await authService.resendVerifyEmail(user_id, res)
}

export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, RefreshTokenReqBody>,
  res: Response
) => {
  const {refresh_token} = req.body
  const {user_id, verify, exp, role} = req.decode_refresh_token as TokenPayload
  const result = await authService.refreshToken({user_id, verify, refresh_token, exp, role})
  return res.json({
    message: USERS_MESSAGE.REFRESH_TOKEN_SUCCESS,
    data: result
  })
}

export const changePasswordController = async (
  req: Request<ParamsDictionary, any, ChangePasswordReqBody>,
  res: Response
) => {
  const {user_id} = req.decode_authorization as TokenPayload
  const {new_password} = req.body
  await authService.changePassword(user_id, new_password)
  return res.json({
    message: USERS_MESSAGE.CHANGE_PASSWORD_SUCCESS
  })
}
