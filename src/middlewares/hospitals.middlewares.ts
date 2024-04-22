import {checkSchema} from 'express-validator'
import {ObjectId} from 'mongodb'
import {
  addressCheckSchema,
  avatarCheckSchema,
  nameCheckSchema,
  slugCheckSchema,
  timeWorkCheckSchema
} from '~/constants/checkSchema'
import {HOSPITALS_MESSAGE} from '~/constants/messages'
import {CHECK_PHONE_NUMBER_REGEX} from '~/constants/regax'
import databaseService from '~/services/database.service'
import validate from '~/utils/validate'

export const createHospitalValidator = validate(
  checkSchema(
    {
      categoryId: {
        notEmpty: {
          errorMessage: HOSPITALS_MESSAGE.CATEGORY_ID_IS_REQUIRED
        },
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(HOSPITALS_MESSAGE.INVALID_CATEGORY_ID)
            }
            const isExist = await databaseService.categories.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(HOSPITALS_MESSAGE.CATEGORY_NOT_FOUND)
            }
            return true
          }
        }
      },
      name: {
        ...nameCheckSchema,
        custom: {
          options: async (value: string) => {
            const isExist = await databaseService.hospitals.findOne({name: value})
            if (isExist) {
              throw new Error(HOSPITALS_MESSAGE.NAME_ALREADY_EXIST)
            }
            return true
          }
        }
      },
      slug: {
        ...slugCheckSchema,
        custom: {
          options: async (value: string) => {
            const isExist = await databaseService.hospitals.findOne({slug: value})
            if (isExist) {
              throw new Error(HOSPITALS_MESSAGE.NAME_ALREADY_EXIST)
            }
            return true
          }
        }
      },
      description: {
        notEmpty: {errorMessage: HOSPITALS_MESSAGE.DESC_IS_REQUIRED},
        isString: {errorMessage: HOSPITALS_MESSAGE.DESC_MUST_BE_STRING},
        isLength: {options: {max: 500}, errorMessage: HOSPITALS_MESSAGE.DESC_NOT_EXCEED_500},
        trim: true
      },
      session: {
        notEmpty: {
          errorMessage: HOSPITALS_MESSAGE.SESSION_IS_REQUIRED
        },
        isString: {
          errorMessage: HOSPITALS_MESSAGE.SESSION_MUST_BE_STRING
        },
        isLength: {
          options: {max: 255},
          errorMessage: HOSPITALS_MESSAGE.SESSION_NOT_EXCEED_255
        },
        trim: true
      },
      start_time: timeWorkCheckSchema,
      end_time: timeWorkCheckSchema,
      hotline: {
        isString: {errorMessage: HOSPITALS_MESSAGE.HOTLINE_MUST_BE_STRING},
        custom: {
          options: (value: string) => {
            if (!CHECK_PHONE_NUMBER_REGEX.test(value)) {
              throw new Error(HOSPITALS_MESSAGE.INVALID_PHONE_NUMBER)
            }
            return true
          }
        },
        trim: true
      },
      address: {
        notEmpty: {errorMessage: HOSPITALS_MESSAGE.ADDRESS_IS_REQUIRED},
        ...addressCheckSchema
      },
      avatar: {
        optional: {options: {nullable: true}},
        ...avatarCheckSchema
      },
      banner: {
        optional: {options: {nullable: true}},
        ...avatarCheckSchema
      },
      images: {
        optional: {options: {nullable: true}},
        isArray: {
          errorMessage: HOSPITALS_MESSAGE.IMAGES_MUST_BE_ARRAY
        },
        custom: {
          options: (value: string[] | null) => {
            if (value !== null && value.some((item: string) => typeof item !== 'string')) {
              throw new Error(HOSPITALS_MESSAGE.IMAGE_MUST_BE_STRING)
            }
            return true
          }
        }
      },
      types: {
        isArray: {
          errorMessage: HOSPITALS_MESSAGE.TYPES_MUST_BE_ARRAY
        },
        custom: {
          options: async (value: string[]) => {
            if (value.some((item: any) => !ObjectId.isValid(item))) {
              throw new Error(HOSPITALS_MESSAGE.INVALID_OBJECT_ID)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const updateHospitalValidator = validate(
  checkSchema(
    {
      categoryId: {
        optional: true,
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(HOSPITALS_MESSAGE.INVALID_CATEGORY_ID)
            }
            const isExist = await databaseService.categories.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(HOSPITALS_MESSAGE.CATEGORY_NOT_FOUND)
            }
            return true
          }
        }
      },
      name: {
        optional: true,
        ...nameCheckSchema,
        custom: {
          options: async (value: string) => {
            const isExist = await databaseService.hospitals.findOne({
              $and: [{username: value}, {username: {$ne: value}}]
            })
            if (isExist) {
              throw new Error(HOSPITALS_MESSAGE.NAME_ALREADY_EXIST)
            }
            return true
          }
        }
      },
      slug: {
        optional: true,
        ...slugCheckSchema,
        custom: {
          options: async (value: string) => {
            const isExist = await databaseService.hospitals.findOne({
              $and: [{slug: value}, {slug: {$ne: value}}]
            })
            if (isExist) {
              throw new Error(HOSPITALS_MESSAGE.SLUG_ALREADY_EXIST)
            }
            return true
          }
        }
      },
      description: {
        optional: true,
        isString: {errorMessage: HOSPITALS_MESSAGE.DESC_MUST_BE_STRING},
        isLength: {options: {max: 500}, errorMessage: HOSPITALS_MESSAGE.DESC_NOT_EXCEED_500},
        trim: true
      },
      session: {
        optional: true,
        isString: {errorMessage: HOSPITALS_MESSAGE.SESSION_MUST_BE_STRING},
        isLength: {options: {max: 255}, errorMessage: HOSPITALS_MESSAGE.SESSION_NOT_EXCEED_255},
        trim: true
      },
      start_time: {optional: true, ...timeWorkCheckSchema},
      end_time: {optional: true, ...timeWorkCheckSchema},
      hotline: {
        optional: true,
        isString: {errorMessage: HOSPITALS_MESSAGE.HOTLINE_MUST_BE_STRING},
        custom: {
          options: (value: string) => {
            if (!CHECK_PHONE_NUMBER_REGEX.test(value)) {
              throw new Error(HOSPITALS_MESSAGE.INVALID_PHONE_NUMBER)
            }
            return true
          }
        },
        trim: true
      },
      address: {
        optional: true,
        notEmpty: {errorMessage: HOSPITALS_MESSAGE.ADDRESS_IS_REQUIRED},
        ...addressCheckSchema
      },
      avatar: {
        optional: {options: {nullable: true}},
        ...avatarCheckSchema
      },
      banner: {
        optional: {options: {nullable: true}},
        ...avatarCheckSchema
      },
      images: {
        optional: {options: {nullable: true}},
        isArray: {
          errorMessage: HOSPITALS_MESSAGE.IMAGES_MUST_BE_ARRAY
        },
        custom: {
          options: (value: string[] | null) => {
            if (value !== null && value.some((item: string) => typeof item !== 'string')) {
              throw new Error(HOSPITALS_MESSAGE.IMAGE_MUST_BE_STRING)
            }
            return true
          }
        }
      },
      types: {
        optional: true,
        isArray: {
          errorMessage: HOSPITALS_MESSAGE.TYPES_MUST_BE_ARRAY
        },
        custom: {
          options: async (value: string[]) => {
            if (value.some((item: any) => !ObjectId.isValid(item))) {
              throw new Error(HOSPITALS_MESSAGE.INVALID_OBJECT_ID)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const checkParamsHospitalValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: {errorMessage: HOSPITALS_MESSAGE.HOSPITAL_ID_IS_REQUIRED},
        custom: {
          options: async (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(HOSPITALS_MESSAGE.INVALID_CATEGORY_ID)
            }
            const isExist = await databaseService.hospitals.findOne({_id: new ObjectId(value)})
            if (!isExist) {
              throw new Error(HOSPITALS_MESSAGE.HOSPITAL_NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
