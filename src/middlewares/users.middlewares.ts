import {check, checkSchema} from 'express-validator'
import {USERS_MESSAGE} from '~/constants/messages'
import usersService from '~/services/users.service'
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
import {verifyToken} from '~/utils/jwt'

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
