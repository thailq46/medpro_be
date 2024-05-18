"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedicalBookingFormsValidator = exports.updateMedicalBookingFormsValidator = exports.createMedicalBookingFormsValidator = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = __importDefault(require("../utils/validate"));
const messages_1 = require("../constants/messages");
const database_service_1 = __importDefault(require("../services/database.service"));
const mongodb_1 = require("mongodb");
const checkSchema_1 = require("../constants/checkSchema");
const nameCheckSchema = {
    notEmpty: { errorMessage: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.NAME_IS_REQUIRED },
    isString: { errorMessage: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.NAME_MUST_BE_STRING },
    isLength: { options: { max: 255 }, errorMessage: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.NAME_NOT_EXCEED_255 },
    trim: true
};
const imageCheckSchema = {
    optional: { options: { nullable: true } },
    isString: { errorMessage: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.IMAGE_MUST_BE_STRING },
    isLength: { options: { min: 1, max: 500 }, errorMessage: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.IMAGE_URL_LENGTH },
    trim: true
};
exports.createMedicalBookingFormsValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    name: {
        ...nameCheckSchema,
        custom: {
            options: async (value) => {
                const isExist = await database_service_1.default.medicalBookingForms.findOne({ name: value });
                if (isExist) {
                    throw new Error(messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.NAME_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    slug: {
        ...checkSchema_1.slugCheckSchema,
        custom: {
            options: async (value) => {
                const isExist = await database_service_1.default.medicalBookingForms.findOne({ slug: value });
                if (isExist) {
                    throw new Error(messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.SLUG_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    image: imageCheckSchema
}, ['body']));
exports.updateMedicalBookingFormsValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    name: {
        optional: true,
        ...nameCheckSchema,
        custom: {
            options: async (value) => {
                const isExist = await database_service_1.default.medicalBookingForms.findOne({
                    $and: [{ name: value }, { name: { $ne: value } }]
                });
                if (isExist) {
                    throw new Error(messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.NAME_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    slug: {
        optional: true,
        ...checkSchema_1.slugCheckSchema,
        custom: {
            options: async (value, { req }) => {
                const Id = req.params?.id;
                const isExist = await database_service_1.default.medicalBookingForms.findOne({
                    slug: value,
                    _id: { $ne: new mongodb_1.ObjectId(Id) }
                });
                if (isExist) {
                    throw new Error(messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.SLUG_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    image: imageCheckSchema
}, ['body']));
exports.deleteMedicalBookingFormsValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    id: {
        notEmpty: { errorMessage: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.NOT_FOUND },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.INVALID_ID);
                }
                const isExist = await database_service_1.default.medicalBookingForms.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!isExist) {
                    throw new Error(messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.NOT_FOUND);
                }
                return true;
            }
        }
    }
}, ['params']));
