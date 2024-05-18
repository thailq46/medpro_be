"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParamsSpecialtyID = exports.updateSpecialtiesValidator = exports.createSpecialtiesValidator = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const checkSchema_1 = require("../constants/checkSchema");
const messages_1 = require("../constants/messages");
const database_service_1 = __importDefault(require("../services/database.service"));
const validate_1 = __importDefault(require("../utils/validate"));
exports.createSpecialtiesValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    name: checkSchema_1.nameCheckSchema,
    slug: checkSchema_1.slugCheckSchema,
    description: checkSchema_1.descriptionCheckSchema,
    hospital_id: {
        notEmpty: { errorMessage: messages_1.SPECIALTIES_MESSAGE.HOSPITAL_ID_IS_REQUIRED },
        isString: { errorMessage: messages_1.SPECIALTIES_MESSAGE.HOSPITAL_ID_MUST_BE_STRING },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.SPECIALTIES_MESSAGE.INVALID_HOSPITAL_ID);
                }
                const isExist = await database_service_1.default.hospitals.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!isExist) {
                    throw new Error(messages_1.SPECIALTIES_MESSAGE.HOSPITAL_NOT_FOUND);
                }
                return true;
            }
        }
    }
}, ['body']));
exports.updateSpecialtiesValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    name: { optional: true, ...checkSchema_1.nameCheckSchema },
    slug: { optional: true, ...checkSchema_1.slugCheckSchema },
    description: { optional: true, ...checkSchema_1.descriptionCheckSchema },
    hospital_id: {
        optional: true,
        notEmpty: { errorMessage: messages_1.SPECIALTIES_MESSAGE.HOSPITAL_ID_IS_REQUIRED },
        isString: { errorMessage: messages_1.SPECIALTIES_MESSAGE.HOSPITAL_ID_MUST_BE_STRING },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.SPECIALTIES_MESSAGE.INVALID_HOSPITAL_ID);
                }
                const isExist = await database_service_1.default.hospitals.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!isExist) {
                    throw new Error(messages_1.SPECIALTIES_MESSAGE.HOSPITAL_NOT_FOUND);
                }
                return true;
            }
        }
    }
}, ['body']));
exports.checkParamsSpecialtyID = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    id: {
        notEmpty: { errorMessage: messages_1.SPECIALTIES_MESSAGE.ID_IS_REQUIRED },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.SPECIALTIES_MESSAGE.INVALID_OBJECT_ID);
                }
                const isExist = await database_service_1.default.specialties.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!isExist) {
                    throw new Error(messages_1.SPECIALTIES_MESSAGE.SPECIALTIES_NOT_FOUND);
                }
                return true;
            }
        }
    }
}, ['params']));
