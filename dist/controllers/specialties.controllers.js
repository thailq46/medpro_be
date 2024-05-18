"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullSpecialtiesController = exports.getSpecialtiesByIdController = exports.deleteSpecialtiesController = exports.updateSpecialtiesController = exports.createSpecialtiesController = void 0;
const messages_1 = require("../constants/messages");
const specialties_service_1 = __importDefault(require("../services/specialties.service"));
const common_1 = require("../utils/common");
const createSpecialtiesController = async (req, res) => {
    const result = await specialties_service_1.default.createSpecialty(req.body);
    return res.json({
        message: messages_1.SPECIALTIES_MESSAGE.CREATE_SPECIALTY_SUCCESS,
        data: result
    });
};
exports.createSpecialtiesController = createSpecialtiesController;
const updateSpecialtiesController = async (req, res) => {
    const { id } = req.params;
    const result = await specialties_service_1.default.updateSpecialty(id, req.body);
    return res.json({
        message: messages_1.SPECIALTIES_MESSAGE.UPDATE_SPECIALTY_SUCCESS,
        data: result
    });
};
exports.updateSpecialtiesController = updateSpecialtiesController;
const deleteSpecialtiesController = async (req, res) => {
    const { id } = req.params;
    const result = await specialties_service_1.default.deleteSpecialty(id);
    return res.json({
        message: messages_1.SPECIALTIES_MESSAGE.DELETE_SPECIALTY_SUCCESS,
        data: result
    });
};
exports.deleteSpecialtiesController = deleteSpecialtiesController;
const getSpecialtiesByIdController = async (req, res) => {
    const { id } = req.params;
    const result = await specialties_service_1.default.getSpecialtyById(id);
    return res.json((0, common_1.responseMessage)({
        message: messages_1.SPECIALTIES_MESSAGE.GET_SPECIALTIES_SUCCESS,
        data: result
    }));
};
exports.getSpecialtiesByIdController = getSpecialtiesByIdController;
const getFullSpecialtiesController = async (req, res) => {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const { specialties, totalItems } = await specialties_service_1.default.getFullSpecialties({ limit, page });
    return res.json((0, common_1.responseMessage)({
        message: messages_1.SPECIALTIES_MESSAGE.GET_SPECIALTIES_SUCCESS,
        data: specialties,
        meta: {
            limit,
            current_page: page,
            total_items: totalItems,
            total_page: Math.ceil(totalItems / limit)
        }
    }));
};
exports.getFullSpecialtiesController = getFullSpecialtiesController;
