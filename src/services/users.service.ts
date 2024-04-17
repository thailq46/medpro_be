import {ObjectId} from 'mongodb'
import {envConfig} from '~/constants/config'
import {RoleType, TokenType, UserVerifyStatus} from '~/constants/types'
import {RegisterReqBody} from '~/models/request/User.request'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.service'
import {signToken} from '~/utils/jwt'

class UsersService {
  private async signAccessToken({user_id, verify, role}: {user_id: string; verify: UserVerifyStatus; role: RoleType}) {
    return await signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify,
        role
      },
      secretOrPrivateKey: envConfig.jtwAccessToken,
      options: {expiresIn: envConfig.jwtAccessTokenExpiresIn}
    })
  }
  private async signRefreshToken({user_id, verify, role}: {user_id: string; verify: UserVerifyStatus; role: RoleType}) {
    return await signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify,
        role
      },
      secretOrPrivateKey: envConfig.jwtRefreshToken,
      options: {expiresIn: envConfig.jwtRefreshTokenExpiresIn}
    })
  }
  private signAccessTokenAndRefreshToken({
    user_id,
    verify,
    role
  }: {
    user_id: string
    verify: UserVerifyStatus
    role: RoleType
  }) {
    return Promise.all([this.signAccessToken({user_id, verify, role}), this.signRefreshToken({user_id, verify, role})])
  }

  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        date_of_birth: new Date(payload.date_of_birth)
      })
    )
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified,
      role: RoleType.Patient
    })
    return {
      access_token,
      refresh_token
    }
  }
  async checkEmailExist(email: string) {
    try {
      const user = await databaseService.users.findOne({email})
      return Boolean(user)
    } catch (error) {
      console.log('Failed to check user exists', error)
    }
  }
}

const usersService = new UsersService()
export default usersService
