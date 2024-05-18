"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const MedicalBookingForms_schema_1 = __importDefault(require("../models/schemas/MedicalBookingForms.schema"));
const database_service_1 = __importDefault(require("../services/database.service"));
class MedicalBookingFormsService {
    async createMedicalBookingForms(payload) {
        return database_service_1.default.medicalBookingForms.insertOne(new MedicalBookingForms_schema_1.default(payload));
    }
    async updateMedicalBookingForms(id, payload) {
        return database_service_1.default.medicalBookingForms.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(id)
        }, [
            {
                $set: {
                    ...payload,
                    updated_at: '$$NOW'
                }
            }
        ], { returnDocument: 'after' });
    }
    async deleteMedicalBookingForms(id) {
        return database_service_1.default.medicalBookingForms.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
    }
    async getMedicalBookingFormsById(id) {
        return database_service_1.default.medicalBookingForms.findOne({ _id: new mongodb_1.ObjectId(id) });
    }
    async getFullMedicalBookingForms() {
        return database_service_1.default.medicalBookingForms.find({}).toArray();
    }
}
const medicalBookingFormsService = new MedicalBookingFormsService();
exports.default = medicalBookingFormsService;
