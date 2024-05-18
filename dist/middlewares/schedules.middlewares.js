"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParamsScheduleId = exports.updateSchedulesValidator = exports.createSchedulesValidator = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const enum_1 = require("../constants/enum");
const messages_1 = require("../constants/messages");
const database_service_1 = __importDefault(require("../services/database.service"));
const validate_1 = __importDefault(require("../utils/validate"));
exports.createSchedulesValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    doctor_id: {
        notEmpty: { errorMessage: messages_1.SCHEDULES_MESSAGE.DOCTOR_ID_IS_REQUIRED },
        isString: { errorMessage: messages_1.SCHEDULES_MESSAGE.DOCTOR_ID_MUST_BE_A_STRING },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.INVALID_OBJECT_ID);
                }
                const doctor = await database_service_1.default.doctors.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!doctor) {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.DOCTOR_NOT_FOUND);
                }
                return true;
            }
        }
    },
    max_number: {
        notEmpty: { errorMessage: messages_1.SCHEDULES_MESSAGE.MAX_NUMBER_IS_REQUIRED },
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.MAX_NUMBER_MUST_BE_A_NUMBER);
                }
                if (value > 100) {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.MAX_NUMBER_MUST_BE_LESS_THAN_100);
                }
                return true;
            }
        }
    },
    date: {
        notEmpty: { errorMessage: messages_1.SCHEDULES_MESSAGE.DATE_IS_REQUIRED },
        isString: { errorMessage: messages_1.SCHEDULES_MESSAGE.DATE_MUST_BE_A_STRING },
        isLength: { options: { max: 10 }, errorMessage: messages_1.SCHEDULES_MESSAGE.DATE_MUST_BE_LESS_THAN_10_CHARACTERS },
        trim: true
    },
    current_number: {
        optional: true,
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.CURRENT_NUMBER_MUST_BE_A_NUMBER);
                }
                if (value > 100) {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.CURRENT_NUMBER_MUST_BE_LESS_THAN_100);
                }
                return true;
            }
        }
    },
    time_type: {
        notEmpty: { errorMessage: messages_1.SCHEDULES_MESSAGE.TIME_TYPE_IS_REQUIRED },
        isArray: { errorMessage: messages_1.SCHEDULES_MESSAGE.TIME_TYPE_MUST_BE_AN_ARRAY },
        isIn: {
            options: [
                [
                    enum_1.TimeScheduleType.T1,
                    enum_1.TimeScheduleType.T2,
                    enum_1.TimeScheduleType.T3,
                    enum_1.TimeScheduleType.T4,
                    enum_1.TimeScheduleType.T5,
                    enum_1.TimeScheduleType.T6,
                    enum_1.TimeScheduleType.T7
                ]
            ],
            errorMessage: messages_1.SCHEDULES_MESSAGE.TIME_TYPE_MUST_BE_IN_THE_RANGE
        },
        custom: {
            options: (value) => {
                if (value.length === 0) {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.TIME_TYPE_MUST_NOT_BE_EMPTY);
                }
                return true;
            }
        }
    }
}, ['body']));
exports.updateSchedulesValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    doctor_id: {
        optional: true,
        notEmpty: { errorMessage: messages_1.SCHEDULES_MESSAGE.DOCTOR_ID_IS_REQUIRED },
        isString: { errorMessage: messages_1.SCHEDULES_MESSAGE.DOCTOR_ID_MUST_BE_A_STRING },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.INVALID_OBJECT_ID);
                }
                const doctor = await database_service_1.default.doctors.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!doctor) {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.DOCTOR_NOT_FOUND);
                }
                return true;
            }
        }
    },
    max_number: {
        optional: true,
        notEmpty: { errorMessage: messages_1.SCHEDULES_MESSAGE.MAX_NUMBER_IS_REQUIRED },
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.MAX_NUMBER_MUST_BE_A_NUMBER);
                }
                if (value > 100) {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.MAX_NUMBER_MUST_BE_LESS_THAN_100);
                }
                return true;
            }
        }
    },
    date: {
        optional: true,
        notEmpty: { errorMessage: messages_1.SCHEDULES_MESSAGE.DATE_IS_REQUIRED },
        isString: { errorMessage: messages_1.SCHEDULES_MESSAGE.DATE_MUST_BE_A_STRING },
        isLength: { options: { max: 10 }, errorMessage: messages_1.SCHEDULES_MESSAGE.DATE_MUST_BE_LESS_THAN_10_CHARACTERS },
        trim: true
    },
    current_number: {
        optional: true,
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.CURRENT_NUMBER_MUST_BE_A_NUMBER);
                }
                if (value > 100) {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.CURRENT_NUMBER_MUST_BE_LESS_THAN_100);
                }
                return true;
            }
        }
    },
    time_type: {
        optional: true,
        notEmpty: { errorMessage: messages_1.SCHEDULES_MESSAGE.TIME_TYPE_IS_REQUIRED },
        isArray: { errorMessage: messages_1.SCHEDULES_MESSAGE.TIME_TYPE_MUST_BE_AN_ARRAY },
        isIn: {
            options: [
                [
                    enum_1.TimeScheduleType.T1,
                    enum_1.TimeScheduleType.T2,
                    enum_1.TimeScheduleType.T3,
                    enum_1.TimeScheduleType.T4,
                    enum_1.TimeScheduleType.T5,
                    enum_1.TimeScheduleType.T6,
                    enum_1.TimeScheduleType.T7
                ]
            ],
            errorMessage: messages_1.SCHEDULES_MESSAGE.TIME_TYPE_MUST_BE_IN_THE_RANGE
        },
        custom: {
            options: (value) => {
                if (value.length === 0) {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.TIME_TYPE_MUST_NOT_BE_EMPTY);
                }
                return true;
            }
        }
    }
}, ['body']));
exports.checkParamsScheduleId = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    id: {
        notEmpty: { errorMessage: messages_1.SCHEDULES_MESSAGE.SCHEDULE_ID_IS_REQUIRED },
        isString: { errorMessage: messages_1.SCHEDULES_MESSAGE.SCHEDULE_ID_MUST_BE_A_STRING },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.INVALID_OBJECT_ID);
                }
                const schedule = await database_service_1.default.schedules.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!schedule) {
                    throw new Error(messages_1.SCHEDULES_MESSAGE.SCHEDULE_NOT_FOUND);
                }
                return true;
            }
        }
    }
}, ['params']));
