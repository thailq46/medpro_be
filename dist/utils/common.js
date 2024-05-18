"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.numberEnumToArray = exports.responseMessage = void 0;
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const Errors_1 = require("../models/Errors");
const config_1 = require("../constants/config");
const jwt_1 = require("../utils/jwt");
const lodash_1 = require("lodash");
const responseMessage = ({ message, data, meta = {} }) => {
    return {
        message,
        data,
        meta
    };
};
exports.responseMessage = responseMessage;
const numberEnumToArray = (numberEnum) => {
    return Object.values(numberEnum).filter((value) => typeof value === 'number');
};
exports.numberEnumToArray = numberEnumToArray;
async function verifyAccessToken(access_token, req) {
    if (!access_token) {
        throw new Errors_1.ErrorWithStatus({
            status: httpStatus_1.default.UNAUTHORIZED,
            message: messages_1.USERS_MESSAGE.ACCESS_TOKEN_REQUIRED
        });
    }
    try {
        const decoded_authorization = await (0, jwt_1.verifyToken)({
            token: access_token,
            secretOrPrivateKey: config_1.envConfig.jwtSecretAccessToken
        });
        if (req) {
            ;
            req.decode_authorization = decoded_authorization;
            return true;
        }
        return decoded_authorization;
    }
    catch (error) {
        throw new Errors_1.ErrorWithStatus({
            status: httpStatus_1.default.UNAUTHORIZED,
            message: (0, lodash_1.capitalize)(error.message)
        });
    }
}
exports.verifyAccessToken = verifyAccessToken;
