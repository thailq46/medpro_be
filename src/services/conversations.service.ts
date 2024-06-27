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

  async getConversationsWithSocket(currentUserId: string) {
    if (!currentUserId) return []
    const match = {
      $or: [{sender_id: new ObjectId(currentUserId)}, {receiver_id: new ObjectId(currentUserId)}]
    }

    const conversations = await databaseService.conversations.find(match).sort({created_at: -1}).toArray()

    const userIds = new Set<string>()

    conversations.forEach((conversation) => {
      if (conversation.sender_id.toString() !== currentUserId) {
        userIds.add(conversation.sender_id.toString())
      }
      if (conversation.receiver_id.toString() !== currentUserId) {
        userIds.add(conversation.receiver_id.toString())
      }
    })

    const users = await databaseService.users
      .find({_id: {$in: Array.from(userIds).map((id) => new ObjectId(id))}})
      .toArray()

    // Xử lý để lấy tin nhắn cuối cùng của mỗi user mà bạn đã nhắn tin
    const lastMessagesMap = new Map<string, any>()
    conversations.forEach((conversation) => {
      const otherUserId =
        conversation.sender_id.toString() === currentUserId
          ? conversation.receiver_id.toString()
          : conversation.sender_id.toString()
      if (!lastMessagesMap.has(otherUserId)) {
        lastMessagesMap.set(otherUserId, conversation)
      }
    })
    // Chuyển đổi Map thành mảng các tin nhắn cuối cùng
    const lastMessages = Array.from(lastMessagesMap.values())
    const usersWithLastMessages = users.map((user) => {
      return {
        _id: user._id.toString(),
        username: user.username,
        avatar: user.avatar,
        name: user.name,
        lastMessage: lastMessages.find(
          (message) =>
            message.sender_id.toString() === user._id.toString() ||
            message.receiver_id.toString() === user._id.toString()
        )
      }
    })
    return usersWithLastMessages
  }
}

const conversationService = new ConversationService()
export default conversationService
