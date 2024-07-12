import {ObjectId} from 'mongodb'
import {CreateHospitalsReqBody, UpdateHospitalsReqBody} from '~/models/request/Hospital.request'
import Hospital from '~/models/schemas/Hospital.schema'
import databaseService from '~/services/database.service'

class HospitalsService {
  async createHospital(payload: CreateHospitalsReqBody) {
    const imagesUrl = payload?.images !== null ? payload?.images?.filter((url) => typeof url === 'string') : null
    return await databaseService.hospitals.insertOne(
      new Hospital({
        ...payload,
        categoryId: new ObjectId(payload.categoryId),
        booking_forms: payload.booking_forms.map((type) => new ObjectId(type)),
        images: imagesUrl
      })
    )
  }

  async getFullHospitals({limit, page, search, types}: {limit: number; page: number; search?: string; types?: number}) {
    const searchString = typeof search === 'string' ? search : ''
    const $match: any = {}
    if (types || (types && types === 0)) {
      $match.types = {$in: [types]}
    }
    if (searchString) {
      $match.$or = [{name: {$regex: searchString, $options: 'i'}}]
    }
    const [hospitals, totalItems] = await Promise.all([
      databaseService.hospitals
        .aggregate([
          {$match},
          {
            $lookup: {
              from: 'categories',
              localField: 'categoryId',
              foreignField: '_id',
              as: 'category'
            }
          },
          {
            $lookup: {
              from: 'medical_booking_forms',
              localField: 'booking_forms',
              foreignField: '_id',
              as: 'booking_forms'
            }
          },
          {
            $addFields: {
              booking_forms: {
                $map: {
                  input: '$booking_forms',
                  as: 'item',
                  in: {
                    _id: '$$item._id',
                    name: '$$item.name',
                    image: '$$item.image'
                  }
                }
              }
            }
          },
          {$unwind: {path: '$category'}},
          {
            $project: {
              categoryId: 0
              // category: {
              //   _id: 0,
              //   created_at: 0,
              //   updated_at: 0
              // }
            }
          },
          {$skip: limit * (page - 1)},
          {$limit: limit}
        ])
        .toArray(),
      databaseService.hospitals.countDocuments($match)
    ])
    return {hospitals, totalItems}
  }

  async updateHospital(id: string, payload: UpdateHospitalsReqBody) {
    const imagesUrl = payload?.images !== null ? payload?.images?.filter((url) => typeof url === 'string') : null
    return await databaseService.hospitals.findOneAndUpdate(
      {_id: new ObjectId(id)},
      [
        {
          $set: {
            ...payload,
            categoryId: new ObjectId(payload.categoryId),
            booking_forms: payload.booking_forms?.map((type) => new ObjectId(type)),
            images: imagesUrl,
            updated_at: '$$NOW'
          }
        }
      ],
      {returnDocument: 'after'}
    )
  }

  async deleteHospital(id: string) {
    return await databaseService.hospitals.findOneAndDelete({_id: new ObjectId(id)})
  }

  async getHospitalsById(id: string) {
    const hospital = await databaseService.hospitals
      .aggregate([
        {$match: {_id: new ObjectId(id)}},
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $lookup: {
            from: 'medical_booking_forms',
            localField: 'booking_forms',
            foreignField: '_id',
            as: 'booking_forms'
          }
        },
        {
          $addFields: {
            booking_forms: {
              $map: {
                input: '$booking_forms',
                as: 'item',
                in: {
                  id: '$$item._id',
                  name: '$$item.name',
                  image: '$$item.image'
                }
              }
            }
          }
        },
        {$unwind: {path: '$category'}},
        {
          $project: {
            categoryId: 0
            // category: {
            //   _id: 0,
            //   created_at: 0,
            //   updated_at: 0
            // }
          }
        }
      ])
      .toArray()
    // eslint-disable-next-line no-extra-boolean-cast
    return !!hospital.length ? hospital[0] : null
  }

  async getHospitalsBySlug(slug: string) {
    const hospital = await databaseService.hospitals
      .aggregate([
        {$match: {slug}},
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $lookup: {
            from: 'medical_booking_forms',
            localField: 'booking_forms',
            foreignField: '_id',
            as: 'booking_forms'
          }
        },
        {
          $addFields: {
            booking_forms: {
              $map: {
                input: '$booking_forms',
                as: 'item',
                in: {
                  id: '$$item._id',
                  name: '$$item.name',
                  image: '$$item.image'
                }
              }
            }
          }
        },
        {$unwind: {path: '$category'}},
        {$project: {categoryId: 0}}
      ])
      .toArray()
    // eslint-disable-next-line no-extra-boolean-cast
    return !!hospital.length ? hospital[0] : null
  }
}

const hospitalsService = new HospitalsService()
export default hospitalsService
