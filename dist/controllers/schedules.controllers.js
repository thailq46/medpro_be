"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullSchedulesController = exports.getSchedulesByIdController = exports.deleteSchedulesController = exports.updateSchedulesController = exports.createSchedulesController = void 0;
const messages_1 = require("../constants/messages");
const schedules_service_1 = __importDefault(require("../services/schedules.service"));
const createSchedulesController = async (req, res) => {
    const result = await schedules_service_1.default.createSchedules(req.body);
    return res.json({
        message: messages_1.SCHEDULES_MESSAGE.CREATE_SCHEDULES_SUCCESSFULLY,
        data: result
    });
};
exports.createSchedulesController = createSchedulesController;
const updateSchedulesController = async (req, res) => {
    const { id } = req.params;
    const result = await schedules_service_1.default.updateSchedules(id, req.body);
    return res.json({
        message: messages_1.SCHEDULES_MESSAGE.UPDATE_SCHEDULES_SUCCESSFULLY,
        data: result
    });
};
exports.updateSchedulesController = updateSchedulesController;
const deleteSchedulesController = async (req, res) => {
    const { id } = req.params;
    const result = await schedules_service_1.default.deleteSchedules(id);
    return res.json({
        message: messages_1.SCHEDULES_MESSAGE.DELETE_SCHEDULES_SUCCESSFULLY,
        data: result
    });
};
exports.deleteSchedulesController = deleteSchedulesController;
const getSchedulesByIdController = async (req, res) => {
    const { id } = req.params;
    const result = await schedules_service_1.default.getSchedulesById(id);
    return res.json({
        message: messages_1.SCHEDULES_MESSAGE.GET_SCHEDULES_SUCCESSFULLY,
        data: result
    });
};
exports.getSchedulesByIdController = getSchedulesByIdController;
const getFullSchedulesController = async (req, res) => {
    const result = await schedules_service_1.default.getFullSchedules();
    return res.json({
        message: messages_1.SCHEDULES_MESSAGE.GET_SCHEDULES_SUCCESSFULLY,
        data: result
    });
};
exports.getFullSchedulesController = getFullSchedulesController;
