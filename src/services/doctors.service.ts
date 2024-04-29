import {ObjectId} from 'mongodb'
import {CreateDoctorsReqBody, UpdateDoctorsReqBody} from '~/models/request/Doctor.request'
import Doctor from '~/models/schemas/Doctor.schema'
import databaseService from '~/services/database.service'

class DoctorsService {
  async createDoctors(payload: CreateDoctorsReqBody) {
    return await databaseService.doctors.insertOne(
      new Doctor({
        ...payload,
        doctor_id: new ObjectId(payload.doctor_id),
        specialty_id: new ObjectId(payload.specialty_id)
      })
    )
  }

  async updateDoctors(id: string, payload: UpdateDoctorsReqBody) {
    return await databaseService.doctors.findOneAndUpdate(
      {doctor_id: new ObjectId(id)},
      [
        {
          $set: {
            ...payload,
            specialty_id: new ObjectId(payload.specialty_id),
            updated_at: '$$NOW'
          }
        }
      ],
      {returnDocument: 'after'}
    )
  }

  async deleteDoctors(id: string) {
    return await Promise.all([
      await databaseService.doctors.findOneAndDelete({doctor_id: new ObjectId(id)}),
      await databaseService.users.findOneAndDelete({_id: new ObjectId(id)})
    ])
  }

  async getDoctorsById(id: string) {
    return await databaseService.doctors.findOne({doctor_id: new ObjectId(id)})
  }

  async getFullDoctors() {
    return await databaseService.doctors.find().toArray()
  }
}

const doctorsService = new DoctorsService()
export default doctorsService
