import {Response} from 'express'
import {ObjectId} from 'mongodb'
import {envConfig} from '~/constants/config'
import {TokenType, UserVerifyStatus} from '~/constants/enum'
import {USERS_MESSAGE} from '~/constants/messages'
import {RegisterReqBody} from '~/models/request/User.request'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.service'
import {hashPassword} from '~/utils/crypto'
import {signToken, verifyToken} from '~/utils/jwt'

class UsersService {
  private async signAccessToken({user_id, verify}: {user_id: string; verify: UserVerifyStatus}) {
    return await signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify
      },
      secretOrPrivateKey: envConfig.jwtSecretAccessToken,
      options: {expiresIn: envConfig.jwtAccessTokenExpiresIn}
    })
  }
  private async signRefreshToken({user_id, verify, exp}: {user_id: string; verify: UserVerifyStatus; exp?: number}) {
    // When getting a new refresh token, the exp field must match the old refresh token
    if (exp) {
      return await signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          verify,
          exp
        },
        secretOrPrivateKey: envConfig.jwtSecretRefreshToken
      })
    }
    return await signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify
      },
      secretOrPrivateKey: envConfig.jwtSecretRefreshToken,
      options: {expiresIn: envConfig.jwtRefreshTokenExpiresIn}
    })
  }
  private signAccessTokenAndRefreshToken({user_id, verify}: {user_id: string; verify: UserVerifyStatus}) {
    return Promise.all([this.signAccessToken({user_id, verify}), this.signRefreshToken({user_id, verify})])
  }

  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPrivateKey: envConfig.jwtSecretRefreshToken
    })
  }

  private signForgotPasswordToken({user_id, verify}: {user_id: string; verify: UserVerifyStatus}) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken,
        verify
      },
      secretOrPrivateKey: envConfig.jwtSecretForgotPasswordToken,
      options: {expiresIn: envConfig.jwtForgotPasswordTokenExpiresIn}
    })
  }

  private signEmailVerifyToken({user_id, verify}: {user_id: string; verify: UserVerifyStatus}) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.EmailVerifyToken,
        verify
      },
      secretOrPrivateKey: envConfig.jwtSecretEmailVerifyToken,
      options: {expiresIn: envConfig.jwtEmailVerifyTokenExpiresIn}
    })
  }

  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifyToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified
    })
    await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        username: `user${user_id.toString()}`,
        email_verify_token,
        password: hashPassword(payload.password),
        date_of_birth: new Date(payload.date_of_birth)
      })
    )
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified
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

  async login({user_id, verify}: {user_id: string; verify: UserVerifyStatus}) {
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
      user_id,
      verify
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

  async logout(refresh_token: string) {
    return await databaseService.refreshTokens.deleteOne({token: refresh_token})
  }

  async forgotPassword({user_id, verify}: {user_id: string; verify: UserVerifyStatus}) {
    const forgot_password_token = await this.signForgotPasswordToken({user_id, verify})
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      [{$set: {forgot_password_token, updated_at: '$$NOW'}}]
    )
    // Giả bộ gửi email kèm đường link đến email người dùng: https://example.com/reset-password?token=<forgot_password_token>
    console.log('forgot_password_token', forgot_password_token)
    return {
      message: USERS_MESSAGE.CHECK_EMAIL_TO_RESET_PASSWORD
    }
  }

  async resetPassword({user_id, password}: {user_id: string; password: string}) {
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      [{$set: {password: hashPassword(password), updated_at: '$$NOW'}}]
    )
    return {
      message: USERS_MESSAGE.RESET_PASSWORD_SUCCESS
    }
  }

  async emailVerify(user_id: string, res: Response) {
    const user = await databaseService.users.findOne({_id: new ObjectId(user_id)})
    if (!user) {
      return res.json({
        message: USERS_MESSAGE.USER_NOT_FOUND
      })
    }
    if (user.email_verify_token === '' || user.verify === UserVerifyStatus.Verified) {
      return res.json({
        message: USERS_MESSAGE.EMAIL_ALREADY_VERIFIED_BEFORE
      })
    }
    const result = await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      [{$set: {email_verify_token: '', verify: UserVerifyStatus.Verified, updated_at: '$$NOW'}}]
    )
    return res.json({
      message: USERS_MESSAGE.EMAIL_VERIFY_SUCCESS,
      data: result
    })
  }

  async resendVerifyEmail(user_id: string, res: Response) {
    const user = await databaseService.users.findOne({_id: new ObjectId(user_id)})
    if (!user) {
      return res.json({message: USERS_MESSAGE.USER_NOT_FOUND})
    }
    if (user.verify === UserVerifyStatus.Verified) {
      return res.json({message: USERS_MESSAGE.EMAIL_ALREADY_VERIFIED_BEFORE})
    }
    const email_verify_token = await this.signEmailVerifyToken({
      user_id,
      verify: UserVerifyStatus.Verified
    })
    const result = await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      [{$set: {email_verify_token, updated_at: '$$NOW'}}]
    )
    // Giả bộ gửi email kèm đường link đến email người dùng: https://example.com/verify-email?token=<email_verify_token>
    console.log('email_verify_token', email_verify_token)
    return res.json({
      message: USERS_MESSAGE.RESEND_EMAIL_VERIFY_SUCCESS,
      data: result
    })
  }

  async refreshToken({
    user_id,
    verify,
    refresh_token,
    exp
  }: {
    user_id: string
    verify: UserVerifyStatus
    refresh_token: string
    exp: number
  }) {
    const [new_access_token, new_refresh_token] = await Promise.all([
      this.signAccessToken({user_id, verify}),
      this.signRefreshToken({user_id, verify, exp}),
      databaseService.refreshTokens.deleteOne({token: refresh_token})
    ])
    const decoded_refresh_token = await this.decodeRefreshToken(new_refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: new_refresh_token,
        iat: decoded_refresh_token.iat,
        exp: decoded_refresh_token.exp
      })
    )
    return {
      new_access_token,
      new_refresh_token
    }
  }

  async changePassword(user_id: string, new_password: string) {
    return await databaseService.users.findOneAndUpdate({_id: new ObjectId(user_id)}, [
      {$set: {password: hashPassword(new_password), updated_at: '$$NOW'}}
    ])
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

const authService = new UsersService()
export default authService
