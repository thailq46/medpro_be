import {ObjectId} from 'mongodb'
import {CreateSchedulesReqBody, UpdateSchedulesReqBody} from '~/models/request/Schedule.request'
import Schedule from '~/models/schemas/Schedule.schema'
import databaseService from '~/services/database.service'

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
  async getFullSchedules() {
    return await databaseService.schedules.find().toArray()
  }
}

const schedulesService = new SchedulesService()
export default schedulesService
