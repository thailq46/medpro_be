"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryByIdController = exports.getFullCategoriesController = exports.deleteCategoriesController = exports.updateCategoriesController = exports.createCategoriesController = void 0;
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const categories_service_1 = __importDefault(require("../services/categories.service"));
const createCategoriesController = async (req, res) => {
    const result = await categories_service_1.default.createCategory(req.body);
    return res.json({
        message: messages_1.CATEGORIES_MESSAGE.CREATE_SUCCESS,
        data: result
    });
};
exports.createCategoriesController = createCategoriesController;
const updateCategoriesController = async (req, res) => {
    const { id } = req.params;
    return await categories_service_1.default.updateCategory(id, req.body, res);
};
exports.updateCategoriesController = updateCategoriesController;
const deleteCategoriesController = async (req, res) => {
    const { id } = req.params;
    return await categories_service_1.default.deleteCategory(id, res);
};
exports.deleteCategoriesController = deleteCategoriesController;
const getFullCategoriesController = async (req, res) => {
    const result = await categories_service_1.default.getFullCategories();
    return res.json({
        message: messages_1.CATEGORIES_MESSAGE.GET_SUCCESS,
        data: result
    });
};
exports.getFullCategoriesController = getFullCategoriesController;
const getCategoryByIdController = async (req, res) => {
    const { id } = req.params;
    const result = await categories_service_1.default.getCategoryById(id);
    if (!result) {
        return res.status(httpStatus_1.default.NOT_FOUND).json({
            message: messages_1.CATEGORIES_MESSAGE.CATEGORY_NOT_FOUND,
            data: null
        });
    }
    return res.json({
        message: messages_1.CATEGORIES_MESSAGE.GET_SUCCESS,
        data: result
    });
};
exports.getCategoryByIdController = getCategoryByIdController;
