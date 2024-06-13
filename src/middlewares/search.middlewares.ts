import {checkSchema} from 'express-validator'
import validate from '~/utils/validate'

export const searchValidator = validate(
  checkSchema(
    {
      limit: {
        isNumeric: true,
        custom: {
          options: async (value) => {
            const num = Number(value)
            if (num > 100 || num < 1) {
              throw new Error('1 <= limit <= 100')
            }
            return true
          }
        }
      },
      category: {
        notEmpty: {errorMessage: 'Category is required'},
        isString: {errorMessage: 'Category must be a string'},
        trim: true
      },
      search_key: {
        isString: {errorMessage: 'Search key must be a string'},
        trim: true
      }
    },
    ['query']
  )
)
