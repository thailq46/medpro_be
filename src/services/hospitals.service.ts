import {ObjectId} from 'mongodb'
import {CreateHospitalsReqBody} from '~/models/request/Hospital.request'
import Hospital from '~/models/schemas/Hospital.schema'
import databaseService from '~/services/database.service'

class HospitalsService {
  async createHospital(payload: CreateHospitalsReqBody) {
    return await databaseService.hospitals.insertOne(
      new Hospital({
        ...payload,
        categoryId: new ObjectId(payload.categoryId),
        types: payload.types.map((type) => new ObjectId(type))
      })
    )
  }
}

const hospitalsService = new HospitalsService()
export default hospitalsService
