import {Request, Response, NextFunction} from 'express'
import {checkSchema} from 'express-validator'
import {RoleType, UserVerifyStatus} from '~/constants/enum'
import HTTP_STATUS from '~/constants/httpStatus'
import {USERS_MESSAGE} from '~/constants/messages'
import {ErrorWithStatus} from '~/models/Errors'
import {TokenPayload} from '~/utils/jwt'
import validate from '~/utils/validate'
import {
  nameCheckSchema,
  dateOfBirthCheckSchema,
  genderCheckSchema,
  addressCheckSchema,
  avatarCheckSchema,
  positionCheckSchema
} from './../constants/checkSchema'
import databaseService from '~/services/database.service'
import {numberEnumToArray} from '~/utils/common'
import {CHECK_PHONE_NUMBER_REGEX} from '~/constants/regax'

export const verifiedUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const {verify} = req.decode_authorization as TokenPayload
  if (verify !== UserVerifyStatus.Verified) {
    // Khi next 1 error thì sẽ chạy đến middleware error handler. Đây là middleware đồng bộ throw thì express validator tự động next giá trị throw (Chỉ áp dụng với synchronous)
    return next(
      new ErrorWithStatus({
        message: USERS_MESSAGE.USER_NOT_VERIFIED,
        status: HTTP_STATUS.FORBIDDEN
      })
    )
  }
  next()
}

export const updateMeValidator = validate(
  checkSchema(
    {
      name: {optional: true, ...nameCheckSchema},
      date_of_birth: {optional: true, ...dateOfBirthCheckSchema},
      gender: {
        optional: true,
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
      address: {
        optional: true,
        ...addressCheckSchema
      },
      avatar: {
        optional: true,
        ...avatarCheckSchema
      },
      phone_number: {
        optional: true,
        isString: {
          errorMessage: USERS_MESSAGE.PHONE_NUMBER_MUST_BE_STRING
        },
        custom: {
          options: (value: string) => {
            if (!CHECK_PHONE_NUMBER_REGEX.test(value)) {
              throw new Error(USERS_MESSAGE.INVALID_PHONE_NUMBER)
            }
            return true
          }
        },
        trim: true
      },
      username: {
        optional: true,
        isString: {
          errorMessage: USERS_MESSAGE.USERNAME_MUST_BE_STRING
        },
        custom: {
          options: async (value: string) => {
            const user = await databaseService.users.findOne({username: value})
            if (user) {
              throw new Error(USERS_MESSAGE.USERNAME_ALREADY_EXIST)
            }
            return true
          }
        },
        trim: true
      }
    },
    ['body']
  )
)

export const updateUserByUsernameValidator = validate(
  checkSchema(
    {
      name: {optional: true, ...nameCheckSchema},
      date_of_birth: {optional: true, ...dateOfBirthCheckSchema},
      gender: {
        optional: true,
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
      address: {
        optional: true,
        ...addressCheckSchema
      },
      avatar: {
        optional: true,
        ...avatarCheckSchema
      },
      phone_number: {
        optional: true,
        isString: {errorMessage: USERS_MESSAGE.PHONE_NUMBER_MUST_BE_STRING},
        trim: true,
        custom: {
          options: (value: string) => {
            if (!CHECK_PHONE_NUMBER_REGEX.test(value)) {
              throw new Error(USERS_MESSAGE.INVALID_PHONE_NUMBER)
            }
            return true
          }
        }
      },
      position: {
        optional: true,
        ...positionCheckSchema,
        custom: {
          options: (value: number) => {
            if (typeof value !== 'number') {
              throw new Error(USERS_MESSAGE.POSITION_MUST_BE_NUMBER)
            }
            return true
          }
        }
      },
      username: {
        optional: true,
        isString: {
          errorMessage: USERS_MESSAGE.USERNAME_MUST_BE_STRING
        },
        trim: true,
        custom: {
          options: async (value: string, {req}) => {
            const usernameToUpdate = req.params?.username
            const user = await databaseService.users.findOne({
              $and: [{username: value}, {username: {$ne: usernameToUpdate}}]
            })
            if (user) {
              throw new Error(USERS_MESSAGE.USERNAME_ALREADY_EXIST)
            }
            return true
          }
        }
      },
      verify: {
        optional: true,
        notEmpty: {errorMessage: USERS_MESSAGE.VERIFY_IS_REQUIRED},
        isIn: {
          options: [numberEnumToArray(UserVerifyStatus)],
          errorMessage: USERS_MESSAGE.INVALID_VERIFY
        },
        custom: {
          options: (value: number) => {
            if (typeof value !== 'number') {
              throw new Error(USERS_MESSAGE.VERIFY_MUST_BE_A_NUMBER)
            }
            return true
          }
        }
      },
      role: {
        optional: true,
        notEmpty: {errorMessage: USERS_MESSAGE.ROLE_IS_REQUIRED},
        isIn: {
          options: [numberEnumToArray(RoleType)],
          errorMessage: USERS_MESSAGE.INVALID_ROLE
        },
        custom: {
          options: (value: number) => {
            if (typeof value !== 'number') {
              throw new Error(USERS_MESSAGE.ROLE_MUST_BE_NUMBER)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
