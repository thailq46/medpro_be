import {ObjectId} from 'mongodb'
import {CreateServicesReqBody, UpdateServicesReqBody} from '~/models/request/Service.request'
import Service from '~/models/schemas/Service.schema'
import databaseService from '~/services/database.service'

class ServicesService {
  async createServices(payload: CreateServicesReqBody) {
    return await databaseService.services.insertOne(
      new Service({
        ...payload,
        hospital_id: new ObjectId(payload.hospital_id),
        specialty_id: payload.specialty_id ? new ObjectId(payload.specialty_id) : null
      })
    )
  }

  async updateServices(id: string, payload: UpdateServicesReqBody) {
    return await databaseService.services.findOneAndUpdate(
      {_id: new ObjectId(id)},
      [
        {
          $set: {
            ...payload,
            hospital_id: new ObjectId(payload.hospital_id),
            specialty_id: payload.specialty_id ? new ObjectId(payload.specialty_id) : null,
            updated_at: '$$NOW'
          }
        }
      ],
      {returnDocument: 'after'}
    )
  }

  async deleteServices(id: string) {
    return await databaseService.services.findOneAndDelete({_id: new ObjectId(id)})
  }

  async getFullServices({
    limit,
    page,
    search,
    hospital,
    specialty
  }: {
    limit: number
    page: number
    search?: string
    hospital?: string
    specialty?: string
  }) {
    const searchString = typeof search === 'string' ? search : ''
    const $match: any = {
      $or: [{name: {$regex: searchString, $options: 'i'}}]
    }
    if (hospital && ObjectId.isValid(hospital)) {
      $match['hospital_id'] = new ObjectId(hospital)
    }
    if ((specialty && ObjectId.isValid(specialty)) || (specialty && specialty === 'null')) {
      if (specialty === 'null') $match['specialty_id'] = null
      else $match['specialty_id'] = new ObjectId(specialty)
    }
    const [services, totalItems] = await Promise.all([
      databaseService.services
        .aggregate([
          {$match},
          {
            $lookup: {
              from: 'hospitals',
              localField: 'hospital_id',
              foreignField: '_id',
              as: 'hospital'
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
          {$unwind: {path: '$hospital'}},
          {$project: {hospital_id: 0, specialty_id: 0}},
          {$skip: (page - 1) * limit},
          {$limit: limit}
        ])
        .toArray()
        .then((data) => {
          if (!data) return null
          data.forEach((service) => {
            service.specialty.length > 0 ? (service.specialty = service.specialty[0]) : (service.specialty = null)
          })
          return data
        }),
      databaseService.services.countDocuments($match)
    ])
    return {services, totalItems}
  }

  async getServicesById(id: string) {
    const service = await databaseService.services
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
        {
          $lookup: {
            from: 'specialties',
            localField: 'specialty_id',
            foreignField: '_id',
            as: 'specialty'
          }
        },
        {$unwind: {path: '$hospital'}},
        {$project: {hospital_id: 0, specialty_id: 0}}
      ])
      .toArray()
      .then((data) => {
        if (!data) return null
        data.forEach((service) => {
          service.specialty.length > 0 ? (service.specialty = service.specialty[0]) : (service.specialty = null)
        })
        return data
      })
    // eslint-disable-next-line no-extra-boolean-cast
    return !!service?.length ? service[0] : null
  }
  async getFullServicesByHospitalId(hospital_id: string) {
    const service = await databaseService.services
      .aggregate([
        {$match: {hospital_id: new ObjectId(hospital_id)}},
        {
          $lookup: {
            from: 'hospitals',
            localField: 'hospital_id',
            foreignField: '_id',
            as: 'hospital'
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
        {$unwind: {path: '$hospital'}},
        {$project: {hospital_id: 0, specialty_id: 0}}
      ])
      .toArray()
      .then((data) => {
        if (!data) return null
        data.forEach((service) => {
          service.specialty.length > 0 ? (service.specialty = service.specialty[0]) : (service.specialty = null)
        })
        return data
      })
    return service
  }
}

const servicesService = new ServicesService()
export default servicesService
