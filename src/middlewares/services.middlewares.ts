import {checkSchema} from 'express-validator'
import {ObjectId} from 'mongodb'
import {descriptionCheckSchema, nameCheckSchema, sessionCheckSchema} from '~/constants/checkSchema'
import {SERVICES_MESSAGE} from '~/constants/messages'
import databaseService from '~/services/database.service'
import validate from '~/utils/validate'

export const createServicesValidator = validate(
  checkSchema(
    {
      hospital_id: {
        notEmpty: {errorMessage: SERVICES_MESSAGE.HOSPITAL_ID_IS_REQUIRED},
        trim: true,
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(SERVICES_MESSAGE.INVALID_HOSPITAL_ID)
            }
            const isExist = await databaseService.hospitals.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(SERVICES_MESSAGE.HOSPITAL_NOT_FOUND)
            }
            return true
          }
        }
      },
      specialty_id: {
        optional: {options: {nullable: true}},
        custom: {
          options: async (value: string | null) => {
            if (value === null) {
              return true
            }
            if (!ObjectId.isValid(value)) {
              throw new Error(SERVICES_MESSAGE.INVALID_OBJECT_ID)
            }
            const isExist = await databaseService.specialties.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(SERVICES_MESSAGE.SPECIALTY_NOT_FOUND)
            }
            return true
          }
        }
      },
      name: nameCheckSchema,
      description: descriptionCheckSchema,
      note: {
        optional: {options: {nullable: true}},
        isString: {errorMessage: SERVICES_MESSAGE.NOTE_MUST_BE_STRING},
        trim: true,
        isLength: {
          options: {max: 255},
          errorMessage: SERVICES_MESSAGE.NOTE_NOT_EXCEED_255
        }
      },
      price: {
        notEmpty: {errorMessage: SERVICES_MESSAGE.PRICE_IS_REQUIRED},
        custom: {
          options: (value: number) => {
            if (typeof value !== 'number') {
              throw new Error(SERVICES_MESSAGE.PRICE_MUST_BE_NUMBER)
            }
            return true
          }
        }
      },
      session: sessionCheckSchema
    },
    ['body']
  )
)

export const updateServicesValidator = validate(
  checkSchema(
    {
      hospital_id: {
        optional: true,
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(SERVICES_MESSAGE.INVALID_HOSPITAL_ID)
            }
            const isExist = await databaseService.hospitals.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(SERVICES_MESSAGE.HOSPITAL_NOT_FOUND)
            }
            return true
          }
        }
      },
      specialty_id: {
        optional: {options: {nullable: true}},
        custom: {
          options: async (value: string | null) => {
            if (value === null) {
              return true
            }
            if (!ObjectId.isValid(value)) {
              throw new Error(SERVICES_MESSAGE.INVALID_OBJECT_ID)
            }
            const isExist = await databaseService.specialties.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(SERVICES_MESSAGE.SPECIALTY_NOT_FOUND)
            }
            return true
          }
        }
      },
      name: {optional: true, ...nameCheckSchema},
      description: {optional: true, ...descriptionCheckSchema},
      note: {
        optional: {options: {nullable: true}},
        isString: {errorMessage: SERVICES_MESSAGE.NOTE_MUST_BE_STRING},
        trim: true,
        isLength: {
          options: {max: 255},
          errorMessage: SERVICES_MESSAGE.NOTE_NOT_EXCEED_255
        }
      },
      price: {
        optional: true,
        custom: {
          options: (value: number) => {
            if (typeof value !== 'number') {
              throw new Error(SERVICES_MESSAGE.PRICE_MUST_BE_NUMBER)
            }
            return true
          }
        }
      },
      session: {optional: true, ...sessionCheckSchema}
    },
    ['body']
  )
)

export const checkParamsServiceID = validate(
  checkSchema(
    {
      id: {
        notEmpty: {errorMessage: SERVICES_MESSAGE.ID_IS_REQUIRED},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(SERVICES_MESSAGE.INVALID_OBJECT_ID)
            }
            const isExist = await databaseService.services.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(SERVICES_MESSAGE.SERVICES_NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
