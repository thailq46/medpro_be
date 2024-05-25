import {ObjectId} from 'mongodb'
import {
  CreateMedicalBookingFormsReqBody,
  UpdateMedicalBookingFormsReqBody
} from '~/models/request/MedicalBookingForms.request'
import MedicalBookingForms from '~/models/schemas/MedicalBookingForms.schema'
import databaseService from '~/services/database.service'

class MedicalBookingFormsService {
  async createMedicalBookingForms(payload: CreateMedicalBookingFormsReqBody) {
    return databaseService.medicalBookingForms.insertOne(new MedicalBookingForms(payload))
  }

  async updateMedicalBookingForms(id: string, payload: UpdateMedicalBookingFormsReqBody) {
    return databaseService.medicalBookingForms.findOneAndUpdate(
      {
        _id: new ObjectId(id)
      },
      [
        {
          $set: {
            ...payload,
            updated_at: '$$NOW'
          }
        }
      ],
      {returnDocument: 'after'}
    )
  }

  async deleteMedicalBookingForms(id: string) {
    return databaseService.medicalBookingForms.findOneAndDelete({_id: new ObjectId(id)})
  }

  async getMedicalBookingFormsById(id: string) {
    return databaseService.medicalBookingForms.findOne({_id: new ObjectId(id)})
  }

  async getFullMedicalBookingForms({limit, page, search}: {limit: number; page: number; search?: string}) {
    const searchString = typeof search === 'string' ? search : ''
    const $match: any = {
      $or: [{name: {$regex: searchString, $options: 'i'}}]
    }
    const [medicalBookingForms, totalItems] = await Promise.all([
      databaseService.medicalBookingForms
        .aggregate([
          {
            $match
          },
          {$skip: limit * (page - 1)},
          {$limit: limit}
        ])
        .toArray(),
      databaseService.medicalBookingForms.countDocuments($match)
    ])
    return {medicalBookingForms, totalItems}
  }
}

const medicalBookingFormsService = new MedicalBookingFormsService()
export default medicalBookingFormsService
