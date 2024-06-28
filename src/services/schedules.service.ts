import {ObjectId} from 'mongodb'
import {CreateSchedulesReqBody, UpdateSchedulesReqBody} from '~/models/request/Schedule.request'
import Schedule from '~/models/schemas/Schedule.schema'
import databaseService from '~/services/database.service'
import {isValidDateFormat} from '~/utils/common'

class SchedulesService {
  async createSchedules(payload: CreateSchedulesReqBody) {
    return await databaseService.schedules.insertOne(
      new Schedule({
        ...payload,
        doctor_id: new ObjectId(payload.doctor_id)
      })
    )
  }

  async updateSchedules(id: string, payload: UpdateSchedulesReqBody) {
    return await databaseService.schedules.findOneAndUpdate(
      {_id: new ObjectId(id)},
      [
        {
          $set: {
            ...payload,
            doctor_id: new ObjectId(payload.doctor_id),
            updated_at: '$$NOW'
          }
        }
      ],
      {returnDocument: 'after'}
    )
  }

  async deleteSchedules(id: string) {
    return await databaseService.schedules.findOneAndDelete({_id: new ObjectId(id)})
  }

  async getSchedulesById(id: string) {
    return await databaseService.schedules.findOne({_id: new ObjectId(id)})
  }

  async getFullSchedules({limit, page, doctor, date}: {limit: number; page: number; doctor?: string; date?: string}) {
    const $match: any = {}
    if (doctor && ObjectId.isValid(doctor)) {
      $match['doctor_id'] = new ObjectId(doctor)
    }
    if (date && isValidDateFormat(date)) {
      $match['date'] = date
    }
    const [schedules, totalItems] = await Promise.all([
      databaseService.schedules
        .aggregate([{$match}, {$skip: limit * (page - 1)}, {$limit: limit}])
        .sort({created_at: -1})
        .toArray(),
      databaseService.schedules.countDocuments($match)
    ])
    return {schedules, totalItems}
  }

  async getFullSchedulesByDoctorId({
    doctor_id,
    limit,
    page,
    date
  }: {
    doctor_id: string
    limit: number
    page: number
    date?: string
  }) {
    const $match: any = {}
    if (doctor_id && ObjectId.isValid(doctor_id)) {
      $match['doctor_id'] = new ObjectId(doctor_id)
    }
    if (date && isValidDateFormat(date)) {
      $match['date'] = date
    }
    const [schedules, totalItems] = await Promise.all([
      databaseService.schedules
        .aggregate([
          {
            $match
          },
          {$skip: limit * (page - 1)},
          {$limit: limit}
        ])
        .toArray(),
      databaseService.schedules.countDocuments({doctor_id: new ObjectId(doctor_id)})
    ])
    return {schedules, totalItems}
  }
}

const schedulesService = new SchedulesService()
export default schedulesService
