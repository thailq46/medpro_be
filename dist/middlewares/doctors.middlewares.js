"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParamsDoctorsID = exports.updateDoctorsValidator = exports.createDoctorsValidator = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const checkSchema_1 = require("../constants/checkSchema");
const enum_1 = require("../constants/enum");
const messages_1 = require("../constants/messages");
const database_service_1 = __importDefault(require("../services/database.service"));
const validate_1 = __importDefault(require("../utils/validate"));
exports.createDoctorsValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    doctor_id: {
        notEmpty: { errorMessage: messages_1.DOCTORS_MESSAGE.DOCTOR_ID_IS_REQUIRED },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.DOCTORS_MESSAGE.INVALID_OBJECT_ID);
                }
                const doctors = await database_service_1.default.users.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!doctors) {
                    throw new Error(messages_1.DOCTORS_MESSAGE.DOCTOR_NOT_FOUND);
                }
                if (doctors?.role !== enum_1.RoleType.Doctor) {
                    throw new Error(messages_1.DOCTORS_MESSAGE.YOU_ARE_NOT_A_DOCTOR);
                }
                return true;
            }
        }
    },
    specialty_id: {
        notEmpty: { errorMessage: messages_1.DOCTORS_MESSAGE.SPECIALTY_ID_IS_REQUIRED },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.DOCTORS_MESSAGE.INVALID_OBJECT_ID);
                }
                const specialty = await database_service_1.default.specialties.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!specialty) {
                    throw new Error(messages_1.DOCTORS_MESSAGE.SPECIALTY_NOT_FOUND);
                }
                return true;
            }
        }
    },
    description: checkSchema_1.descriptionCheckSchema,
    therapy: {
        notEmpty: { errorMessage: messages_1.DOCTORS_MESSAGE.THERAPY_IS_REQUIRED },
        isString: { errorMessage: messages_1.DOCTORS_MESSAGE.THERAPY_MUST_BE_STRING },
        isLength: { options: { max: 255 }, errorMessage: messages_1.DOCTORS_MESSAGE.THERAPY_NOT_EXCEED_255 },
        trim: true
    },
    session: checkSchema_1.sessionCheckSchema,
    price: {
        notEmpty: { errorMessage: messages_1.DOCTORS_MESSAGE.PRICE_IS_REQUIRED },
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.DOCTORS_MESSAGE.PRICE_MUST_BE_NUMBER);
                }
                return true;
            }
        }
    }
}, ['body']));
exports.updateDoctorsValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    specialty_id: {
        optional: true,
        notEmpty: { errorMessage: messages_1.DOCTORS_MESSAGE.SPECIALTY_ID_IS_REQUIRED },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.DOCTORS_MESSAGE.INVALID_OBJECT_ID);
                }
                const specialty = await database_service_1.default.specialties.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!specialty) {
                    throw new Error(messages_1.DOCTORS_MESSAGE.SPECIALTY_NOT_FOUND);
                }
                return true;
            }
        }
    },
    description: { optional: true, ...checkSchema_1.descriptionCheckSchema },
    therapy: {
        optional: true,
        notEmpty: { errorMessage: messages_1.DOCTORS_MESSAGE.THERAPY_IS_REQUIRED },
        isString: { errorMessage: messages_1.DOCTORS_MESSAGE.THERAPY_MUST_BE_STRING },
        isLength: { options: { max: 255 }, errorMessage: messages_1.DOCTORS_MESSAGE.THERAPY_NOT_EXCEED_255 },
        trim: true
    },
    session: { optional: true, ...checkSchema_1.sessionCheckSchema },
    price: {
        optional: true,
        notEmpty: { errorMessage: messages_1.DOCTORS_MESSAGE.PRICE_IS_REQUIRED },
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.DOCTORS_MESSAGE.PRICE_MUST_BE_NUMBER);
                }
                return true;
            }
        }
    }
}, ['body']));
exports.checkParamsDoctorsID = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    doctor_id: {
        notEmpty: { errorMessage: messages_1.DOCTORS_MESSAGE.ID_IS_REQUIRED },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.DOCTORS_MESSAGE.INVALID_OBJECT_ID);
                }
                const doctors = await database_service_1.default.doctors.findOne({ doctor_id: new mongodb_1.ObjectId(value) });
                if (!doctors) {
                    throw new Error(messages_1.DOCTORS_MESSAGE.DOCTOR_NOT_FOUND);
                }
                return true;
            }
        }
    }
}, ['params']));
