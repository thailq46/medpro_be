"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_schema_1 = __importDefault(require("../models/schemas/Category.schema"));
const database_service_1 = __importDefault(require("../services/database.service"));
const mongodb_1 = require("mongodb");
const messages_1 = require("../constants/messages");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
class CategoriesService {
    async createCategory(payload) {
        return await database_service_1.default.categories.insertOne(new Category_schema_1.default({
            ...payload,
            parent_id: payload.parent_id ? new mongodb_1.ObjectId(payload.parent_id) : null
        }));
    }
    async updateCategory(id, payload, res) {
        const isExist = await database_service_1.default.categories.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!isExist) {
            return res.status(httpStatus_1.default.NOT_FOUND).json({
                message: messages_1.CATEGORIES_MESSAGE.CATEGORY_NOT_FOUND,
                data: null
            });
        }
        const result = await database_service_1.default.categories.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, [
            {
                $set: {
                    ...payload,
                    parent_id: payload.parent_id ? new mongodb_1.ObjectId(payload.parent_id) : null,
                    updated_at: '$$NOW'
                }
            }
        ], { returnDocument: 'after' });
        return res.json({
            message: messages_1.CATEGORIES_MESSAGE.UPDATE_SUCCESS,
            data: result
        });
    }
    async deleteCategory(id, res) {
        const isParent = await database_service_1.default.categories.findOne({ parent_id: new mongodb_1.ObjectId(id) });
        if (isParent) {
            return res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: messages_1.CATEGORIES_MESSAGE.CATEGORY_IS_PARENT,
                data: null
            });
        }
        const category = await database_service_1.default.categories.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
        if (!category) {
            return res.status(httpStatus_1.default.NOT_FOUND).json({
                message: messages_1.CATEGORIES_MESSAGE.CATEGORY_NOT_FOUND,
                data: null
            });
        }
        return res.json({
            message: messages_1.CATEGORIES_MESSAGE.DELETE_SUCCESS,
            data: category
        });
    }
    async getFullCategories() {
        return await database_service_1.default.categories.find().toArray();
    }
    async getCategoryById(id) {
        return await database_service_1.default.categories.findOne({ _id: new mongodb_1.ObjectId(id) });
    }
}
const categoriesService = new CategoriesService();
exports.default = categoriesService;
