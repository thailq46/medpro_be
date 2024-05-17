"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = void 0;
const lodash_1 = require("lodash");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const Errors_1 = require("../models/Errors");
const defaultErrorHandler = (err, req, res, next) => {
    if (err instanceof Errors_1.ErrorWithStatus) {
        return res.status(err.status || httpStatus_1.default.INTERNAL_SERVER_ERROR).json((0, lodash_1.omit)(err, ['status']));
    }
    Object.getOwnPropertyNames(err).forEach((key) => {
        Object.defineProperty(err, key, {
            enumerable: true
        });
    });
    return res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        error_info: (0, lodash_1.omit)(err, ['stack'])
    });
};
exports.defaultErrorHandler = defaultErrorHandler;
