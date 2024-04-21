import {checkSchema} from 'express-validator'
import validate from '~/utils/validate'
import {MEDICAL_BOOKING_FORMS_MESSAGE} from '~/constants/messages'
import databaseService from '~/services/database.service'

export const createMedicalBookingFormsValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {errorMessage: MEDICAL_BOOKING_FORMS_MESSAGE.NAME_IS_REQUIRED},
        isString: {errorMessage: MEDICAL_BOOKING_FORMS_MESSAGE.NAME_MUST_BE_STRING},
        isLength: {options: {max: 255}, errorMessage: MEDICAL_BOOKING_FORMS_MESSAGE.NAME_NOT_EXCEED_255},
        trim: true,
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
      image: {
        optional: {options: {nullable: true}},
        isString: {errorMessage: MEDICAL_BOOKING_FORMS_MESSAGE.IMAGE_MUST_BE_STRING},
        isLength: {options: {min: 1, max: 500}, errorMessage: MEDICAL_BOOKING_FORMS_MESSAGE.IMAGE_URL_LENGTH},
        trim: true
      }
    },
    ['body']
  )
)
