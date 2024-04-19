import {Request, Response} from 'express'
import {USERS_MESSAGE} from '~/constants/messages'
import usersService from '~/services/users.service'
import {TokenPayload} from '~/utils/jwt'
import {ParamsDictionary} from 'express-serve-static-core'
import {GetUserByUsernameReqParams, UpdateMeBody} from '~/models/request/User.request'
import HTTP_STATUS from '~/constants/httpStatus'

export const getMeController = async (req: Request, res: Response) => {
  const {user_id} = req.decode_authorization as TokenPayload
  const result = await usersService.getMe(user_id)
  return res.json({
    message: USERS_MESSAGE.GET_ME_SUCCESS,
    data: result
  })
}

export const updateMeController = async (req: Request<ParamsDictionary, any, UpdateMeBody>, res: Response) => {
  const {user_id} = req.decode_authorization as TokenPayload
  const result = await usersService.updateMe(user_id, req.body)
  return res.json({
    message: USERS_MESSAGE.UPDATE_ME_SUCCESS,
    data: result
  })
}

export const getListUsersController = async (req: Request, res: Response) => {
  const result = await usersService.getListUsers()
  return res.json({
    message: USERS_MESSAGE.GET_LIST_USERS_SUCCESS,
    data: result
  })
}

export const getUserByUsernameController = async (req: Request<GetUserByUsernameReqParams>, res: Response) => {
  const {username} = req.params
  const user = await usersService.getUserByUsername(username)
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGE.USER_NOT_FOUND,
      data: null
    })
  }
  return res.json({
    message: USERS_MESSAGE.GET_USER_BY_USERNAME_SUCCESS,
    data: user
  })
}
