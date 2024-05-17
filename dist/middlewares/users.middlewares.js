"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByUsernameValidator = exports.updateMeValidator = exports.verifiedUserValidator = void 0;
const express_validator_1 = require("express-validator");
const enum_1 = require("../constants/enum");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const Errors_1 = require("../models/Errors");
const validate_1 = __importDefault(require("../utils/validate"));
const checkSchema_1 = require("./../constants/checkSchema");
const database_service_1 = __importDefault(require("../services/database.service"));
const common_1 = require("../utils/common");
const regax_1 = require("../constants/regax");
const verifiedUserValidator = (req, res, next) => {
    const { verify } = req.decode_authorization;
    if (verify !== enum_1.UserVerifyStatus.Verified) {
        // Khi next 1 error thì sẽ chạy đến middleware error handler. Đây là middleware đồng bộ throw thì express validator tự động next giá trị throw (Chỉ áp dụng với synchronous)
        return next(new Errors_1.ErrorWithStatus({
            message: messages_1.USERS_MESSAGE.USER_NOT_VERIFIED,
            status: httpStatus_1.default.FORBIDDEN
        }));
    }
    next();
};
exports.verifiedUserValidator = verifiedUserValidator;
exports.updateMeValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    name: { optional: true, ...checkSchema_1.nameCheckSchema },
    date_of_birth: { optional: true, ...checkSchema_1.dateOfBirthCheckSchema },
    gender: {
        optional: true,
        ...checkSchema_1.genderCheckSchema,
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.USERS_MESSAGE.GENDER_MUST_BE_NUMBER);
                }
                return true;
            }
        }
    },
    address: {
        optional: true,
        ...checkSchema_1.addressCheckSchema
    },
    avatar: {
        optional: true,
        ...checkSchema_1.avatarCheckSchema
    },
    phone_number: {
        optional: true,
        isString: {
            errorMessage: messages_1.USERS_MESSAGE.PHONE_NUMBER_MUST_BE_STRING
        },
        custom: {
            options: (value) => {
                if (!regax_1.CHECK_PHONE_NUMBER_REGEX.test(value)) {
                    throw new Error(messages_1.USERS_MESSAGE.INVALID_PHONE_NUMBER);
                }
                return true;
            }
        },
        trim: true
    },
    username: {
        optional: true,
        isString: {
            errorMessage: messages_1.USERS_MESSAGE.USERNAME_MUST_BE_STRING
        },
        custom: {
            options: async (value) => {
                const user = await database_service_1.default.users.findOne({
                    $and: [{ username: value }, { username: { $ne: value } }]
                });
                if (user) {
                    throw new Error(messages_1.USERS_MESSAGE.USERNAME_ALREADY_EXIST);
                }
                return true;
            }
        },
        trim: true
    }
}, ['body']));
exports.updateUserByUsernameValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    name: { optional: true, ...checkSchema_1.nameCheckSchema },
    date_of_birth: { optional: true, ...checkSchema_1.dateOfBirthCheckSchema },
    gender: {
        optional: true,
        ...checkSchema_1.genderCheckSchema,
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.USERS_MESSAGE.GENDER_MUST_BE_NUMBER);
                }
                return true;
            }
        }
    },
    address: {
        optional: true,
        ...checkSchema_1.addressCheckSchema
    },
    avatar: {
        optional: true,
        ...checkSchema_1.avatarCheckSchema
    },
    phone_number: {
        optional: true,
        isString: { errorMessage: messages_1.USERS_MESSAGE.PHONE_NUMBER_MUST_BE_STRING },
        trim: true,
        custom: {
            options: (value) => {
                if (!regax_1.CHECK_PHONE_NUMBER_REGEX.test(value)) {
                    throw new Error(messages_1.USERS_MESSAGE.INVALID_PHONE_NUMBER);
                }
                return true;
            }
        }
    },
    position: {
        optional: true,
        ...checkSchema_1.positionCheckSchema,
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.USERS_MESSAGE.POSITION_MUST_BE_NUMBER);
                }
                return true;
            }
        }
    },
    username: {
        optional: true,
        isString: {
            errorMessage: messages_1.USERS_MESSAGE.USERNAME_MUST_BE_STRING
        },
        trim: true,
        custom: {
            options: async (value, { req }) => {
                const usernameToUpdate = req.params?.username;
                const user = await database_service_1.default.users.findOne({
                    $and: [{ username: value }, { username: { $ne: usernameToUpdate } }]
                });
                if (user) {
                    throw new Error(messages_1.USERS_MESSAGE.USERNAME_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    verify: {
        optional: true,
        notEmpty: { errorMessage: messages_1.USERS_MESSAGE.VERIFY_IS_REQUIRED },
        isIn: {
            options: [(0, common_1.numberEnumToArray)(enum_1.UserVerifyStatus)],
            errorMessage: messages_1.USERS_MESSAGE.INVALID_VERIFY
        },
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.USERS_MESSAGE.VERIFY_MUST_BE_A_NUMBER);
                }
                return true;
            }
        }
    },
    role: {
        optional: true,
        notEmpty: { errorMessage: messages_1.USERS_MESSAGE.ROLE_IS_REQUIRED },
        isIn: {
            options: [(0, common_1.numberEnumToArray)(enum_1.RoleType)],
            errorMessage: messages_1.USERS_MESSAGE.INVALID_ROLE
        },
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error(messages_1.USERS_MESSAGE.ROLE_MUST_BE_NUMBER);
                }
                return true;
            }
        }
    }
}, ['body']));
