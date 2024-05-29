import {ObjectId} from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import {MEDICAL_BOOKING_FORMS_MESSAGE} from '~/constants/messages'
import {ErrorWithStatus} from '~/models/Errors'
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
    const isDependOnHospital = await databaseService.hospitals.findOne({
      booking_forms: new ObjectId(id)
    })
    if (isDependOnHospital) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: MEDICAL_BOOKING_FORMS_MESSAGE.MEDICAL_BOOKING_FORMS_DEPEND_ON_HOSPITAL
      })
    }
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
