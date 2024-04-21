import {ParamSchema, checkSchema} from 'express-validator'
import validate from '~/utils/validate'
import {MEDICAL_BOOKING_FORMS_MESSAGE} from '~/constants/messages'
import databaseService from '~/services/database.service'
import {ObjectId} from 'mongodb'

const nameCheckSchema: ParamSchema = {
  notEmpty: {errorMessage: MEDICAL_BOOKING_FORMS_MESSAGE.NAME_IS_REQUIRED},
  isString: {errorMessage: MEDICAL_BOOKING_FORMS_MESSAGE.NAME_MUST_BE_STRING},
  isLength: {options: {max: 255}, errorMessage: MEDICAL_BOOKING_FORMS_MESSAGE.NAME_NOT_EXCEED_255},
  trim: true
}

const imageCheckSchema: ParamSchema = {
  optional: {options: {nullable: true}},
  isString: {errorMessage: MEDICAL_BOOKING_FORMS_MESSAGE.IMAGE_MUST_BE_STRING},
  isLength: {options: {min: 1, max: 500}, errorMessage: MEDICAL_BOOKING_FORMS_MESSAGE.IMAGE_URL_LENGTH},
  trim: true
}
export const createMedicalBookingFormsValidator = validate(
  checkSchema(
    {
      name: {
        ...nameCheckSchema,
        custom: {
          options: async (value: string) => {
            const isExist = await databaseService.medicalBookingForms.findOne({name: value})
            if (isExist) {
              throw new Error(MEDICAL_BOOKING_FORMS_MESSAGE.NAME_ALREADY_EXIST)
            }
            return true
          }
        }
      },
      image: imageCheckSchema
    },
    ['body']
  )
)

export const updateMedicalBookingFormsValidator = validate(
  checkSchema(
    {
      name: {
        optional: true,
        ...nameCheckSchema,
        custom: {
          options: async (value: string) => {
            const isExist = await databaseService.medicalBookingForms.findOne({
              $and: [{name: value}, {name: {$ne: value}}]
            })
            if (isExist) {
              throw new Error(MEDICAL_BOOKING_FORMS_MESSAGE.NAME_ALREADY_EXIST)
            }
            return true
          }
        }
      },
      image: imageCheckSchema
    },
    ['body']
  )
)

export const deleteMedicalBookingFormsValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: {errorMessage: MEDICAL_BOOKING_FORMS_MESSAGE.NOT_FOUND},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(MEDICAL_BOOKING_FORMS_MESSAGE.INVALID_ID)
            }
            const isExist = await databaseService.medicalBookingForms.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(MEDICAL_BOOKING_FORMS_MESSAGE.NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
