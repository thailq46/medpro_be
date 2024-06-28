import {checkSchema} from 'express-validator'
import {ObjectId} from 'mongodb'
import {CONVERSATION_MESSAGE} from '~/constants/messages'
import databaseService from '~/services/database.service'
import validate from '~/utils/validate'

export const checkParamsConversationByReceiverId = validate(
  checkSchema(
    {
      receiver_id: {
        notEmpty: {errorMessage: CONVERSATION_MESSAGE.RECEIVER_ID_IS_REQUIRED},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(CONVERSATION_MESSAGE.INVALID_OBJECT_ID)
            }
            const [userExists, conversationExists] = await Promise.all([
              databaseService.users.findOne({_id: new ObjectId(value)}),
              databaseService.conversations.findOne({receiver_id: new ObjectId(value)})
            ])
            if (!userExists && !conversationExists) {
              throw new Error(CONVERSATION_MESSAGE.RECEIVER_NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
