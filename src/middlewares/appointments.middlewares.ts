import {checkSchema} from 'express-validator'
import {ObjectId} from 'mongodb'
import {
  addressCheckSchema,
  dateOfBirthCheckSchema,
  emailCheckSchema,
  genderCheckSchema,
  nameCheckSchema
} from '~/constants/checkSchema'
import HTTP_STATUS from '~/constants/httpStatus'
import {APPOINTMENTS_MESSAGE, SERVICES_MESSAGE, USERS_MESSAGE} from '~/constants/messages'
import {CHECK_PHONE_NUMBER_REGEX} from '~/constants/regax'
import {ErrorWithStatus} from '~/models/Errors'
import databaseService from '~/services/database.service'
import validate from '~/utils/validate'

export const createAppointmentsValidator = validate(
  checkSchema(
    {
      doctor_id: {
        notEmpty: {errorMessage: APPOINTMENTS_MESSAGE.DOCTOR_ID_REQUIRED},
        custom: {
          options: async (value: string, {req}) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(APPOINTMENTS_MESSAGE.INVALID_OBJECT_ID)
            }
            const isExist = await databaseService.doctors.findOne({doctor_id: new ObjectId(value)})
            if (!isExist) {
              throw new ErrorWithStatus({
                message: APPOINTMENTS_MESSAGE.DOCTOR_NOT_FOUND,
                status: HTTP_STATUS.NOT_FOUND
              })
            }
            /**
             * Kiểm tra nếu khách hàng đặt đặt lịch trong cùng 1 ngày, cùng 1 dịch vụ, cùng 1 bác sĩ thì không thể đặt lịch
             */
            const isBooked = await databaseService.appointments.findOne({
              patient_id: new ObjectId(req.body.patient_id),
              doctor_id: new ObjectId(value),
              date: req.body.date,
              service_id: new ObjectId(req.body.service_id)
            })
            if (isBooked) {
              throw new ErrorWithStatus({
                message: APPOINTMENTS_MESSAGE.IS_BOOKED,
                status: HTTP_STATUS.BAD_REQUEST
              })
            }
            return true
          }
        }
      },
      patient_id: {
        notEmpty: {errorMessage: APPOINTMENTS_MESSAGE.PATIENT_ID_REQUIRED},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(APPOINTMENTS_MESSAGE.INVALID_OBJECT_ID)
            }
            const isExist = await databaseService.users.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new ErrorWithStatus({
                message: APPOINTMENTS_MESSAGE.PATIENT_NOT_FOUND,
                status: HTTP_STATUS.NOT_FOUND
              })
            }
            return true
          }
        }
      },
      service_id: {
        notEmpty: {errorMessage: APPOINTMENTS_MESSAGE.SERVICE_ID_REQUIRED},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(APPOINTMENTS_MESSAGE.INVALID_OBJECT_ID)
            }
            const isExist = await databaseService.services.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new ErrorWithStatus({
                message: APPOINTMENTS_MESSAGE.SERVICE_NOT_FOUND,
                status: HTTP_STATUS.NOT_FOUND
              })
            }
            return true
          }
        }
      },
      address: addressCheckSchema,
      date: {
        notEmpty: {errorMessage: APPOINTMENTS_MESSAGE.DATE_REQUIRED},
        isString: {errorMessage: APPOINTMENTS_MESSAGE.DATE_MUST_BE_STRING},
        trim: true
      },
      time: {
        notEmpty: {errorMessage: APPOINTMENTS_MESSAGE.TIME_REQUIRED},
        isString: {errorMessage: APPOINTMENTS_MESSAGE.TIME_MUST_BE_STRING},
        trim: true
      },
      date_of_birth: dateOfBirthCheckSchema,
      email: emailCheckSchema,
      fullname: nameCheckSchema,
      gender: genderCheckSchema,
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
      reason: {
        notEmpty: {errorMessage: APPOINTMENTS_MESSAGE.REASON_REQUIRED},
        isString: {errorMessage: APPOINTMENTS_MESSAGE.REASON_MUST_BE_STRING},
        isLength: {
          options: {max: 500},
          errorMessage: APPOINTMENTS_MESSAGE.REASON_NOT_EXCEED_500
        },
        trim: true
      },
      status: {
        notEmpty: {errorMessage: APPOINTMENTS_MESSAGE.STATUS_REQUIRED},
        isBoolean: {errorMessage: APPOINTMENTS_MESSAGE.STATUS_MUST_BE_BOOLEAN}
      },
      isPayment: {
        notEmpty: {errorMessage: APPOINTMENTS_MESSAGE.IS_PAYMENT_REQUIRED},
        isBoolean: {errorMessage: APPOINTMENTS_MESSAGE.IS_PAYMENT_MUST_BE_BOOLEAN}
      }
    },
    ['body']
  )
)

export const checkParamsAppointmentId = validate(
  checkSchema(
    {
      id: {
        notEmpty: {errorMessage: APPOINTMENTS_MESSAGE.APPOINTMENT_ID_REQUIRED},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(APPOINTMENTS_MESSAGE.INVALID_OBJECT_ID)
            }
            const isExist = await databaseService.appointments.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(APPOINTMENTS_MESSAGE.APPOINTMENT_NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
