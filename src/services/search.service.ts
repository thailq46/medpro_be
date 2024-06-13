import databaseService from '~/services/database.service'

class SearchService {
  async search({limit, search_key, category}: {limit: number; search_key?: string; category?: string}) {
    const searchString = typeof search_key === 'string' ? search_key : ''
    const $match: any = {}
    if (searchString) {
      $match.$or = [{name: {$regex: searchString, $options: 'i'}}]
    }
    const [hospital, doctor] = await Promise.all([
      databaseService.hospitals.aggregate([{$match}, {$addFields: {type: 'hospital'}}, {$limit: limit}]).toArray(),
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
          {$addFields: {type: 'doctor'}},
          {$match},
          {$limit: limit}
        ])
        .toArray()
    ])
    return {
      category,
      categoryName: 'Tất cả',
      search_key,
      hospital,
      doctor
    }
  }
}

const searchService = new SearchService()
export default searchService
