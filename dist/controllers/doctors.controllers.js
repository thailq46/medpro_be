"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullDoctorsController = exports.getDoctorsByIdController = exports.deleteDoctorsController = exports.updateDoctorsController = exports.createDoctorsController = void 0;
const messages_1 = require("../constants/messages");
const doctors_service_1 = __importDefault(require("../services/doctors.service"));
const common_1 = require("../utils/common");
const createDoctorsController = async (req, res) => {
    const result = await doctors_service_1.default.createDoctors(req.body);
    return res.json({
        message: messages_1.DOCTORS_MESSAGE.CREATE_DOCTORS_SUCCESS,
        data: result
    });
};
exports.createDoctorsController = createDoctorsController;
const updateDoctorsController = async (req, res) => {
    const { doctor_id } = req.params;
    const result = await doctors_service_1.default.updateDoctors(doctor_id, req.body);
    return res.json({
        message: messages_1.DOCTORS_MESSAGE.UPDATE_DOCTORS_SUCCESS,
        data: result
    });
};
exports.updateDoctorsController = updateDoctorsController;
const deleteDoctorsController = async (req, res) => {
    const { doctor_id } = req.params;
    await doctors_service_1.default.deleteDoctors(doctor_id);
    return res.json({
        message: messages_1.DOCTORS_MESSAGE.DELETE_DOCTORS_SUCCESS
    });
};
exports.deleteDoctorsController = deleteDoctorsController;
const getDoctorsByIdController = async (req, res) => {
    const { doctor_id } = req.params;
    const result = await doctors_service_1.default.getDoctorsById(doctor_id);
    return res.json((0, common_1.responseMessage)({
        message: messages_1.DOCTORS_MESSAGE.GET_DOCTORS_SUCCESS,
        data: result
    }));
};
exports.getDoctorsByIdController = getDoctorsByIdController;
const getFullDoctorsController = async (req, res) => {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const { doctors, total } = await doctors_service_1.default.getFullDoctors({ limit, page });
    return res.json((0, common_1.responseMessage)({
        message: messages_1.DOCTORS_MESSAGE.GET_DOCTORS_SUCCESS,
        data: doctors,
        meta: {
            current_page: page,
            total_items: total,
            total_page: Math.ceil(total / limit),
            limit
        }
    }));
};
exports.getFullDoctorsController = getFullDoctorsController;
