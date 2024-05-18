"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionCheckSchema = exports.descriptionCheckSchema = exports.timeWorkCheckSchema = exports.positionCheckSchema = exports.avatarCheckSchema = exports.addressCheckSchema = exports.confirmPasswordCheckSchema = exports.passwordCheckSchema = exports.dateOfBirthCheckSchema = exports.genderCheckSchema = exports.emailCheckSchema = exports.slugCheckSchema = exports.nameCheckSchema = void 0;
const enum_1 = require("../constants/enum");
const messages_1 = require("../constants/messages");
const regax_1 = require("../constants/regax");
const common_1 = require("../utils/common");
exports.nameCheckSchema = {
    notEmpty: { errorMessage: messages_1.COMMON_MESSAGE.NAME_IS_REQUIRED },
    isString: { errorMessage: messages_1.COMMON_MESSAGE.NAME_MUST_BE_STRING },
    trim: true,
    isLength: {
        options: { max: 255 },
        errorMessage: messages_1.COMMON_MESSAGE.NAME_NOT_EXCEED_255
    }
};
exports.slugCheckSchema = {
    notEmpty: { errorMessage: messages_1.COMMON_MESSAGE.SLUG_IS_REQUIRED },
    isString: { errorMessage: messages_1.COMMON_MESSAGE.SLUG_MUST_BE_STRING },
    matches: {
        options: regax_1.CHECK_WHITE_SPACE_REGEX,
        errorMessage: messages_1.COMMON_MESSAGE.SLUG_NOT_CONTAIN_SPACE
    },
    isLength: {
        options: { max: 255 },
        errorMessage: messages_1.COMMON_MESSAGE.SLUG_NOT_EXCEED_255
    },
    trim: true
};
exports.emailCheckSchema = {
    notEmpty: { errorMessage: messages_1.USERS_MESSAGE.EMAIL_IS_REQUIRED },
    isEmail: { errorMessage: messages_1.USERS_MESSAGE.INVALID_EMAIL },
    trim: true
};
exports.genderCheckSchema = {
    notEmpty: { errorMessage: messages_1.USERS_MESSAGE.GENDER_IS_REQUIRED },
    isIn: {
        options: [(0, common_1.numberEnumToArray)(enum_1.GenderType)],
        errorMessage: messages_1.USERS_MESSAGE.INVALID_GENDER
    }
};
exports.dateOfBirthCheckSchema = {
    notEmpty: { errorMessage: messages_1.USERS_MESSAGE.DATE_BIRTH_IS_REQUIRED },
    isISO8601: {
        errorMessage: messages_1.USERS_MESSAGE.INVALID_DATE_OF_BIRTH,
        options: {
            strict: true,
            strictSeparator: true
        }
    },
    trim: true
};
exports.passwordCheckSchema = {
    notEmpty: { errorMessage: messages_1.USERS_MESSAGE.PASSWORD_IS_REQUIRED },
    isString: { errorMessage: messages_1.USERS_MESSAGE.PASSWORD_MUST_BE_STRING },
    isLength: {
        options: { min: 6, max: 50 },
        errorMessage: messages_1.USERS_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    },
    isStrongPassword: {
        options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        },
        errorMessage: messages_1.USERS_MESSAGE.PASSWORD_MUST_BE_STRONG
    },
    trim: true
};
exports.confirmPasswordCheckSchema = {
    notEmpty: { errorMessage: messages_1.USERS_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED },
    isString: { errorMessage: messages_1.USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRING },
    isLength: {
        options: { min: 6, max: 50 },
        errorMessage: messages_1.USERS_MESSAGE.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    },
    isStrongPassword: {
        options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        },
        errorMessage: messages_1.USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRONG
    },
    trim: true
};
exports.addressCheckSchema = {
    isString: { errorMessage: messages_1.USERS_MESSAGE.ADDRESS_MUST_BE_STRING },
    isLength: {
        options: { max: 255 },
        errorMessage: messages_1.USERS_MESSAGE.ADDRESS_NOT_EXCEED_255
    },
    trim: true
};
exports.avatarCheckSchema = {
    isString: { errorMessage: messages_1.USERS_MESSAGE.AVATAR_MUST_BE_STRING },
    isLength: {
        options: { max: 255 },
        errorMessage: messages_1.USERS_MESSAGE.AVATAR_NOT_EXCEED_255
    },
    trim: true
};
exports.positionCheckSchema = {
    notEmpty: { errorMessage: messages_1.USERS_MESSAGE.POSITION_IS_REQUIRED },
    isIn: {
        options: [(0, common_1.numberEnumToArray)(enum_1.PositionType)],
        errorMessage: messages_1.USERS_MESSAGE.INVALID_POSITION
    }
};
exports.timeWorkCheckSchema = {
    optional: { options: { nullable: true } },
    isString: { errorMessage: messages_1.HOSPITALS_MESSAGE.TIME_MUST_BE_STRING },
    isLength: {
        options: { max: 5 },
        errorMessage: messages_1.HOSPITALS_MESSAGE.TIME_LENGTH_MUST_BE_5
    },
    trim: true
};
exports.descriptionCheckSchema = {
    notEmpty: { errorMessage: messages_1.COMMON_MESSAGE.DESC_IS_REQUIRED },
    isString: { errorMessage: messages_1.COMMON_MESSAGE.DESC_MUST_BE_STRING },
    trim: true,
    isLength: {
        options: { max: 400 },
        errorMessage: messages_1.COMMON_MESSAGE.DESC_NOT_EXCEED_400
    }
};
exports.sessionCheckSchema = {
    notEmpty: {
        errorMessage: messages_1.COMMON_MESSAGE.SESSION_IS_REQUIRED
    },
    isString: {
        errorMessage: messages_1.COMMON_MESSAGE.SESSION_MUST_BE_STRING
    },
    isLength: {
        options: { max: 255 },
        errorMessage: messages_1.COMMON_MESSAGE.SESSION_NOT_EXCEED_255
    },
    trim: true
};
