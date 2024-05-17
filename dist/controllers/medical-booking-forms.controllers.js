"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullMedicalBookingFormsController = exports.getMedicalBookingFormsByIdController = exports.deleteMedicalBookingFormsController = exports.updateMedicalBookingFormsController = exports.createMedicalBookingFormsController = void 0;
const mongodb_1 = require("mongodb");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const database_service_1 = __importDefault(require("../services/database.service"));
const medical_booking_forms_service_1 = __importDefault(require("../services/medical-booking-forms.service"));
const createMedicalBookingFormsController = async (req, res) => {
    const result = await medical_booking_forms_service_1.default.createMedicalBookingForms(req.body);
    return res.json({
        message: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.CREATE_SUCCESS,
        data: result
    });
};
exports.createMedicalBookingFormsController = createMedicalBookingFormsController;
const updateMedicalBookingFormsController = async (req, res) => {
    const { id } = req.params;
    const isExist = await database_service_1.default.medicalBookingForms.findOne({ _id: new mongodb_1.ObjectId(id) });
    if (!isExist) {
        return res.status(httpStatus_1.default.NOT_FOUND).json({
            message: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.NOT_FOUND
        });
    }
    const result = await medical_booking_forms_service_1.default.updateMedicalBookingForms(id, req.body);
    return res.json({
        message: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.UPDATE_SUCCESS,
        data: result
    });
};
exports.updateMedicalBookingFormsController = updateMedicalBookingFormsController;
const deleteMedicalBookingFormsController = async (req, res) => {
    const { id } = req.params;
    const result = await medical_booking_forms_service_1.default.deleteMedicalBookingForms(id);
    return res.json({
        message: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.DELETE_SUCCESS,
        data: result
    });
};
exports.deleteMedicalBookingFormsController = deleteMedicalBookingFormsController;
const getMedicalBookingFormsByIdController = async (req, res) => {
    const { id } = req.params;
    const isExist = await database_service_1.default.medicalBookingForms.findOne({ _id: new mongodb_1.ObjectId(id) });
    if (!isExist) {
        return res.status(httpStatus_1.default.NOT_FOUND).json({
            message: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.NOT_FOUND
        });
    }
    const result = await medical_booking_forms_service_1.default.getMedicalBookingFormsById(id);
    return res.json({
        message: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.GET_SUCCESS,
        data: result
    });
};
exports.getMedicalBookingFormsByIdController = getMedicalBookingFormsByIdController;
const getFullMedicalBookingFormsController = async (req, res) => {
    const result = await medical_booking_forms_service_1.default.getFullMedicalBookingForms();
    return res.json({
        message: messages_1.MEDICAL_BOOKING_FORMS_MESSAGE.GET_SUCCESS,
        data: result
    });
};
exports.getFullMedicalBookingFormsController = getFullMedicalBookingFormsController;
