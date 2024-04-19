import {Response} from 'express'
import {ObjectId} from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import {USERS_MESSAGE} from '~/constants/messages'
import {UpdateMeBody, UpdateUserByUsernameBody} from '~/models/request/User.request'
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

  async getUserByUsername(username: string) {
    return await databaseService.users.findOne(
      {username},
      {
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
  }

  async updateUserByUsername(username: string, payload: UpdateUserByUsernameBody) {
    const _payload = payload.date_of_birth ? {...payload, date_of_birth: new Date(payload.date_of_birth)} : payload
    const user = await databaseService.users.findOneAndUpdate(
      {username},
      [
        {
          $set: {
            ...(_payload as UpdateUserByUsernameBody & {date_of_birth?: Date}),
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

  async deleteUserByUsername(username: string) {
    const user = await databaseService.users.findOneAndDelete({username})
    return user
  }
}

const usersService = new UsersService()
export default usersService
