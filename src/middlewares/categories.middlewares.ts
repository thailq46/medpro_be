import {checkSchema} from 'express-validator'
import {ObjectId} from 'mongodb'
import {CATEGORIES_MESSAGE} from '~/constants/messages'
import databaseService from '~/services/database.service'
import validate from '~/utils/validate'

export const createCategoriesValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {errorMessage: CATEGORIES_MESSAGE.NAME_IS_REQUIRED},
        isString: {errorMessage: CATEGORIES_MESSAGE.NAME_MUST_BE_STRING},
        isLength: {
          options: {min: 1, max: 255},
          errorMessage: CATEGORIES_MESSAGE.NAME_MUST_BE_LENGTH_1_255
        },
        trim: true
      },
      slug: {
        notEmpty: {errorMessage: CATEGORIES_MESSAGE.SLUG_IS_REQUIRED},
        isString: {errorMessage: CATEGORIES_MESSAGE.SLUG_MUST_BE_STRING},
        matches: {
          options: /^\S+$/,
          errorMessage: CATEGORIES_MESSAGE.SLUG_NOT_CONTAIN_SPACE
        },
        isLength: {
          options: {max: 255},
          errorMessage: CATEGORIES_MESSAGE.SLUG_NOT_EXCEED_255
        },
        trim: true,
        custom: {
          options: async (value: string) => {
            const isExist = await databaseService.categories.findOne({slug: value})
            if (isExist) {
              throw new Error(CATEGORIES_MESSAGE.SLUG_ALREADY_EXIST)
            }
            return true
          }
        }
      },
      parent_id: {
        optional: {options: {nullable: true}},
        isString: {errorMessage: CATEGORIES_MESSAGE.PARENT_ID_MUST_BE_STRING},
        custom: {
          options: async (value: string | null) => {
            if (value !== null || value !== '') {
              if (!ObjectId.isValid(value as string)) {
                throw new Error(CATEGORIES_MESSAGE.INVALID_PARENT_ID)
              }
              const isExist = await databaseService.categories.findOne({_id: new ObjectId(value as string)})
              if (!isExist) {
                throw new Error(CATEGORIES_MESSAGE.CATEGORY_NOT_FOUND)
              }
              return true
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
