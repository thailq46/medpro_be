import {ObjectId} from 'mongodb'
import databaseService from '~/services/database.service'

class ConversationService {
  async getConversations({
    sender_id,
    receiver_id,
    limit,
    page
  }: {
    sender_id: string
    receiver_id: string
    limit: number
    page: number
  }) {
    const match = {
      $or: [
        {sender_id: new ObjectId(sender_id), receiver_id: new ObjectId(receiver_id)},
        {sender_id: new ObjectId(receiver_id), receiver_id: new ObjectId(sender_id)}
      ]
    }
    const [conversations, totals] = await Promise.all([
      databaseService.conversations
        .find(match)
        .sort({created_at: -1})
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      databaseService.conversations.countDocuments(match)
    ])
    return {conversations, totals}
  }

  async getConversationsMe({sender_id, limit, page}: {sender_id: string; limit: number; page: number}) {
    const match = {
      $or: [{sender_id: new ObjectId(sender_id)}, {receiver_id: new ObjectId(sender_id)}]
    }

    const conversations = await databaseService.conversations
      .find(match)
      .sort({created_at: -1})
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    const userIds = new Set<string>()

    conversations.forEach((conversation) => {
      if (conversation.sender_id.toString() !== sender_id) {
        userIds.add(conversation.sender_id.toString())
      }
      if (conversation.receiver_id.toString() !== sender_id) {
        userIds.add(conversation.receiver_id.toString())
      }
    })

    const users = await databaseService.users
      .find(
        {
          _id: {
            $in: Array.from(userIds).map((id) => new ObjectId(id))
          }
        },
        {
          projection: {
            password: 0,
            email_verify_token: 0,
            forgot_password_token: 0
          }
        }
      )
      .toArray()
    return users
  }
}

const conversationService = new ConversationService()
export default conversationService
