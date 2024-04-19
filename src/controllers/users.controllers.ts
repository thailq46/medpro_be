import {Request, Response} from 'express'
import {USERS_MESSAGE} from '~/constants/messages'
import usersService from '~/services/users.service'
import {TokenPayload} from '~/utils/jwt'
import {ParamsDictionary} from 'express-serve-static-core'
import {UpdateMeBody} from '~/models/request/User.request'

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
