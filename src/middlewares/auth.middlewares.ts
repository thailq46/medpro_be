import {checkSchema} from 'express-validator'
import {USERS_MESSAGE} from '~/constants/messages'
import usersService from '~/services/auth.service'
import validate from '~/utils/validate'
import {
  nameCheckSchema,
  emailCheckSchema,
  dateOfBirthCheckSchema,
  passwordCheckSchema,
  genderCheckSchema,
  confirmPasswordCheckSchema
} from '~/constants/checkSchema'
import {ErrorWithStatus} from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import databaseService from '~/services/database.service'
import {hashPassword} from '~/utils/crypto'
import {Request} from 'express'
import {verifyAccessToken} from '~/utils/common'
import {envConfig} from '~/constants/config'
import {TokenPayload, verifyToken} from '~/utils/jwt'
import {ObjectId} from 'mongodb'
import {JsonWebTokenError} from 'jsonwebtoken'
import {capitalize} from 'lodash'

export const registerValidator = validate(
  checkSchema(
    {
      name: nameCheckSchema,
      email: {
        ...emailCheckSchema,
        custom: {
          options: async (value: string) => {
            const isExistEmail = await usersService.checkEmailExist(value)
            if (isExistEmail) {
              throw new Error(USERS_MESSAGE.EMAIL_ALREADY_EXIST)
            }
            return true
          }
        }
      },
      gender: {
        ...genderCheckSchema,
        custom: {
          options: (value: number) => {
            if (typeof value !== 'number') {
              throw new Error(USERS_MESSAGE.GENDER_MUST_BE_NUMBER)
            }
            return true
          }
        }
      },
      date_of_birth: dateOfBirthCheckSchema,
      password: passwordCheckSchema,
      confirm_password: {
        ...confirmPasswordCheckSchema,
        custom: {
          options: (value: string, {req}) => {
            if (value !== req.body.password) {
              throw new Error(USERS_MESSAGE.PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        ...emailCheckSchema,
        custom: {
          options: async (value: string, {req}) => {
            const user = await databaseService.users.findOne({
              email: value,
              password: hashPassword(req.body.password)
            })
            if (!user) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USERS_MESSAGE.EMAIL_OR_PASSWORD_INCORRECT
              })
            }
            req.user = user
            return true
          }
        }
      },
      password: passwordCheckSchema
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        notEmpty: {
          errorMessage: USERS_MESSAGE.ACCESS_TOKEN_REQUIRED
        },
        custom: {
          options: async (value: string, {req}) => {
            if (!value) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USERS_MESSAGE.ACCESS_TOKEN_REQUIRED
              })
            }
            const accessToken = (value || '').split(' ')[1]
            return await verifyAccessToken(accessToken, req as Request)
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        notEmpty: {errorMessage: USERS_MESSAGE.REFRESH_TOKEN_IS_REQUIRED},
        isString: {errorMessage: USERS_MESSAGE.REFRESH_TOKEN_MUST_BE_STRING},
        custom: {
          options: async (value: string, {req}) => {
            if (!value) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USERS_MESSAGE.REFRESH_TOKEN_IS_REQUIRED
              })
            }
            const [decode_refresh_token, refresh_token] = await Promise.all([
              await verifyToken({
                token: value,
                secretOrPrivateKey: envConfig.jwtSecretRefreshToken
              }),
              await databaseService.refreshTokens.findOne({token: value})
            ])
            if (!refresh_token) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USERS_MESSAGE.USED_REFRESH_TOKEN_OR_NOT_EXISTS
              })
            }
            ;(req as Request).decode_refresh_token = decode_refresh_token
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const forgotPasswordValidator = validate(
  checkSchema(
    {
      email: {
        ...emailCheckSchema,
        custom: {
          options: async (value: string, {req}) => {
            const user = await databaseService.users.findOne({email: value})
            if (!user) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USERS_MESSAGE.EMAIL_DOES_NOT_EXIST
              })
            }
            req.user = user
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const verifyForgotPasswordTokenValidator = validate(
  checkSchema(
    {
      forgot_password_token: {
        notEmpty: {errorMessage: USERS_MESSAGE.FORGOT_PASSWORD_TOKEN_IS_REQUIRED},
        isString: {errorMessage: USERS_MESSAGE.FORGOT_PASSWORD_TOKEN_MUST_BE_STRING},
        custom: {
          options: async (value: string, {req}) => {
            if (!value) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USERS_MESSAGE.FORGOT_PASSWORD_TOKEN_IS_REQUIRED
              })
            }
            try {
              const decode_forgot_password_token = await verifyToken({
                token: value,
                secretOrPrivateKey: envConfig.jwtSecretForgotPasswordToken
              })
              const {user_id} = decode_forgot_password_token
              const user = await databaseService.users.findOne({_id: new ObjectId(user_id)})
              if (!user) {
                throw new ErrorWithStatus({
                  status: HTTP_STATUS.UNAUTHORIZED,
                  message: USERS_MESSAGE.USER_NOT_FOUND
                })
              }
              if (user.forgot_password_token !== value) {
                throw new ErrorWithStatus({
                  status: HTTP_STATUS.UNAUTHORIZED,
                  message: USERS_MESSAGE.INVALID_FORGOT_PASSWORD_TOKEN
                })
              }
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const resetPasswordValidator = validate(
  checkSchema(
    {
      password: passwordCheckSchema,
      confirm_password: {
        ...confirmPasswordCheckSchema,
        custom: {
          options: (value: string, {req}) => {
            if (value !== req.body.password) {
              throw new Error(USERS_MESSAGE.PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH)
            }
            return true
          }
        }
      },
      forgot_password_token: {
        notEmpty: {errorMessage: USERS_MESSAGE.FORGOT_PASSWORD_TOKEN_IS_REQUIRED},
        isString: {errorMessage: USERS_MESSAGE.FORGOT_PASSWORD_TOKEN_MUST_BE_STRING},
        custom: {
          options: async (value: string, {req}) => {
            if (!value) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USERS_MESSAGE.FORGOT_PASSWORD_TOKEN_IS_REQUIRED
              })
            }
            try {
              const decoded_forgot_password_token = await verifyToken({
                token: value,
                secretOrPrivateKey: envConfig.jwtSecretForgotPasswordToken
              })
              ;(req as Request).decoded_forgot_password_token = decoded_forgot_password_token
            } catch (error) {
              throw new ErrorWithStatus({
                message: capitalize((error as JsonWebTokenError).message),
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const emailVerifyTokenValidator = validate(
  checkSchema(
    {
      email_verify_token: {
        notEmpty: {errorMessage: USERS_MESSAGE.EMAIL_VERIFY_TOKEN_IS_REQUIRED},
        isString: {errorMessage: USERS_MESSAGE.EMAIL_VERIFY_TOKEN_MUST_BE_STRING},
        custom: {
          options: async (value: string, {req}) => {
            if (!value) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USERS_MESSAGE.EMAIL_VERIFY_TOKEN_IS_REQUIRED
              })
            }
            try {
              const decoded_email_verify_token = await verifyToken({
                token: value,
                secretOrPrivateKey: envConfig.jwtSecretEmailVerifyToken
              })
              ;(req as Request).decoded_email_verify_token = decoded_email_verify_token
            } catch (error) {
              throw new ErrorWithStatus({
                message: capitalize((error as JsonWebTokenError).message),
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const changePasswordValidator = validate(
  checkSchema(
    {
      old_password: {
        notEmpty: {errorMessage: USERS_MESSAGE.PASSWORD_IS_REQUIRED},
        isString: {errorMessage: USERS_MESSAGE.PASSWORD_MUST_BE_STRING},
        custom: {
          options: async (value: string, {req}) => {
            const {user_id} = (req as Request).decode_authorization as TokenPayload
            const user = await databaseService.users.findOne({
              _id: new ObjectId(user_id)
            })
            if (!user) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGE.USER_NOT_FOUND,
                status: HTTP_STATUS.NOT_FOUND
              })
            }
            const {password} = user
            if (password !== hashPassword(value)) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGE.OLD_PASSWORD_INCORRECT,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              })
            }
            return true
          }
        }
      },
      new_password: passwordCheckSchema,
      confirm_new_password: {
        ...confirmPasswordCheckSchema,
        custom: {
          options: (value: string, {req}) => {
            if (value !== req.body.new_password) {
              throw new Error(USERS_MESSAGE.PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
