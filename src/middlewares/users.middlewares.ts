import {checkSchema} from 'express-validator'
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
