"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationValidator = exports.isUserLoggedInValidator = exports.filterMiddleware = void 0;
const express_validator_1 = require("express-validator");
const lodash_1 = require("lodash");
const validate_1 = __importDefault(require("../utils/validate"));
const filterMiddleware = (filterKeys) => (req, res, next) => {
    req.body = (0, lodash_1.pick)(req.body, filterKeys);
    next();
};
exports.filterMiddleware = filterMiddleware;
const isUserLoggedInValidator = (middleware) => {
    return (req, res, next) => {
        if (req.headers.authorization) {
            return middleware(req, res, next);
        }
        next();
    };
};
exports.isUserLoggedInValidator = isUserLoggedInValidator;
exports.paginationValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    limit: {
        isNumeric: true,
        custom: {
            options: async (value) => {
                const num = Number(value);
                if (num > 100 || num < 1) {
                    throw new Error('1 <= limit <= 100');
                }
                return true;
            }
        }
    },
    page: { isNumeric: true }
}, ['query']));
