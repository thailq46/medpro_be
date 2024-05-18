"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const Service_schema_1 = __importDefault(require("../models/schemas/Service.schema"));
const database_service_1 = __importDefault(require("../services/database.service"));
class ServicesService {
    async createServices(payload) {
        return await database_service_1.default.services.insertOne(new Service_schema_1.default({
            ...payload,
            hospital_id: new mongodb_1.ObjectId(payload.hospital_id),
            specialty_id: payload.specialty_id ? new mongodb_1.ObjectId(payload.specialty_id) : null
        }));
    }
    async updateServices(id, payload) {
        return await database_service_1.default.services.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, [
            {
                $set: {
                    ...payload,
                    hospital_id: new mongodb_1.ObjectId(payload.hospital_id),
                    specialty_id: payload.specialty_id ? new mongodb_1.ObjectId(payload.specialty_id) : null,
                    updated_at: '$$NOW'
                }
            }
        ], { returnDocument: 'after' });
    }
    async deleteServices(id) {
        return await database_service_1.default.services.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
    }
    async getFullServices({ limit, page }) {
        const [services, totalItems] = await Promise.all([
            database_service_1.default.services
                .aggregate([
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
                { $unwind: { path: '$hospital' } },
                { $project: { hospital_id: 0, specialty_id: 0 } },
                { $skip: (page - 1) * limit },
                { $limit: limit }
            ])
                .toArray()
                .then((data) => {
                if (!data)
                    return null;
                data.forEach((service) => {
                    service.specialty.length > 0 ? (service.specialty = service.specialty[0]) : (service.specialty = null);
                });
                return data;
            }),
            database_service_1.default.services.countDocuments()
        ]);
        return { services, totalItems };
    }
    async getServicesById(id) {
        const service = await database_service_1.default.services
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
            {
                $lookup: {
                    from: 'specialties',
                    localField: 'specialty_id',
                    foreignField: '_id',
                    as: 'specialty'
                }
            },
            { $unwind: { path: '$hospital' } },
            { $project: { hospital_id: 0, specialty_id: 0 } }
        ])
            .toArray()
            .then((data) => {
            if (!data)
                return null;
            data.forEach((service) => {
                service.specialty.length > 0 ? (service.specialty = service.specialty[0]) : (service.specialty = null);
            });
            return data;
        });
        // eslint-disable-next-line no-extra-boolean-cast
        return !!service?.length ? service[0] : null;
    }
}
const servicesService = new ServicesService();
exports.default = servicesService;
