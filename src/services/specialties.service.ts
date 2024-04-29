import {ObjectId} from 'mongodb'
import {CreateSpecialtiesReqBody, UpdateSpecialtiesReqBody} from '~/models/request/Specialty.request'
import Specialty from '~/models/schemas/Specialty.schema'
import databaseService from '~/services/database.service'

class SpecialtiesService {
  async createSpecialty(payload: CreateSpecialtiesReqBody) {
    return await databaseService.specialties.insertOne(
      new Specialty({
        ...payload,
        hostipal_id: new ObjectId(payload.hostipal_id)
      })
    )
  }

  async updateSpecialty(id: string, payload: UpdateSpecialtiesReqBody) {
    return await databaseService.specialties.findOneAndUpdate(
      {_id: new ObjectId(id)},
      [
        {
          $set: {
            ...payload,
            hostipal_id: new ObjectId(payload.hostipal_id),
            updated_at: '$$NOW'
          }
        }
      ],
      {returnDocument: 'after'}
    )
  }

  async deleteSpecialty(id: string) {
    return await databaseService.specialties.findOneAndDelete({_id: new ObjectId(id)})
  }

  async getSpecialtyById(id: string) {
    return await databaseService.specialties.findOne({_id: new ObjectId(id)})
  }

  async getFullSpecialties() {
    return await databaseService.specialties.find().toArray()
  }
}

const specialtiesService = new SpecialtiesService()
export default specialtiesService
