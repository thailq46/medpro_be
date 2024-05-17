"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const Specialty_schema_1 = __importDefault(require("../models/schemas/Specialty.schema"));
const database_service_1 = __importDefault(require("../services/database.service"));
class SpecialtiesService {
    async createSpecialty(payload) {
        return await database_service_1.default.specialties.insertOne(new Specialty_schema_1.default({
            ...payload,
            hospital_id: new mongodb_1.ObjectId(payload.hospital_id)
        }));
    }
    async updateSpecialty(id, payload) {
        return await database_service_1.default.specialties.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, [
            {
                $set: {
                    ...payload,
                    hospital_id: new mongodb_1.ObjectId(payload.hospital_id),
                    updated_at: '$$NOW'
                }
            }
        ], { returnDocument: 'after' });
    }
    async deleteSpecialty(id) {
        return await database_service_1.default.specialties.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
    }
    async getSpecialtyById(id) {
        const specialty = await database_service_1.default.specialties
            .aggregate([
            { $match: { _id: new mongodb_1.ObjectId(id) } },
            {
                $lookup: {
                    from: 'hospitals',
                    localField: 'hospital_id',
                    foreignField: '_id',
                    as: 'hospital'
                }
            },
            { $unwind: { path: '$hospital' } },
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
                    hospital: { categoryId: 0 }
                }
            },
            { $unwind: { path: '$hospital.category' } }
        ])
            .toArray();
        // eslint-disable-next-line no-extra-boolean-cast
        return !!specialty.length ? specialty[0] : null;
    }
    async getFullSpecialties({ limit, page }) {
        const [specialties, totalItems] = await Promise.all([
            database_service_1.default.specialties
                .aggregate([
                {
                    $lookup: {
                        from: 'hospitals',
                        localField: 'hospital_id',
                        foreignField: '_id',
                        as: 'hospital'
                    }
                },
                { $unwind: { path: '$hospital' } },
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
                        hospital: { categoryId: 0 }
                    }
                },
                { $unwind: { path: '$hospital.category' } },
                { $skip: limit * (page - 1) },
                { $limit: limit }
            ])
                .toArray(),
            database_service_1.default.specialties.countDocuments()
        ]);
        return { specialties, totalItems };
    }
}
const specialtiesService = new SpecialtiesService();
exports.default = specialtiesService;
