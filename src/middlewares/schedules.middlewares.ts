import {checkSchema} from 'express-validator'
import {ObjectId} from 'mongodb'
import {TimeScheduleType} from '~/constants/enum'
import HTTP_STATUS from '~/constants/httpStatus'
import {SCHEDULES_MESSAGE} from '~/constants/messages'
import {ErrorWithStatus} from '~/models/Errors'
import databaseService from '~/services/database.service'
import validate from '~/utils/validate'

export const createSchedulesValidator = validate(
  checkSchema(
    {
      /**
       * hospital_id này sẽ đc gửi lên từ FE để check xem doctor_id có thuộc bệnh viện đó không nên sẽ ko lưu hospital_id vào db
       */
      hospital_id: {
        custom: {
          options: async (value: string, {req}) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(SCHEDULES_MESSAGE.INVALID_OBJECT_ID)
            }
            const isExist = await databaseService.doctors.findOne({
              doctor_id: new ObjectId(req.body.doctor_id),
              hospital_id: new ObjectId(value)
            })
            if (!isExist) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
                message: SCHEDULES_MESSAGE.DOCTOR_NOT_BELONG_TO_HOSPITAL
              })
            }
            return true
          }
        }
      },
      doctor_id: {
        notEmpty: {errorMessage: SCHEDULES_MESSAGE.DOCTOR_ID_IS_REQUIRED},
        isString: {errorMessage: SCHEDULES_MESSAGE.DOCTOR_ID_MUST_BE_A_STRING},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(SCHEDULES_MESSAGE.INVALID_OBJECT_ID)
            }
            const doctor = await databaseService.doctors.findOne({doctor_id: new ObjectId(value)})
            if (!doctor) {
              throw new Error(SCHEDULES_MESSAGE.DOCTOR_NOT_FOUND)
            }
            return true
          }
        }
      },
      max_number: {
        notEmpty: {errorMessage: SCHEDULES_MESSAGE.MAX_NUMBER_IS_REQUIRED},
        custom: {
          options: (value: number) => {
            if (typeof value !== 'number') {
              throw new Error(SCHEDULES_MESSAGE.MAX_NUMBER_MUST_BE_A_NUMBER)
            }
            if (value > 100) {
              throw new Error(SCHEDULES_MESSAGE.MAX_NUMBER_MUST_BE_LESS_THAN_100)
            }
            return true
          }
        }
      },
      date: {
        notEmpty: {errorMessage: SCHEDULES_MESSAGE.DATE_IS_REQUIRED},
        isString: {errorMessage: SCHEDULES_MESSAGE.DATE_MUST_BE_A_STRING},
        isLength: {options: {max: 10}, errorMessage: SCHEDULES_MESSAGE.DATE_MUST_BE_LESS_THAN_10_CHARACTERS},
        trim: true,
        custom: {
          options: async (value: string, {req}) => {
            /**
             * Kiểm tra nếu schedule của ngày đó của doctor đó đã tồn tại thì không cho tạo
             */
            const isExist = await databaseService.schedules.findOne({
              date: value,
              doctor_id: new ObjectId(req.body.doctor_id)
            })
            if (isExist) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
                message: SCHEDULES_MESSAGE.SCHEDULE_ALREADY_EXISTS
              })
            }
            return true
          }
        }
      },
      current_number: {
        optional: true,
        custom: {
          options: (value: number) => {
            if (typeof value !== 'number') {
              throw new Error(SCHEDULES_MESSAGE.CURRENT_NUMBER_MUST_BE_A_NUMBER)
            }
            if (value > 100) {
              throw new Error(SCHEDULES_MESSAGE.CURRENT_NUMBER_MUST_BE_LESS_THAN_100)
            }
            return true
          }
        }
      },
      time_type: {
        notEmpty: {errorMessage: SCHEDULES_MESSAGE.TIME_TYPE_IS_REQUIRED},
        isArray: {errorMessage: SCHEDULES_MESSAGE.TIME_TYPE_MUST_BE_AN_ARRAY},
        isIn: {
          options: [
            [
              TimeScheduleType.T1,
              TimeScheduleType.T2,
              TimeScheduleType.T3,
              TimeScheduleType.T4,
              TimeScheduleType.T5,
              TimeScheduleType.T6,
              TimeScheduleType.T7
            ]
          ],
          errorMessage: SCHEDULES_MESSAGE.TIME_TYPE_MUST_BE_IN_THE_RANGE
        },
        custom: {
          options: (value: string[]) => {
            if (value.length === 0) {
              throw new Error(SCHEDULES_MESSAGE.TIME_TYPE_MUST_NOT_BE_EMPTY)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const updateSchedulesValidator = validate(
  checkSchema(
    {
      hospital_id: {
        optional: true,
        custom: {
          options: async (value: string, {req}) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(SCHEDULES_MESSAGE.INVALID_OBJECT_ID)
            }
            const isExist = await databaseService.doctors.findOne({
              doctor_id: new ObjectId(req.body.doctor_id),
              hospital_id: new ObjectId(value)
            })
            if (!isExist) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
                message: SCHEDULES_MESSAGE.DOCTOR_NOT_BELONG_TO_HOSPITAL
              })
            }
            return true
          }
        }
      },
      doctor_id: {
        optional: true,
        notEmpty: {errorMessage: SCHEDULES_MESSAGE.DOCTOR_ID_IS_REQUIRED},
        isString: {errorMessage: SCHEDULES_MESSAGE.DOCTOR_ID_MUST_BE_A_STRING},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(SCHEDULES_MESSAGE.INVALID_OBJECT_ID)
            }
            const doctor = await databaseService.doctors.findOne({doctor_id: new ObjectId(value)})
            if (!doctor) {
              throw new Error(SCHEDULES_MESSAGE.DOCTOR_NOT_FOUND)
            }
            return true
          }
        }
      },
      max_number: {
        optional: true,
        notEmpty: {errorMessage: SCHEDULES_MESSAGE.MAX_NUMBER_IS_REQUIRED},
        custom: {
          options: (value: number) => {
            if (typeof value !== 'number') {
              throw new Error(SCHEDULES_MESSAGE.MAX_NUMBER_MUST_BE_A_NUMBER)
            }
            if (value > 100) {
              throw new Error(SCHEDULES_MESSAGE.MAX_NUMBER_MUST_BE_LESS_THAN_100)
            }
            return true
          }
        }
      },
      date: {
        optional: true,
        notEmpty: {errorMessage: SCHEDULES_MESSAGE.DATE_IS_REQUIRED},
        isString: {errorMessage: SCHEDULES_MESSAGE.DATE_MUST_BE_A_STRING},
        isLength: {options: {max: 10}, errorMessage: SCHEDULES_MESSAGE.DATE_MUST_BE_LESS_THAN_10_CHARACTERS},
        trim: true,
        custom: {
          options: async (value: string, {req}) => {
            const scheduleId = req.params?.id
            /**
             * Kiểm tra nếu schedule của ngày đó của doctor đó trừ _id đang sửa ra đã tồn tại thì không cho sửa
             */
            const isExist = await databaseService.schedules.findOne({
              date: value,
              doctor_id: new ObjectId(req.body.doctor_id),
              _id: {$ne: new ObjectId(scheduleId)}
            })
            if (isExist) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
                message: SCHEDULES_MESSAGE.SCHEDULE_ALREADY_EXISTS
              })
            }
            return true
          }
        }
      },
      current_number: {
        optional: true,
        custom: {
          options: (value: number) => {
            if (typeof value !== 'number') {
              throw new Error(SCHEDULES_MESSAGE.CURRENT_NUMBER_MUST_BE_A_NUMBER)
            }
            if (value > 100) {
              throw new Error(SCHEDULES_MESSAGE.CURRENT_NUMBER_MUST_BE_LESS_THAN_100)
            }
            return true
          }
        }
      },
      time_type: {
        optional: true,
        notEmpty: {errorMessage: SCHEDULES_MESSAGE.TIME_TYPE_IS_REQUIRED},
        isArray: {errorMessage: SCHEDULES_MESSAGE.TIME_TYPE_MUST_BE_AN_ARRAY},
        isIn: {
          options: [
            [
              TimeScheduleType.T1,
              TimeScheduleType.T2,
              TimeScheduleType.T3,
              TimeScheduleType.T4,
              TimeScheduleType.T5,
              TimeScheduleType.T6,
              TimeScheduleType.T7
            ]
          ],
          errorMessage: SCHEDULES_MESSAGE.TIME_TYPE_MUST_BE_IN_THE_RANGE
        },
        custom: {
          options: (value: string[]) => {
            if (value.length === 0) {
              throw new Error(SCHEDULES_MESSAGE.TIME_TYPE_MUST_NOT_BE_EMPTY)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const checkParamsScheduleId = validate(
  checkSchema(
    {
      id: {
        notEmpty: {errorMessage: SCHEDULES_MESSAGE.SCHEDULE_ID_IS_REQUIRED},
        isString: {errorMessage: SCHEDULES_MESSAGE.SCHEDULE_ID_MUST_BE_A_STRING},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(SCHEDULES_MESSAGE.INVALID_OBJECT_ID)
            }
            const schedule = await databaseService.schedules.findOne({_id: new ObjectId(value)})
            if (!schedule) {
              throw new Error(SCHEDULES_MESSAGE.SCHEDULE_NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
