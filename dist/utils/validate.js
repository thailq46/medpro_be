"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const Errors_1 = require("../models/Errors");
const validate = (validation) => {
    return async (req, res, next) => {
        await validation.run(req);
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        const errorsObject = errors.mapped();
        /**
         * errorsObject = {
            type: 'field',
            value: 'thai@123',
            msg: 'Invalid value',
            path: 'email',
            location: 'body',}
         */
        const entityError = new Errors_1.EntityError({ errors: {} });
        for (const key in errorsObject) {
            const { msg } = errorsObject[key];
            console.log('return ~ msg', msg);
            // Trả về lỗi không phải là lỗi validate
            if (msg instanceof Errors_1.ErrorWithStatus && msg.status !== httpStatus_1.default.UNPROCESSABLE_ENTITY) {
                return next(msg);
            }
            entityError.errors[key] = errorsObject[key];
        }
        next(entityError);
    };
};
exports.default = validate;
