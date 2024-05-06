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
    const doctor = await databaseService.doctors
      .aggregate([
        {$match: {doctor_id: new ObjectId(id)}},
        {
          $lookup: {
            from: 'users',
            localField: 'doctor_id',
            foreignField: '_id',
            as: 'doctor'
          }
        },
        {
          $lookup: {
            from: 'specialties',
            localField: 'specialty_id',
            foreignField: '_id',
            as: 'specialty'
          }
        },
        {$unwind: {path: '$specialty'}},
        {
          $lookup: {
            from: 'hospitals',
            localField: 'specialty.hospital_id',
            foreignField: '_id',
            as: 'specialty.hospital'
          }
        },
        {$unwind: {path: '$doctor'}},
        {$unwind: {path: '$specialty.hospital'}},
        {
          $project: {
            specialty_id: 0,
            doctor: {
              _id: 0,
              password: 0,
              forgot_password_token: 0,
              email_verify_token: 0,
              created_at: 0,
              updated_at: 0,
              verify: 0
            },
            specialty: {hospital_id: 0}
          }
        },
        {
          $set: {
            name: '$doctor.name',
            email: '$doctor.email',
            date_of_birth: '$doctor.date_of_birth',
            gender: '$doctor.gender',
            address: '$doctor.address',
            username: '$doctor.username',
            avatar: '$doctor.avatar',
            role: '$doctor.role',
            phone_number: '$doctor.phone_number',
            position: '$doctor.position'
          }
        },
        {$unset: 'doctor'}
      ])
      .toArray()
    return doctor
  }

  async getFullDoctors({limit, page}: {limit: number; page: number}) {
    const [doctors, total] = await Promise.all([
      databaseService.doctors
        .aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'doctor_id',
              foreignField: '_id',
              as: 'doctor'
            }
          },
          {
            $lookup: {
              from: 'specialties',
              localField: 'specialty_id',
              foreignField: '_id',
              as: 'specialty'
            }
          },
          {$unwind: {path: '$specialty'}},
          {
            $lookup: {
              from: 'hospitals',
              localField: 'specialty.hospital_id',
              foreignField: '_id',
              as: 'specialty.hospital'
            }
          },
          {$unwind: {path: '$doctor'}},
          {$unwind: {path: '$specialty.hospital'}},
          {
            $project: {
              specialty_id: 0,
              doctor: {
                _id: 0,
                password: 0,
                forgot_password_token: 0,
                email_verify_token: 0,
                created_at: 0,
                updated_at: 0,
                verify: 0
              },
              specialty: {hospital_id: 0}
            }
          },
          {
            $set: {
              name: '$doctor.name',
              email: '$doctor.email',
              date_of_birth: '$doctor.date_of_birth',
              gender: '$doctor.gender',
              address: '$doctor.address',
              username: '$doctor.username',
              avatar: '$doctor.avatar',
              role: '$doctor.role',
              phone_number: '$doctor.phone_number',
              position: '$doctor.position'
            }
          },
          {$unset: 'doctor'},
          {$skip: limit * (page - 1)},
          {$limit: limit}
        ])
        .toArray(),
      databaseService.doctors.countDocuments()
    ])
    return {doctors, total}
    // return await databaseService.doctors.find().toArray()
  }
}

const doctorsService = new DoctorsService()
export default doctorsService
