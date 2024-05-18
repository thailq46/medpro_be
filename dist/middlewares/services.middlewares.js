"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParamsServiceID = exports.updateServicesValidator = exports.createServicesValidator = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const checkSchema_1 = require("../constants/checkSchema");
const messages_1 = require("../constants/messages");
const database_service_1 = __importDefault(require("../services/database.service"));
const validate_1 = __importDefault(require("../utils/validate"));
exports.createServicesValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    hospital_id: {
        notEmpty: { errorMessage: messages_1.SERVICES_MESSAGE.HOSPITAL_ID_IS_REQUIRED },
        trim: true,
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.SERVICES_MESSAGE.INVALID_HOSPITAL_ID);
                }
                const isExist = await database_service_1.default.hospitals.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!isExist) {
                    throw new Error(messages_1.SERVICES_MESSAGE.HOSPITAL_NOT_FOUND);
                }
                return true;
            }
        }
    },
    specialty_id: {
        optional: { options: { nullable: true } },
        custom: {
            options: async (value) => {
                if (value === null) {
                    return true;
                }
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.SERVICES_MESSAGE.INVALID_OBJECT_ID);
                }
                const isExist = await database_service_1.default.specialties.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!isExist) {
                    throw new Error(messages_1.SERVICES_MESSAGE.SPECIALTY_NOT_FOUND);
                }
                return true;
            }
        }
    },
    name: checkSchema_1.nameCheckSchema,
    description: checkSchema_1.descriptionCheckSchema,
    note: {
        optional: { options: { nullable: true } },
        isString: { errorMessage: messages_1.SERVICES_MESSAGE.NOTE_MUST_BE_STRING },
        trim: true,
        isLength: {
            options: { max: 255 },
            errorMessage: messages_1.SERVICES_MESSAGE.NOTE_NOT_EXCEED_255
        }
    },
    price: {
        notEmpty: { errorMessage: messages_1.SERVICES_MESSAGE.PRICE_IS_REQUIRED },
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.SERVICES_MESSAGE.PRICE_MUST_BE_NUMBER);
                }
                return true;
            }
        }
    },
    session: checkSchema_1.sessionCheckSchema
}, ['body']));
exports.updateServicesValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    hospital_id: {
        optional: true,
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.SERVICES_MESSAGE.INVALID_HOSPITAL_ID);
                }
                const isExist = await database_service_1.default.hospitals.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!isExist) {
                    throw new Error(messages_1.SERVICES_MESSAGE.HOSPITAL_NOT_FOUND);
                }
                return true;
            }
        }
    },
    specialty_id: {
        optional: { options: { nullable: true } },
        custom: {
            options: async (value) => {
                if (value === null) {
                    return true;
                }
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.SERVICES_MESSAGE.INVALID_OBJECT_ID);
                }
                const isExist = await database_service_1.default.specialties.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!isExist) {
                    throw new Error(messages_1.SERVICES_MESSAGE.SPECIALTY_NOT_FOUND);
                }
                return true;
            }
        }
    },
    name: { optional: true, ...checkSchema_1.nameCheckSchema },
    description: { optional: true, ...checkSchema_1.descriptionCheckSchema },
    note: {
        optional: { options: { nullable: true } },
        isString: { errorMessage: messages_1.SERVICES_MESSAGE.NOTE_MUST_BE_STRING },
        trim: true,
        isLength: {
            options: { max: 255 },
            errorMessage: messages_1.SERVICES_MESSAGE.NOTE_NOT_EXCEED_255
        }
    },
    price: {
        optional: true,
        notEmpty: { errorMessage: messages_1.SERVICES_MESSAGE.PRICE_IS_REQUIRED },
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.SERVICES_MESSAGE.PRICE_MUST_BE_NUMBER);
                }
                return true;
            }
        }
    },
    session: { optional: true, ...checkSchema_1.sessionCheckSchema }
}, ['body']));
exports.checkParamsServiceID = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    id: {
        notEmpty: { errorMessage: messages_1.SERVICES_MESSAGE.ID_IS_REQUIRED },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.SERVICES_MESSAGE.INVALID_OBJECT_ID);
                }
                const isExist = await database_service_1.default.services.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!isExist) {
                    throw new Error(messages_1.SERVICES_MESSAGE.SERVICES_NOT_FOUND);
                }
                return true;
            }
        }
    }
}, ['params']));
