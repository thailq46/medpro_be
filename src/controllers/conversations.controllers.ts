import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {Pagination} from '~/models/request/Common.request'
import {GetConversationParams} from '~/models/request/Conversation.request'
import conversationService from '~/services/conversations.service'
import {responseMessage} from '~/utils/common'
import {TokenPayload} from '~/utils/jwt'

export const getConversationByReceiverIdController = async (
  req: Request<GetConversationParams, any, any, Pagination>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {receiver_id} = req.params
  const {user_id: sender_id} = req.decode_authorization as TokenPayload
  const {conversations, totals} = await conversationService.getConversations({
    sender_id,
    receiver_id,
    limit,
    page
  })
  return res.json(
    responseMessage({
      message: 'Get conversation successfully',
      data: conversations,
      meta: {
        total_page: Math.ceil(totals / limit),
        limit,
        current_page: page,
        total_items: totals
      }
    })
  )
}

export const getConversationsOfMeController = async (
  req: Request<ParamsDictionary, any, any, Pagination>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {user_id} = req.decode_authorization as TokenPayload
  const users = await conversationService.getConversationsMe({
    sender_id: user_id,
    limit,
    page
  })
  return res.json({
    message: 'Get conversation successfully',
    data: users
  })
}
