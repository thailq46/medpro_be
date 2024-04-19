import {Request, Response, NextFunction} from 'express'
import {checkSchema} from 'express-validator'
import {PositionType, UserVerifyStatus} from '~/constants/enum'
import HTTP_STATUS from '~/constants/httpStatus'
import {USERS_MESSAGE} from '~/constants/messages'
import {ErrorWithStatus} from '~/models/Errors'
import {TokenPayload} from '~/utils/jwt'
import validate from '~/utils/validate'
import {nameCheckSchema, dateOfBirthCheckSchema, genderCheckSchema} from './../constants/checkSchema'
import {numberEnumToArray} from '~/utils/common'
import databaseService from '~/services/database.service'

const CHECK_PHONE_NUMBER_REGEX = /^(-84|\+84|0)[3,5,7,8,9]\d{8,8}$/

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
  checkSchema({
    name: {optional: true, ...nameCheckSchema},
    date_of_birth: {optional: true, ...dateOfBirthCheckSchema},
    gender: {optional: true, ...genderCheckSchema},
    address: {
      optional: true,
      isString: {
        errorMessage: USERS_MESSAGE.ADDRESS_MUST_BE_STRING
      },
      trim: true
    },
    avatar: {
      optional: true,
      isString: {
        errorMessage: USERS_MESSAGE.AVATAR_MUST_BE_STRING
      },
      trim: true
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
    position: {
      optional: true,
      notEmpty: {errorMessage: USERS_MESSAGE.POSITION_IS_REQUIRED},
      isIn: {
        options: [numberEnumToArray(PositionType)],
        errorMessage: USERS_MESSAGE.INVALID_POSITION
      }
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
  })
)
