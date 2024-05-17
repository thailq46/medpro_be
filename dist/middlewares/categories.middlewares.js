"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoriesValidator = exports.createCategoriesValidator = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const messages_1 = require("../constants/messages");
const database_service_1 = __importDefault(require("../services/database.service"));
const validate_1 = __importDefault(require("../utils/validate"));
const checkSchema_1 = require("../constants/checkSchema");
exports.createCategoriesValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    name: checkSchema_1.nameCheckSchema,
    slug: {
        ...checkSchema_1.slugCheckSchema,
        custom: {
            options: async (value) => {
                const isExist = await database_service_1.default.categories.findOne({ slug: value });
                if (isExist) {
                    throw new Error(messages_1.CATEGORIES_MESSAGE.SLUG_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    parent_id: {
        optional: { options: { nullable: true } },
        isString: { errorMessage: messages_1.CATEGORIES_MESSAGE.PARENT_ID_MUST_BE_STRING },
        custom: {
            options: async (value) => {
                if (value !== null || value !== '') {
                    if (!mongodb_1.ObjectId.isValid(value)) {
                        throw new Error(messages_1.CATEGORIES_MESSAGE.INVALID_PARENT_ID);
                    }
                    const isExist = await database_service_1.default.categories.findOne({ _id: new mongodb_1.ObjectId(value) });
                    if (!isExist) {
                        throw new Error(messages_1.CATEGORIES_MESSAGE.CATEGORY_NOT_FOUND);
                    }
                    return true;
                }
                return true;
            }
        }
    }
}, ['body']));
exports.updateCategoriesValidator = (0, validate_1.default)((0, express_validator_1.checkSchema)({
    name: { optional: true, ...checkSchema_1.nameCheckSchema },
    slug: {
        optional: true,
        ...checkSchema_1.slugCheckSchema,
        custom: {
            options: async (value, { req }) => {
                const categoryId = req.params?.id;
                const isExist = await database_service_1.default.categories.findOne({
                    slug: value,
                    _id: { $ne: new mongodb_1.ObjectId(categoryId) }
                });
                if (isExist) {
                    throw new Error(messages_1.CATEGORIES_MESSAGE.SLUG_ALREADY_EXIST);
                }
                return true;
            }
        }
    },
    parent_id: {
        optional: {
            options: { nullable: true }
        },
        isString: { errorMessage: messages_1.CATEGORIES_MESSAGE.PARENT_ID_MUST_BE_STRING },
        custom: {
            options: async (value) => {
                if (value !== null || value !== '') {
                    if (!mongodb_1.ObjectId.isValid(value)) {
                        throw new Error(messages_1.CATEGORIES_MESSAGE.INVALID_PARENT_ID);
                    }
                    const isExist = await database_service_1.default.categories.findOne({ _id: new mongodb_1.ObjectId(value) });
                    if (!isExist) {
                        throw new Error(messages_1.CATEGORIES_MESSAGE.CATEGORY_NOT_FOUND);
                    }
                    return true;
                }
                return true;
            }
        }
    }
}, ['body']));
