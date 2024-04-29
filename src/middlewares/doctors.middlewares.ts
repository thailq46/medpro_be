import {checkSchema} from 'express-validator'
import {ObjectId} from 'mongodb'
import {descriptionCheckSchema, sessionCheckSchema} from '~/constants/checkSchema'
import {RoleType} from '~/constants/enum'
import {DOCTORS_MESSAGE} from '~/constants/messages'
import databaseService from '~/services/database.service'
import validate from '~/utils/validate'

export const createDoctorsValidator = validate(
  checkSchema(
    {
      doctor_id: {
        notEmpty: {errorMessage: DOCTORS_MESSAGE.DOCTOR_ID_IS_REQUIRED},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(DOCTORS_MESSAGE.INVALID_OBJECT_ID)
            }
            const doctors = await databaseService.users.findOne({_id: new ObjectId(value)})
            if (!doctors) {
              throw new Error(DOCTORS_MESSAGE.DOCTOR_NOT_FOUND)
            }
            if (doctors?.role !== RoleType.Doctor) {
              throw new Error(DOCTORS_MESSAGE.YOU_ARE_NOT_A_DOCTOR)
            }
            return true
          }
        }
      },
      specialty_id: {
        notEmpty: {errorMessage: DOCTORS_MESSAGE.SPECIALTY_ID_IS_REQUIRED},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(DOCTORS_MESSAGE.INVALID_OBJECT_ID)
            }
            const specialty = await databaseService.specialties.findOne({_id: new ObjectId(value)})
            if (!specialty) {
              throw new Error(DOCTORS_MESSAGE.SPECIALTY_NOT_FOUND)
            }
            return true
          }
        }
      },
      description: descriptionCheckSchema,
      therapy: {
        notEmpty: {errorMessage: DOCTORS_MESSAGE.THERAPY_IS_REQUIRED},
        isString: {errorMessage: DOCTORS_MESSAGE.THERAPY_MUST_BE_STRING},
        isLength: {options: {max: 255}, errorMessage: DOCTORS_MESSAGE.THERAPY_NOT_EXCEED_255},
        trim: true
      },
      session: sessionCheckSchema,
      price: {
        notEmpty: {errorMessage: DOCTORS_MESSAGE.PRICE_IS_REQUIRED},
        custom: {
          options: (value: number) => {
            if (typeof value !== 'number') {
              throw new Error(DOCTORS_MESSAGE.PRICE_MUST_BE_NUMBER)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const updateDoctorsValidator = validate(
  checkSchema(
    {
      specialty_id: {
        optional: true,
        notEmpty: {errorMessage: DOCTORS_MESSAGE.SPECIALTY_ID_IS_REQUIRED},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(DOCTORS_MESSAGE.INVALID_OBJECT_ID)
            }
            const specialty = await databaseService.specialties.findOne({_id: new ObjectId(value)})
            if (!specialty) {
              throw new Error(DOCTORS_MESSAGE.SPECIALTY_NOT_FOUND)
            }
            return true
          }
        }
      },
      description: {optional: true, ...descriptionCheckSchema},
      therapy: {
        optional: true,
        notEmpty: {errorMessage: DOCTORS_MESSAGE.THERAPY_IS_REQUIRED},
        isString: {errorMessage: DOCTORS_MESSAGE.THERAPY_MUST_BE_STRING},
        isLength: {options: {max: 255}, errorMessage: DOCTORS_MESSAGE.THERAPY_NOT_EXCEED_255},
        trim: true
      },
      session: {optional: true, ...sessionCheckSchema},
      price: {
        optional: true,
        notEmpty: {errorMessage: DOCTORS_MESSAGE.PRICE_IS_REQUIRED},
        custom: {
          options: (value: number) => {
            if (typeof value !== 'number') {
              throw new Error(DOCTORS_MESSAGE.PRICE_MUST_BE_NUMBER)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const checkParamsDoctorsID = validate(
  checkSchema(
    {
      doctor_id: {
        notEmpty: {errorMessage: DOCTORS_MESSAGE.ID_IS_REQUIRED},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(DOCTORS_MESSAGE.INVALID_OBJECT_ID)
            }
            const doctors = await databaseService.doctors.findOne({doctor_id: new ObjectId(value)})
            if (!doctors) {
              throw new Error(DOCTORS_MESSAGE.DOCTOR_NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
