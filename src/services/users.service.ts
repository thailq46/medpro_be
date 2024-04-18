import {ObjectId} from 'mongodb'
import {envConfig} from '~/constants/config'
import {RoleType, TokenType, UserVerifyStatus} from '~/constants/enum'
import {RegisterReqBody} from '~/models/request/User.request'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.service'
import {hashPassword} from '~/utils/crypto'
import {signToken, verifyToken} from '~/utils/jwt'

class UsersService {
  private async signAccessToken({user_id, verify, role}: {user_id: string; verify: UserVerifyStatus; role: RoleType}) {
    return await signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify,
        role
      },
      secretOrPrivateKey: envConfig.jwtSecretAccessToken,
      options: {expiresIn: envConfig.jwtAccessTokenExpiresIn}
    })
  }
  private async signRefreshToken({
    user_id,
    verify,
    role,
    exp
  }: {
    user_id: string
    verify: UserVerifyStatus
    role: RoleType
    exp?: number
  }) {
    // When getting a new refresh token, the exp field must match the old refresh token
    if (exp) {
      return await signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          verify,
          role,
          exp
        },
        secretOrPrivateKey: envConfig.jwtSecretRefreshToken
      })
    }
    return await signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify,
        role
      },
      secretOrPrivateKey: envConfig.jwtSecretRefreshToken,
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

  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPrivateKey: envConfig.jwtSecretRefreshToken
    })
  }

  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        username: `user${user_id.toString()}`,
        password: hashPassword(payload.password),
        date_of_birth: new Date(payload.date_of_birth)
      })
    )
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified,
      role: RoleType.User
    })
    const {iat, exp} = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id,
        token: refresh_token,
        iat,
        exp
      })
    )
    return {
      access_token,
      refresh_token
    }
  }

  async login({user_id, verify, role}: {user_id: string; verify: UserVerifyStatus; role: RoleType}) {
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
      user_id,
      verify,
      role
    })
    const {iat, exp} = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refresh_token,
        iat,
        exp
      })
    )
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
