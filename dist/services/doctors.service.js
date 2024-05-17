"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const Doctor_schema_1 = __importDefault(require("../models/schemas/Doctor.schema"));
const database_service_1 = __importDefault(require("../services/database.service"));
class DoctorsService {
    async createDoctors(payload) {
        return await database_service_1.default.doctors.insertOne(new Doctor_schema_1.default({
            ...payload,
            doctor_id: new mongodb_1.ObjectId(payload.doctor_id),
            specialty_id: new mongodb_1.ObjectId(payload.specialty_id)
        }));
    }
    async updateDoctors(id, payload) {
        return await database_service_1.default.doctors.findOneAndUpdate({ doctor_id: new mongodb_1.ObjectId(id) }, [
            {
                $set: {
                    ...payload,
                    specialty_id: new mongodb_1.ObjectId(payload.specialty_id),
                    updated_at: '$$NOW'
                }
            }
        ], { returnDocument: 'after' });
    }
    async deleteDoctors(id) {
        return await Promise.all([
            await database_service_1.default.doctors.findOneAndDelete({ doctor_id: new mongodb_1.ObjectId(id) }),
            await database_service_1.default.users.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) })
        ]);
    }
    async getDoctorsById(id) {
        const doctor = await database_service_1.default.doctors
            .aggregate([
            { $match: { doctor_id: new mongodb_1.ObjectId(id) } },
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
            { $unwind: { path: '$specialty' } },
            {
                $lookup: {
                    from: 'hospitals',
                    localField: 'specialty.hospital_id',
                    foreignField: '_id',
                    as: 'specialty.hospital'
                }
            },
            { $unwind: { path: '$doctor' } },
            { $unwind: { path: '$specialty.hospital' } },
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
                    specialty: { hospital_id: 0 }
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
            { $unset: 'doctor' }
        ])
            .toArray();
        return doctor;
    }
    async getFullDoctors({ limit, page }) {
        const [doctors, total] = await Promise.all([
            database_service_1.default.doctors
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
                { $unwind: { path: '$specialty' } },
                {
                    $lookup: {
                        from: 'hospitals',
                        localField: 'specialty.hospital_id',
                        foreignField: '_id',
                        as: 'specialty.hospital'
                    }
                },
                { $unwind: { path: '$doctor' } },
                { $unwind: { path: '$specialty.hospital' } },
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
                        specialty: { hospital_id: 0 }
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
                { $unset: 'doctor' },
                { $skip: limit * (page - 1) },
                { $limit: limit }
            ])
                .toArray(),
            database_service_1.default.doctors.countDocuments()
        ]);
        return { doctors, total };
        // return await databaseService.doctors.find().toArray()
    }
}
const doctorsService = new DoctorsService();
exports.default = doctorsService;
