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

  async getFullMedicalBookingForms() {
    return databaseService.medicalBookingForms.find({}).toArray()
  }
}

const medicalBookingFormsService = new MedicalBookingFormsService()
export default medicalBookingFormsService
