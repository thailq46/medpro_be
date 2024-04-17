import {checkSchema} from 'express-validator'
import {USERS_MESSAGE} from '~/constants/messages'
import {GenderType} from '~/constants/types'
import databaseService from '~/services/database.service'
import usersService from '~/services/users.service'
import validate from '~/utils/validate'

export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {errorMessage: USERS_MESSAGE.NAME_IS_REQUIRED},
        isString: {errorMessage: USERS_MESSAGE.NAME_MUST_BE_STRING},
        trim: true
      },
      email: {
        notEmpty: {errorMessage: USERS_MESSAGE.EMAIL_IS_REQUIRED},
        isEmail: {errorMessage: USERS_MESSAGE.INVALID_EMAIL},
        custom: {
          options: async (value: string) => {
            const isExistEmail = await usersService.checkEmailExist(value)
            if (isExistEmail) {
              throw new Error(USERS_MESSAGE.EMAIL_ALREADY_EXIST)
            }
            return true
          }
        },
        trim: true
      },
      gender: {
        notEmpty: {errorMessage: USERS_MESSAGE.GENDER_IS_REQUIRED},
        isIn: {
          options: [[GenderType.Male, GenderType.Female]],
          errorMessage: USERS_MESSAGE.INVALID_GENDER
        }
      },
      date_of_birth: {
        notEmpty: {errorMessage: USERS_MESSAGE.DATE_BIRTH_IS_REQUIRED},
        isISO8601: {
          errorMessage: USERS_MESSAGE.INVALID_DATE_OF_BIRTH,
          options: {
            strict: true,
            strictSeparator: true
          }
        }
      },
      password: {
        notEmpty: {errorMessage: USERS_MESSAGE.PASSWORD_IS_REQUIRED},
        isString: {errorMessage: USERS_MESSAGE.PASSWORD_MUST_BE_STRING},
        isLength: {
          options: {min: 6, max: 50},
          errorMessage: USERS_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: USERS_MESSAGE.PASSWORD_MUST_BE_STRONG
        }
      },
      confirm_password: {
        notEmpty: {errorMessage: USERS_MESSAGE.PASSWORD_IS_REQUIRED},
        isString: {errorMessage: USERS_MESSAGE.PASSWORD_MUST_BE_STRING},
        isLength: {
          options: {min: 6, max: 50},
          errorMessage: USERS_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: USERS_MESSAGE.PASSWORD_MUST_BE_STRONG
        },
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
