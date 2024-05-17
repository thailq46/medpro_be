"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParamsHospitalValidator = exports.updateHospitalValidator = exports.createHospitalValidator = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const checkSchema_1 = require("../constants/checkSchema");
const enum_1 = require("../constants/enum");
const messages_1 = require("../constants/messages");
const regax_1 = require("../constants/regax");
const database_service_1 = __importDefault(require("../services/database.service"));
const common_1 = require("../utils/common");
const validate_1 = __importDefault(require("../utils/validate"));
exports.createHospitalValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    categoryId: {
        notEmpty: {
            errorMessage: messages_1.HOSPITALS_MESSAGE.CATEGORY_ID_IS_REQUIRED
        },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.INVALID_CATEGORY_ID);
                }
                const isExist = await database_service_1.default.categories.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!isExist) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.CATEGORY_NOT_FOUND);
                }
                return true;
            }
        }
    },
    name: {
        ...checkSchema_1.nameCheckSchema,
        custom: {
            options: async (value) => {
                const isExist = await database_service_1.default.hospitals.findOne({ name: value });
                if (isExist) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.NAME_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    slug: {
        ...checkSchema_1.slugCheckSchema,
        custom: {
            options: async (value) => {
                const isExist = await database_service_1.default.hospitals.findOne({ slug: value });
                if (isExist) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.SLUG_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    description: checkSchema_1.descriptionCheckSchema,
    session: checkSchema_1.sessionCheckSchema,
    start_time: checkSchema_1.timeWorkCheckSchema,
    end_time: checkSchema_1.timeWorkCheckSchema,
    hotline: {
        isString: { errorMessage: messages_1.HOSPITALS_MESSAGE.HOTLINE_MUST_BE_STRING },
        custom: {
            options: (value) => {
                if (!regax_1.CHECK_PHONE_NUMBER_REGEX.test(value)) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.INVALID_PHONE_NUMBER);
                }
                return true;
            }
        },
        trim: true
    },
    address: {
        notEmpty: { errorMessage: messages_1.HOSPITALS_MESSAGE.ADDRESS_IS_REQUIRED },
        ...checkSchema_1.addressCheckSchema
    },
    avatar: {
        optional: { options: { nullable: true } },
        ...checkSchema_1.avatarCheckSchema
    },
    banner: {
        optional: { options: { nullable: true } },
        ...checkSchema_1.avatarCheckSchema
    },
    images: {
        optional: { options: { nullable: true } },
        isArray: {
            errorMessage: messages_1.HOSPITALS_MESSAGE.IMAGES_MUST_BE_ARRAY
        },
        custom: {
            options: (value) => {
                if (value !== null && value.some((item) => typeof item !== 'string')) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.IMAGE_MUST_BE_STRING);
                }
                return true;
            }
        }
    },
    booking_forms: {
        isArray: {
            errorMessage: messages_1.HOSPITALS_MESSAGE.BOOKING_FORMS_MUST_BE_ARRAY
        },
        custom: {
            options: async (value) => {
                if (value.length === 0) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.BOOKING_FORMS_IS_REQUIRED);
                }
                if (value.some((item) => !mongodb_1.ObjectId.isValid(item))) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.INVALID_OBJECT_ID);
                }
                for (let i = 0; i < value.length; i++) {
                    const isExist = await database_service_1.default.medicalBookingForms.findOne({ _id: new mongodb_1.ObjectId(value[i]) });
                    if (!isExist) {
                        throw new Error(messages_1.HOSPITALS_MESSAGE.BOOKING_FORM_NOT_FOUND);
                    }
                }
                return true;
            }
        }
    },
    types: {
        isArray: { errorMessage: messages_1.HOSPITALS_MESSAGE.TYPES_MUST_BE_ARRAY },
        isIn: {
            options: [(0, common_1.numberEnumToArray)(enum_1.HospitalsType)],
            errorMessage: messages_1.HOSPITALS_MESSAGE.INVALID_TYPES
        },
        custom: {
            options: async (value) => {
                if (value.length === 0) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.TYPES_IS_REQUIRED);
                }
                return true;
            }
        }
    }
}, ['body']));
exports.updateHospitalValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    categoryId: {
        optional: true,
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.INVALID_CATEGORY_ID);
                }
                const isExist = await database_service_1.default.categories.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!isExist) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.CATEGORY_NOT_FOUND);
                }
                return true;
            }
        }
    },
    name: {
        optional: true,
        ...checkSchema_1.nameCheckSchema,
        custom: {
            options: async (value) => {
                const isExist = await database_service_1.default.hospitals.findOne({
                    $and: [{ username: value }, { username: { $ne: value } }]
                });
                if (isExist) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.NAME_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    slug: {
        optional: true,
        ...checkSchema_1.slugCheckSchema,
        custom: {
            options: async (value) => {
                const isExist = await database_service_1.default.hospitals.findOne({
                    $and: [{ slug: value }, { slug: { $ne: value } }]
                });
                if (isExist) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.SLUG_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    description: {
        optional: true,
        ...checkSchema_1.descriptionCheckSchema
    },
    session: {
        optional: true,
        ...checkSchema_1.sessionCheckSchema
    },
    start_time: { optional: true, ...checkSchema_1.timeWorkCheckSchema },
    end_time: { optional: true, ...checkSchema_1.timeWorkCheckSchema },
    hotline: {
        optional: true,
        isString: { errorMessage: messages_1.HOSPITALS_MESSAGE.HOTLINE_MUST_BE_STRING },
        custom: {
            options: (value) => {
                if (!regax_1.CHECK_PHONE_NUMBER_REGEX.test(value)) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.INVALID_PHONE_NUMBER);
                }
                return true;
            }
        },
        trim: true
    },
    address: {
        optional: true,
        notEmpty: { errorMessage: messages_1.HOSPITALS_MESSAGE.ADDRESS_IS_REQUIRED },
        ...checkSchema_1.addressCheckSchema
    },
    avatar: {
        optional: { options: { nullable: true } },
        ...checkSchema_1.avatarCheckSchema
    },
    banner: {
        optional: { options: { nullable: true } },
        ...checkSchema_1.avatarCheckSchema
    },
    images: {
        optional: { options: { nullable: true } },
        isArray: {
            errorMessage: messages_1.HOSPITALS_MESSAGE.IMAGES_MUST_BE_ARRAY
        },
        custom: {
            options: (value) => {
                if (value !== null && value.some((item) => typeof item !== 'string')) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.IMAGE_MUST_BE_STRING);
                }
                return true;
            }
        }
    },
    booking_forms: {
        optional: true,
        isArray: {
            errorMessage: messages_1.HOSPITALS_MESSAGE.BOOKING_FORMS_MUST_BE_ARRAY
        },
        custom: {
            options: async (value) => {
                if (value.length === 0) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.BOOKING_FORMS_IS_REQUIRED);
                }
                if (value.some((item) => !mongodb_1.ObjectId.isValid(item))) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.INVALID_OBJECT_ID);
                }
                for (let i = 0; i < value.length; i++) {
                    const isExist = await database_service_1.default.medicalBookingForms.findOne({ _id: new mongodb_1.ObjectId(value[i]) });
                    if (!isExist) {
                        throw new Error(messages_1.HOSPITALS_MESSAGE.BOOKING_FORM_NOT_FOUND);
                    }
                }
                return true;
            }
        }
    },
    types: {
        optional: true,
        isArray: { errorMessage: messages_1.HOSPITALS_MESSAGE.TYPES_MUST_BE_ARRAY },
        isIn: {
            options: [(0, common_1.numberEnumToArray)(enum_1.HospitalsType)],
            errorMessage: messages_1.HOSPITALS_MESSAGE.INVALID_TYPES
        },
        custom: {
            options: async (value) => {
                if (value.length === 0) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.TYPES_IS_REQUIRED);
                }
                return true;
            }
        }
    }
}, ['body']));
exports.checkParamsHospitalValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    id: {
        notEmpty: { errorMessage: messages_1.HOSPITALS_MESSAGE.HOSPITAL_ID_IS_REQUIRED },
        custom: {
            options: async (value) => {
                if (!mongodb_1.ObjectId.isValid(value)) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.INVALID_OBJECT_ID);
                }
                const isExist = await database_service_1.default.hospitals.findOne({ _id: new mongodb_1.ObjectId(value) });
                if (!isExist) {
                    throw new Error(messages_1.HOSPITALS_MESSAGE.HOSPITAL_NOT_FOUND);
                }
                return true;
            }
        }
    }
}, ['params']));
