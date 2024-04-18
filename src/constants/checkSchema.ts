import {ParamSchema} from 'express-validator'
import {GenderType} from '~/constants/enum'
import {USERS_MESSAGE} from '~/constants/messages'
import {numberEnumToArray} from '~/utils/common'

export const nameCheckSchema: ParamSchema = {
  notEmpty: {errorMessage: USERS_MESSAGE.NAME_IS_REQUIRED},
  isString: {errorMessage: USERS_MESSAGE.NAME_MUST_BE_STRING},
  trim: true
}

export const emailCheckSchema: ParamSchema = {
  notEmpty: {errorMessage: USERS_MESSAGE.EMAIL_IS_REQUIRED},
  isEmail: {errorMessage: USERS_MESSAGE.INVALID_EMAIL},
  trim: true
}

export const genderCheckSchema: ParamSchema = {
  notEmpty: {errorMessage: USERS_MESSAGE.GENDER_IS_REQUIRED},
  isIn: {
    options: [numberEnumToArray(GenderType)],
    errorMessage: USERS_MESSAGE.INVALID_GENDER
  }
}

export const dateOfBirthCheckSchema: ParamSchema = {
  notEmpty: {errorMessage: USERS_MESSAGE.DATE_BIRTH_IS_REQUIRED},
  isISO8601: {
    errorMessage: USERS_MESSAGE.INVALID_DATE_OF_BIRTH,
    options: {
      strict: true,
      strictSeparator: true
    }
  },
  trim: true
}

export const passwordCheckSchema: ParamSchema = {
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
  trim: true
}

export const confirmPasswordCheckSchema: ParamSchema = {
  notEmpty: {errorMessage: USERS_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED},
  isString: {errorMessage: USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRING},
  isLength: {
    options: {min: 6, max: 50},
    errorMessage: USERS_MESSAGE.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
  },
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRONG
  },
  trim: true
}
