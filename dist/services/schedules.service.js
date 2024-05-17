"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const Schedule_schema_1 = __importDefault(require("../models/schemas/Schedule.schema"));
const database_service_1 = __importDefault(require("../services/database.service"));
class SchedulesService {
    async createSchedules(payload) {
        return await database_service_1.default.schedules.insertOne(new Schedule_schema_1.default({
            ...payload,
            doctor_id: new mongodb_1.ObjectId(payload.doctor_id)
        }));
    }
    async updateSchedules(id, payload) {
        return await database_service_1.default.schedules.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, [
            {
                $set: {
                    ...payload,
                    doctor_id: new mongodb_1.ObjectId(payload.doctor_id),
                    updated_at: '$$NOW'
                }
            }
        ], { returnDocument: 'after' });
    }
    async deleteSchedules(id) {
        return await database_service_1.default.schedules.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
    }
    async getSchedulesById(id) {
        return await database_service_1.default.schedules.findOne({ _id: new mongodb_1.ObjectId(id) });
    }
    async getFullSchedules() {
        return await database_service_1.default.schedules.find().toArray();
    }
}
const schedulesService = new SchedulesService();
exports.default = schedulesService;
