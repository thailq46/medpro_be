import {ObjectId} from 'mongodb'
import {CreateHospitalsReqBody, UpdateHospitalsReqBody} from '~/models/request/Hospital.request'
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

  async getFullHospitals() {
    return await databaseService.hospitals.find().toArray()
  }

  async updateHospital(id: string, payload: UpdateHospitalsReqBody) {
    return await databaseService.hospitals.findOneAndUpdate(
      {_id: new ObjectId(id)},
      [
        {
          $set: {
            ...payload,
            categoryId: new ObjectId(payload.categoryId),
            types: payload.types?.map((type) => new ObjectId(type)) || []
          }
        }
      ],
      {returnDocument: 'after'}
    )
  }
}

const hospitalsService = new HospitalsService()
export default hospitalsService
