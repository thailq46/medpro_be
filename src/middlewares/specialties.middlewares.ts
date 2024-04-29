import {checkSchema} from 'express-validator'
import {ObjectId} from 'mongodb'
import {descriptionCheckSchema, nameCheckSchema, slugCheckSchema} from '~/constants/checkSchema'
import {SPECIALTIES_MESSAGE} from '~/constants/messages'
import databaseService from '~/services/database.service'
import validate from '~/utils/validate'

export const createSpecialtiesValidator = validate(
  checkSchema(
    {
      name: nameCheckSchema,
      slug: slugCheckSchema,
      description: descriptionCheckSchema,
      hostipal_id: {
        notEmpty: {errorMessage: SPECIALTIES_MESSAGE.HOSPITAL_ID_IS_REQUIRED},
        isString: {errorMessage: SPECIALTIES_MESSAGE.HOSPITAL_ID_MUST_BE_STRING},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(SPECIALTIES_MESSAGE.INVALID_HOSPITAL_ID)
            }
            const isExist = await databaseService.hospitals.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(SPECIALTIES_MESSAGE.HOSPITAL_NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const updateSpecialtiesValidator = validate(
  checkSchema(
    {
      name: {optional: true, ...nameCheckSchema},
      slug: {optional: true, ...slugCheckSchema},
      description: {optional: true, ...descriptionCheckSchema},
      hostipal_id: {
        optional: true,
        notEmpty: {errorMessage: SPECIALTIES_MESSAGE.HOSPITAL_ID_IS_REQUIRED},
        isString: {errorMessage: SPECIALTIES_MESSAGE.HOSPITAL_ID_MUST_BE_STRING},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(SPECIALTIES_MESSAGE.INVALID_HOSPITAL_ID)
            }
            const isExist = await databaseService.hospitals.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(SPECIALTIES_MESSAGE.HOSPITAL_NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const checkParamsSpecialtyID = validate(
  checkSchema(
    {
      id: {
        notEmpty: {errorMessage: SPECIALTIES_MESSAGE.ID_IS_REQUIRED},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(SPECIALTIES_MESSAGE.INVALID_OBJECT_ID)
            }
            const isExist = await databaseService.specialties.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(SPECIALTIES_MESSAGE.SPECIALTIES_NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
