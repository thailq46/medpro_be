"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServicesByIdController = exports.getFullServicesController = exports.deleteServicesController = exports.updateServicesController = exports.createServicesController = void 0;
const messages_1 = require("../constants/messages");
const services_service_1 = __importDefault(require("../services/services.service"));
const common_1 = require("../utils/common");
const createServicesController = async (req, res) => {
    const result = await services_service_1.default.createServices(req.body);
    return res.json({
        message: messages_1.SERVICES_MESSAGE.CREATE_SERVICES_SUCCESS,
        data: result
    });
};
exports.createServicesController = createServicesController;
const updateServicesController = async (req, res) => {
    const { id } = req.params;
    const result = await services_service_1.default.updateServices(id, req.body);
    return res.json({
        message: messages_1.SERVICES_MESSAGE.UPDATE_SERVICES_SUCCESS,
        data: result
    });
};
exports.updateServicesController = updateServicesController;
const deleteServicesController = async (req, res) => {
    const { id } = req.params;
    const result = await services_service_1.default.deleteServices(id);
    return res.json({
        message: messages_1.SERVICES_MESSAGE.DELETE_SERVICES_SUCCESS,
        data: result
    });
};
exports.deleteServicesController = deleteServicesController;
const getFullServicesController = async (req, res) => {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const { services, totalItems } = await services_service_1.default.getFullServices({ limit, page });
    return res.json((0, common_1.responseMessage)({
        message: messages_1.SERVICES_MESSAGE.GET_SERVICES_SUCCESS,
        data: services,
        meta: {
            total_page: Math.ceil(totalItems / limit),
            limit,
            current_page: page,
            total_items: totalItems
        }
    }));
};
exports.getFullServicesController = getFullServicesController;
const getServicesByIdController = async (req, res) => {
    const { id } = req.params;
    const result = await services_service_1.default.getServicesById(id);
    return res.json((0, common_1.responseMessage)({
        message: messages_1.SERVICES_MESSAGE.GET_SERVICES_SUCCESS,
        data: result
    }));
};
exports.getServicesByIdController = getServicesByIdController;
