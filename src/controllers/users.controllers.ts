import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {ObjectId} from 'mongodb'
import {USERS_MESSAGE} from '~/constants/messages'
import {
  ForgotPasswordReqBody,
  LoginReqBody,
  LogoutReqBody,
  RegisterReqBody,
  ResetPasswordReqBody,
  VerifyForgotPasswordReqBody
} from '~/models/request/User.request'
import User from '~/models/schemas/User.schema'
import usersService from '~/services/users.service'
import {TokenPayload} from '~/utils/jwt'

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const results = await usersService.register(req.body)
  return res.json({
    message: USERS_MESSAGE.REGISTER_SUCCESS,
    data: results
  })
}

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const {user} = req as {user: User}
  const user_id = user._id as ObjectId
  const {verify, role} = user
  const results = await usersService.login({user_id: user_id.toString(), verify, role})
  return res.json({
    message: USERS_MESSAGE.LOGIN_SUCCESS,
    data: results
  })
}
export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const {refresh_token} = req.body
  const result = await usersService.logout(refresh_token)
  return res.json({
    message: USERS_MESSAGE.LOGOUT_SUCCESS,
    data: result
  })
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response
) => {
  const {_id, verify, role} = req.user as User
  const result = await usersService.forgotPassword({
    user_id: (_id as ObjectId).toString(),
    verify,
    role
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
  const result = await usersService.resetPassword({user_id, password})
  return res.json(result)
}
