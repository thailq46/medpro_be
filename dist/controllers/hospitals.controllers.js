"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullHospitalsController = exports.getHospitalsByIdController = exports.deleteHospitalController = exports.updateHospitalController = exports.createHospitalController = void 0;
const messages_1 = require("../constants/messages");
const hospitals_service_1 = __importDefault(require("../services/hospitals.service"));
const common_1 = require("../utils/common");
const createHospitalController = async (req, res) => {
    const result = await hospitals_service_1.default.createHospital(req.body);
    return res.json({
        message: messages_1.HOSPITALS_MESSAGE.CREATE_HOSPITAL_SUCCESS,
        data: result
    });
};
exports.createHospitalController = createHospitalController;
const updateHospitalController = async (req, res) => {
    const { id } = req.params;
    const result = await hospitals_service_1.default.updateHospital(id, req.body);
    return res.json({
        message: messages_1.HOSPITALS_MESSAGE.UPDATE_HOSPITAL_SUCCESS,
        data: result
    });
};
exports.updateHospitalController = updateHospitalController;
const deleteHospitalController = async (req, res) => {
    const { id } = req.params;
    const result = await hospitals_service_1.default.deleteHospital(id);
    return res.json({
        message: messages_1.HOSPITALS_MESSAGE.DELETE_HOSPITAL_SUCCESS,
        data: result
    });
};
exports.deleteHospitalController = deleteHospitalController;
const getHospitalsByIdController = async (req, res) => {
    const { id } = req.params;
    const result = await hospitals_service_1.default.getHospitalsById(id);
    return res.json((0, common_1.responseMessage)({
        message: messages_1.HOSPITALS_MESSAGE.GET_HOSPITALS_SUCCESS,
        data: result
    }));
};
exports.getHospitalsByIdController = getHospitalsByIdController;
const getFullHospitalsController = async (req, res) => {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const { hospitals, totalItems } = await hospitals_service_1.default.getFullHospitals({ limit, page });
    return res.json((0, common_1.responseMessage)({
        message: messages_1.HOSPITALS_MESSAGE.GET_HOSPITALS_SUCCESS,
        data: hospitals,
        meta: {
            total_page: Math.ceil(totalItems / limit),
            limit,
            current_page: page,
            total_items: totalItems
        }
    }));
};
exports.getFullHospitalsController = getFullHospitalsController;
