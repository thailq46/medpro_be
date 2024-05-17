"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const enum_1 = require("../constants/enum");
const Hospital_schema_1 = __importDefault(require("../models/schemas/Hospital.schema"));
const database_service_1 = __importDefault(require("../services/database.service"));
const common_1 = require("../utils/common");
class HospitalsService {
    async createHospital(payload) {
        return await database_service_1.default.hospitals.insertOne(new Hospital_schema_1.default({
            ...payload,
            categoryId: new mongodb_1.ObjectId(payload.categoryId),
            booking_forms: payload.booking_forms.map((type) => new mongodb_1.ObjectId(type))
        }));
    }
    async getFullHospitals({ limit, page }) {
        const [hospitals, totalItems] = await Promise.all([
            database_service_1.default.hospitals
                .aggregate([
                { $match: { types: { $in: (0, common_1.numberEnumToArray)(enum_1.HospitalsType) } } },
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
                                    name: '$$item.name',
                                    image: '$$item.image'
                                }
                            }
                        }
                    }
                },
                { $unwind: { path: '$category' } },
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
                { $skip: limit * (page - 1) },
                { $limit: limit }
            ])
                .toArray(),
            database_service_1.default.hospitals.countDocuments()
        ]);
        return { hospitals, totalItems };
    }
    async updateHospital(id, payload) {
        return await database_service_1.default.hospitals.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, [
            {
                $set: {
                    ...payload,
                    categoryId: new mongodb_1.ObjectId(payload.categoryId),
                    booking_forms: payload.booking_forms?.map((type) => new mongodb_1.ObjectId(type)),
                    updated_at: '$$NOW'
                }
            }
        ], { returnDocument: 'after' });
    }
    async deleteHospital(id) {
        return await database_service_1.default.hospitals.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
    }
    async getHospitalsById(id) {
        const hospital = await database_service_1.default.hospitals
            .aggregate([
            { $match: { _id: new mongodb_1.ObjectId(id) } },
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
                                name: '$$item.name',
                                image: '$$item.image'
                            }
                        }
                    }
                }
            },
            { $unwind: { path: '$category' } },
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
            .toArray();
        // eslint-disable-next-line no-extra-boolean-cast
        return !!hospital.length ? hospital[0] : null;
    }
}
const hospitalsService = new HospitalsService();
exports.default = hospitalsService;
