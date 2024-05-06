import {ObjectId} from 'mongodb'
import {Pagination} from '~/models/request/Common.request'
import {CreateSpecialtiesReqBody, UpdateSpecialtiesReqBody} from '~/models/request/Specialty.request'
import Specialty from '~/models/schemas/Specialty.schema'
import databaseService from '~/services/database.service'

class SpecialtiesService {
  async createSpecialty(payload: CreateSpecialtiesReqBody) {
    return await databaseService.specialties.insertOne(
      new Specialty({
        ...payload,
        hospital_id: new ObjectId(payload.hospital_id)
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
            hospital_id: new ObjectId(payload.hospital_id),
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
    const specialty = await databaseService.specialties
      .aggregate([
        {$match: {_id: new ObjectId(id)}},
        {
          $lookup: {
            from: 'hospitals',
            localField: 'hospital_id',
            foreignField: '_id',
            as: 'hospital'
          }
        },
        {$unwind: {path: '$hospital'}},
        {
          $lookup: {
            from: 'categories',
            localField: 'hospital.categoryId',
            foreignField: '_id',
            as: 'hospital.category'
          }
        },
        {
          $lookup: {
            from: 'medical_booking_forms',
            localField: 'hospital.booking_forms',
            foreignField: '_id',
            as: 'hospital.booking_forms'
          }
        },
        {
          $addFields: {
            'hospital.booking_forms': {
              $map: {
                input: '$hospital.booking_forms',
                as: 'item',
                in: {
                  name: '$$item.name',
                  image: '$$item.image'
                }
              }
            }
          }
        },
        {
          $project: {
            hospital_id: 0,
            hospital: {categoryId: 0}
          }
        },
        {$unwind: {path: '$hospital.category'}}
      ])
      .toArray()

    // eslint-disable-next-line no-extra-boolean-cast
    return !!specialty.length ? specialty[0] : null
  }

  async getFullSpecialties({limit, page}: Pagination) {
    const [specialties, totalItems] = await Promise.all([
      databaseService.specialties
        .aggregate([
          {
            $lookup: {
              from: 'hospitals',
              localField: 'hospital_id',
              foreignField: '_id',
              as: 'hospital'
            }
          },
          {$unwind: {path: '$hospital'}},
          {
            $lookup: {
              from: 'categories',
              localField: 'hospital.categoryId',
              foreignField: '_id',
              as: 'hospital.category'
            }
          },
          {
            $lookup: {
              from: 'medical_booking_forms',
              localField: 'hospital.booking_forms',
              foreignField: '_id',
              as: 'hospital.booking_forms'
            }
          },
          {
            $addFields: {
              'hospital.booking_forms': {
                $map: {
                  input: '$hospital.booking_forms',
                  as: 'item',
                  in: {
                    name: '$$item.name',
                    image: '$$item.image'
                  }
                }
              }
            }
          },
          {
            $project: {
              hospital_id: 0,
              hospital: {categoryId: 0}
            }
          },
          {$unwind: {path: '$hospital.category'}},
          {$skip: limit * (page - 1)},
          {$limit: limit}
        ])
        .toArray(),
      databaseService.specialties.countDocuments()
    ])
    return {specialties, totalItems}
  }
}

const specialtiesService = new SpecialtiesService()
export default specialtiesService
