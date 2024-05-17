"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidator = exports.emailVerifyTokenValidator = exports.resetPasswordValidator = exports.verifyForgotPasswordTokenValidator = exports.forgotPasswordValidator = exports.refreshTokenValidator = exports.accessTokenValidator = exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
const messages_1 = require("../constants/messages");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const validate_1 = __importDefault(require("../utils/validate"));
const checkSchema_1 = require("../constants/checkSchema");
const Errors_1 = require("../models/Errors");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const database_service_1 = __importDefault(require("../services/database.service"));
const crypto_1 = require("../utils/crypto");
const common_1 = require("../utils/common");
const config_1 = require("../constants/config");
const jwt_1 = require("../utils/jwt");
const mongodb_1 = require("mongodb");
const jsonwebtoken_1 = require("jsonwebtoken");
const lodash_1 = require("lodash");
exports.registerValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    name: checkSchema_1.nameCheckSchema,
    email: {
        ...checkSchema_1.emailCheckSchema,
        custom: {
            options: async (value) => {
                const isExistEmail = await auth_service_1.default.checkEmailExist(value);
                if (isExistEmail) {
                    throw new Error(messages_1.USERS_MESSAGE.EMAIL_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    gender: {
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
    date_of_birth: checkSchema_1.dateOfBirthCheckSchema,
    password: checkSchema_1.passwordCheckSchema,
    confirm_password: {
        ...checkSchema_1.confirmPasswordCheckSchema,
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error(messages_1.USERS_MESSAGE.PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH);
                }
                return true;
            }
        }
    }
}, ['body']));
exports.loginValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    email: {
        ...checkSchema_1.emailCheckSchema,
        custom: {
            options: async (value, { req }) => {
                const user = await database_service_1.default.users.findOne({
                    email: value,
                    password: (0, crypto_1.hashPassword)(req.body.password)
                });
                if (!user) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: messages_1.USERS_MESSAGE.EMAIL_OR_PASSWORD_INCORRECT
                    });
                }
                req.user = user;
                return true;
            }
        }
    },
    password: checkSchema_1.passwordCheckSchema
}, ['body']));
exports.accessTokenValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    Authorization: {
        notEmpty: {
            errorMessage: messages_1.USERS_MESSAGE.ACCESS_TOKEN_REQUIRED
        },
        custom: {
            options: async (value, { req }) => {
                if (!value) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: messages_1.USERS_MESSAGE.ACCESS_TOKEN_REQUIRED
                    });
                }
                const accessToken = (value || '').split(' ')[1];
                return await (0, common_1.verifyAccessToken)(accessToken, req);
            }
        }
    }
}, ['headers']));
exports.refreshTokenValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    refresh_token: {
        notEmpty: { errorMessage: messages_1.USERS_MESSAGE.REFRESH_TOKEN_IS_REQUIRED },
        isString: { errorMessage: messages_1.USERS_MESSAGE.REFRESH_TOKEN_MUST_BE_STRING },
        custom: {
            options: async (value, { req }) => {
                if (!value) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: messages_1.USERS_MESSAGE.REFRESH_TOKEN_IS_REQUIRED
                    });
                }
                const [decode_refresh_token, refresh_token] = await Promise.all([
                    await (0, jwt_1.verifyToken)({
                        token: value,
                        secretOrPrivateKey: config_1.envConfig.jwtSecretRefreshToken
                    }),
                    await database_service_1.default.refreshTokens.findOne({ token: value })
                ]);
                if (!refresh_token) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: messages_1.USERS_MESSAGE.USED_REFRESH_TOKEN_OR_NOT_EXISTS
                    });
                }
                ;
                req.decode_refresh_token = decode_refresh_token;
                return true;
            }
        }
    }
}, ['body']));
exports.forgotPasswordValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    email: {
        ...checkSchema_1.emailCheckSchema,
        custom: {
            options: async (value, { req }) => {
                const user = await database_service_1.default.users.findOne({ email: value });
                if (!user) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: messages_1.USERS_MESSAGE.EMAIL_DOES_NOT_EXIST
                    });
                }
                req.user = user;
                return true;
            }
        }
    }
}, ['body']));
exports.verifyForgotPasswordTokenValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    forgot_password_token: {
        notEmpty: { errorMessage: messages_1.USERS_MESSAGE.FORGOT_PASSWORD_TOKEN_IS_REQUIRED },
        isString: { errorMessage: messages_1.USERS_MESSAGE.FORGOT_PASSWORD_TOKEN_MUST_BE_STRING },
        custom: {
            options: async (value, { req }) => {
                if (!value) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: messages_1.USERS_MESSAGE.FORGOT_PASSWORD_TOKEN_IS_REQUIRED
                    });
                }
                try {
                    const decode_forgot_password_token = await (0, jwt_1.verifyToken)({
                        token: value,
                        secretOrPrivateKey: config_1.envConfig.jwtSecretForgotPasswordToken
                    });
                    const { user_id } = decode_forgot_password_token;
                    const user = await database_service_1.default.users.findOne({ _id: new mongodb_1.ObjectId(user_id) });
                    if (!user) {
                        throw new Errors_1.ErrorWithStatus({
                            status: httpStatus_1.default.UNAUTHORIZED,
                            message: messages_1.USERS_MESSAGE.USER_NOT_FOUND
                        });
                    }
                    if (user.forgot_password_token !== value) {
                        throw new Errors_1.ErrorWithStatus({
                            status: httpStatus_1.default.UNAUTHORIZED,
                            message: messages_1.USERS_MESSAGE.INVALID_FORGOT_PASSWORD_TOKEN
                        });
                    }
                }
                catch (error) {
                    if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                        throw new Errors_1.ErrorWithStatus({
                            message: (0, lodash_1.capitalize)(error.message),
                            status: httpStatus_1.default.UNAUTHORIZED
                        });
                    }
                    throw error;
                }
                return true;
            }
        }
    }
}, ['body']));
exports.resetPasswordValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    password: checkSchema_1.passwordCheckSchema,
    confirm_password: {
        ...checkSchema_1.confirmPasswordCheckSchema,
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error(messages_1.USERS_MESSAGE.PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH);
                }
                return true;
            }
        }
    },
    forgot_password_token: {
        notEmpty: { errorMessage: messages_1.USERS_MESSAGE.FORGOT_PASSWORD_TOKEN_IS_REQUIRED },
        isString: { errorMessage: messages_1.USERS_MESSAGE.FORGOT_PASSWORD_TOKEN_MUST_BE_STRING },
        custom: {
            options: async (value, { req }) => {
                if (!value) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: messages_1.USERS_MESSAGE.FORGOT_PASSWORD_TOKEN_IS_REQUIRED
                    });
                }
                try {
                    const decoded_forgot_password_token = await (0, jwt_1.verifyToken)({
                        token: value,
                        secretOrPrivateKey: config_1.envConfig.jwtSecretForgotPasswordToken
                    });
                    req.decoded_forgot_password_token = decoded_forgot_password_token;
                }
                catch (error) {
                    throw new Errors_1.ErrorWithStatus({
                        message: (0, lodash_1.capitalize)(error.message),
                        status: httpStatus_1.default.UNAUTHORIZED
                    });
                }
                return true;
            }
        }
    }
}, ['body']));
exports.emailVerifyTokenValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    email_verify_token: {
        notEmpty: { errorMessage: messages_1.USERS_MESSAGE.EMAIL_VERIFY_TOKEN_IS_REQUIRED },
        isString: { errorMessage: messages_1.USERS_MESSAGE.EMAIL_VERIFY_TOKEN_MUST_BE_STRING },
        custom: {
            options: async (value, { req }) => {
                if (!value) {
                    throw new Errors_1.ErrorWithStatus({
                        status: httpStatus_1.default.UNAUTHORIZED,
                        message: messages_1.USERS_MESSAGE.EMAIL_VERIFY_TOKEN_IS_REQUIRED
                    });
                }
                try {
                    const decoded_email_verify_token = await (0, jwt_1.verifyToken)({
                        token: value,
                        secretOrPrivateKey: config_1.envConfig.jwtSecretEmailVerifyToken
                    });
                    req.decoded_email_verify_token = decoded_email_verify_token;
                }
                catch (error) {
                    throw new Errors_1.ErrorWithStatus({
                        message: (0, lodash_1.capitalize)(error.message),
                        status: httpStatus_1.default.UNAUTHORIZED
                    });
                }
                return true;
            }
        }
    }
}, ['body']));
exports.changePasswordValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    old_password: {
        notEmpty: { errorMessage: messages_1.USERS_MESSAGE.PASSWORD_IS_REQUIRED },
        isString: { errorMessage: messages_1.USERS_MESSAGE.PASSWORD_MUST_BE_STRING },
        custom: {
            options: async (value, { req }) => {
                const { user_id } = req.decode_authorization;
                const user = await database_service_1.default.users.findOne({
                    _id: new mongodb_1.ObjectId(user_id)
                });
                if (!user) {
                    throw new Errors_1.ErrorWithStatus({
                        message: messages_1.USERS_MESSAGE.USER_NOT_FOUND,
                        status: httpStatus_1.default.NOT_FOUND
                    });
                }
                const { password } = user;
                if (password !== (0, crypto_1.hashPassword)(value)) {
                    throw new Errors_1.ErrorWithStatus({
                        message: messages_1.USERS_MESSAGE.OLD_PASSWORD_INCORRECT,
                        status: httpStatus_1.default.UNAUTHORIZED
                    });
                }
                return true;
            }
        }
    },
    new_password: checkSchema_1.passwordCheckSchema,
    confirm_new_password: {
        ...checkSchema_1.confirmPasswordCheckSchema,
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.new_password) {
                    throw new Error(messages_1.USERS_MESSAGE.PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH);
                }
                return true;
            }
        }
    }
}, ['body']));
