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

  async getFullAppointments({limit, page}: {limit: number; page: number}) {
    const [appointments, totalItems] = await Promise.all([
      databaseService.appointments
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
          {$unset: 'doctor.result'},
          {$skip: limit * (page - 1)},
          {$limit: limit}
        ])
        .toArray(),
      databaseService.appointments.countDocuments()
    ])
    return {appointments, totalItems}
  }

  async getAppointmentByDoctorId({
    doctor_id,
    limit,
    page,
    search,
    date
  }: {
    doctor_id: string
    limit: number
    page: number
    search?: string
    date?: string
  }) {
    const searchString = typeof search === 'string' ? search : ''
    const $match: any = {doctor_id: new ObjectId(doctor_id)}
    if (searchString) {
      $match.$or = [{fullname: {$regex: searchString, $options: 'i'}}]
    }
    if (date) {
      $match.date = date
    }
    const [appointments, totalItems] = await Promise.all([
      databaseService.appointments
        .aggregate([
          {$match},
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
          {$unset: 'doctor.result'},
          {$skip: limit * (page - 1)},
          {$limit: limit}
        ])
        .toArray(),
      databaseService.appointments.countDocuments($match)
    ])
    return {appointments, totalItems}
  }

  async updateStatusAppointment(id: string) {
    return await databaseService.appointments.findOneAndUpdate(
      {_id: new ObjectId(id)},
      [{$set: {status: true, updated_at: '$$NOW'}}],
      {returnDocument: 'after'}
    )
  }
}
const appointmentService = new AppointmentService()
export default appointmentService
