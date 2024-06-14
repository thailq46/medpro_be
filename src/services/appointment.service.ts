import {ObjectId} from 'mongodb'
import {CreateAppointmentsReqBody} from '~/models/request/Appointment.request'
import Appointment from '~/models/schemas/Appointment.schema'
import databaseService from '~/services/database.service'

class AppointmentService {
  async createAppointment(payload: CreateAppointmentsReqBody) {
    return await databaseService.appointments.insertOne(
      new Appointment({
        ...payload,
        doctor_id: new ObjectId(payload.doctor_id),
        patient_id: new ObjectId(payload.patient_id),
        service_id: new ObjectId(payload.service_id)
      })
    )
  }

  async deleteAppointment(id: string) {
    return await databaseService.appointments.deleteOne({_id: new ObjectId(id)})
  }

  async getFullAppointments() {
    const appointments = await databaseService.appointments
      .aggregate([
        {
          $lookup: {
            from: 'doctors',
            localField: 'doctor_id',
            foreignField: 'doctor_id',
            as: 'doctor'
          }
        },
        {
          $lookup: {
            from: 'services',
            localField: 'service_id',
            foreignField: '_id',
            as: 'service'
          }
        },
        {$unwind: {path: '$doctor'}},
        {$unwind: {path: '$service'}},
        {
          $lookup: {
            from: 'users',
            localField: 'doctor.doctor_id',
            foreignField: '_id',
            as: 'doctor.result'
          }
        },
        {$unwind: {path: '$doctor.result'}},
        {
          $set: {
            'doctor.name': '$doctor.result.name',
            'doctor.email': '$doctor.result.email',
            'doctor.data_of_birth': '$doctor.result.data_of_birth',
            'doctor.gender': '$doctor.result.gender',
            'doctor.address': '$doctor.result.address',
            'doctor.username': '$doctor.result.username',
            'doctor.avatar': '$doctor.result.avatar',
            'doctor.role': '$doctor.result.role',
            'doctor.phone_number': '$doctor.result.phone_number',
            'doctor.position': '$doctor.result.position'
          }
        },
        {$unset: 'doctor.result'}
      ])
      .toArray()
    return appointments
  }
}
const appointmentService = new AppointmentService()
export default appointmentService
