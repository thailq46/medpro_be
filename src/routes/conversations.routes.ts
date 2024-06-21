import {Router} from 'express'
import {getConversationByReceiverIdController} from '~/controllers/conversations.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {paginationValidator} from '~/middlewares/common.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'
import {wrapRequestHandler} from '~/utils/handlers'

const conversationsRouter = Router()

/**
 * Desscription: Get conversations
 * Path: /conversations/receiver/:receiver_id
 * Method: GET
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { receiver_id: string }
 */
conversationsRouter.get(
  '/receivers/:receiver_id',
  accessTokenValidator,
  verifiedUserValidator,
  paginationValidator,
  wrapRequestHandler(getConversationByReceiverIdController)
)

export default conversationsRouter
