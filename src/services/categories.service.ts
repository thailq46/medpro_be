import {CreateCateReqBody, UpdateCateReqBody} from '~/models/request/Category.request'
import Category from '~/models/schemas/Category.schema'
import databaseService from '~/services/database.service'
import {ObjectId} from 'mongodb'
import {Response} from 'express'
import {CATEGORIES_MESSAGE} from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'

class CategoriesService {
  async createCategory(payload: CreateCateReqBody) {
    return await databaseService.categories.insertOne(
      new Category({
        ...payload,
        parent_id: payload.parent_id ? new ObjectId(payload.parent_id) : null
      })
    )
  }

  async updateCategory(id: string, payload: UpdateCateReqBody, res: Response) {
    const isExist = await databaseService.categories.findOne({_id: new ObjectId(id)})
    if (!isExist) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: CATEGORIES_MESSAGE.CATEGORY_NOT_FOUND,
        data: null
      })
    }
    const result = await databaseService.categories.findOneAndUpdate(
      {_id: new ObjectId(id)},
      [
        {
          $set: {
            ...payload,
            parent_id: payload.parent_id ? new ObjectId(payload.parent_id) : null,
            updated_at: '$$NOW'
          }
        }
      ],
      {returnDocument: 'after'}
    )
    return res.json({
      message: CATEGORIES_MESSAGE.UPDATE_SUCCESS,
      data: result
    })
  }
}

const categoriesService = new CategoriesService()
export default categoriesService
