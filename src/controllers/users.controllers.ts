import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {USERS_MESSAGE} from '~/constants/messages'
import {RegisterReqBody} from '~/models/request/User.request'
import usersService from '~/services/users.service'

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const results = await usersService.register(req.body)
  return res.json({
    message: USERS_MESSAGE.REGISTER_SUCCESS,
    data: results
  })
}
