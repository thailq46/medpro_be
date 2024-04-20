import {checkSchema} from 'express-validator'
import {ObjectId} from 'mongodb'
import {CATEGORIES_MESSAGE} from '~/constants/messages'
import databaseService from '~/services/database.service'
import validate from '~/utils/validate'
import {nameCategoryCheckSchema, slugCategoryCheckSchema} from '~/constants/checkSchema'

export const createCategoriesValidator = validate(
  checkSchema(
    {
      name: nameCategoryCheckSchema,
      slug: {
        ...slugCategoryCheckSchema,
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

export const updateCategoriesValidator = validate(
  checkSchema(
    {
      name: {optional: true, ...nameCategoryCheckSchema},
      slug: {
        optional: true,
        ...slugCategoryCheckSchema,
        custom: {
          options: async (value: string, {req}) => {
            const categoryId = req.params?.id
            const isExist = await databaseService.categories.findOne({
              slug: value,
              _id: {$ne: new ObjectId(categoryId)}
            })
            if (isExist) {
              throw new Error(CATEGORIES_MESSAGE.SLUG_ALREADY_EXIST)
            }
            return true
          }
        }
      },
      parent_id: {
        optional: {
          options: {nullable: true}
        },
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
