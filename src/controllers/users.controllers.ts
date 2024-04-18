import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {ObjectId} from 'mongodb'
import {USERS_MESSAGE} from '~/constants/messages'
import {LoginReqBody, LogoutReqBody, RegisterReqBody} from '~/models/request/User.request'
import User from '~/models/schemas/User.schema'
import usersService from '~/services/users.service'

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
