import {ObjectId} from 'mongodb'
import {CreateServicesReqBody, UpdateServicesReqBody} from '~/models/request/Service.request'
import Service from '~/models/schemas/Service.schema'
import databaseService from '~/services/database.service'

class ServicesService {
  async createServices(payload: CreateServicesReqBody) {
    return await databaseService.services.insertOne(
      new Service({
        ...payload,
        hospital_id: new ObjectId(payload.hospital_id),
        specialty_id: payload.specialty_id ? new ObjectId(payload.specialty_id) : null
      })
    )
  }

  async updateServices(id: string, payload: UpdateServicesReqBody) {
    return await databaseService.services.findOneAndUpdate(
      {_id: new ObjectId(id)},
      [
        {
          $set: {
            ...payload,
            hospital_id: new ObjectId(payload.hospital_id),
            specialty_id: payload.specialty_id ? new ObjectId(payload.specialty_id) : null,
            updated_at: '$$NOW'
          }
        }
      ],
      {returnDocument: 'after'}
    )
  }

  async deleteServices(id: string) {
    return await databaseService.services.findOneAndDelete({_id: new ObjectId(id)})
  }

  async getFullServices() {
    return await databaseService.services.find().toArray()
  }
  async getServicesById(id: string) {
    return await databaseService.services.findOne({_id: new ObjectId(id)})
  }
}

const servicesService = new ServicesService()
export default servicesService
