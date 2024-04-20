import {CreateCateReqBody} from '~/models/request/Category.request'
import Category from '~/models/schemas/Category.schema'
import databaseService from '~/services/database.service'
import {ObjectId} from 'mongodb'

class CategoriesService {
  async createCategory(payload: CreateCateReqBody) {
    return await databaseService.categories.insertOne(
      new Category({
        ...payload,
        parent_id: payload.parent_id ? new ObjectId(payload.parent_id) : null
      })
    )
  }
}

const categoriesService = new CategoriesService()
export default categoriesService
