import {CreateMedicalBookingFormsReqBody} from '~/models/request/MedicalBookingForms.request'
import MedicalBookingForms from '~/models/schemas/MedicalBookingForms.schema'
import databaseService from '~/services/database.service'

class MedicalBookingFormsService {
  async createMedicalBookingForms(payload: CreateMedicalBookingFormsReqBody) {
    return databaseService.medicalBookingForms.insertOne(new MedicalBookingForms(payload))
  }
}

const medicalBookingFormsService = new MedicalBookingFormsService()
export default medicalBookingFormsService
