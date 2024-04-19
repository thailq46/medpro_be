import {ObjectId} from 'mongodb'
import {UpdateMeBody} from '~/models/request/User.request'
import databaseService from '~/services/database.service'

class UsersService {
  async getMe(user_id: string) {
    const user = await databaseService.users.findOne(
      {_id: new ObjectId(user_id)},
      {
        // Những field nào mà không muốn trả về cho user thì dùng projection để loại bỏ
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    return user
  }

  async updateMe(user_id: string, payload: UpdateMeBody) {
    const _payload = payload.date_of_birth ? {...payload, date_of_birth: new Date(payload.date_of_birth)} : payload
    const user = await databaseService.users.findOneAndUpdate(
      {_id: new ObjectId(user_id)},
      [
        {
          $set: {
            ...(_payload as UpdateMeBody & {date_of_birth?: Date}),
            updated_at: '$$NOW'
          }
        }
      ],
      {
        returnDocument: 'after',
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    return user
  }

  async getListUsers() {
    const users = await databaseService.users.find(
      {},
      {
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    return users.toArray()
  }
}

const usersService = new UsersService()
export default usersService
