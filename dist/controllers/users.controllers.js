"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByUsernameController = exports.updateUserByUsernameController = exports.getUserByUsernameController = exports.getListUsersController = exports.updateMeController = exports.getMeController = void 0;
const messages_1 = require("../constants/messages");
const users_service_1 = __importDefault(require("../services/users.service"));
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const getMeController = async (req, res) => {
    const { user_id } = req.decode_authorization;
    const result = await users_service_1.default.getMe(user_id);
    return res.json({
        message: messages_1.USERS_MESSAGE.GET_ME_SUCCESS,
        data: result
    });
};
exports.getMeController = getMeController;
const updateMeController = async (req, res) => {
    const { user_id } = req.decode_authorization;
    const result = await users_service_1.default.updateMe(user_id, req.body);
    return res.json({
        message: messages_1.USERS_MESSAGE.UPDATE_ME_SUCCESS,
        data: result
    });
};
exports.updateMeController = updateMeController;
const getListUsersController = async (req, res) => {
    const result = await users_service_1.default.getListUsers();
    return res.json({
        message: messages_1.USERS_MESSAGE.GET_LIST_USERS_SUCCESS,
        data: result
    });
};
exports.getListUsersController = getListUsersController;
const getUserByUsernameController = async (req, res) => {
    const { username } = req.params;
    const user = await users_service_1.default.getUserByUsername(username);
    if (!user) {
        return res.status(httpStatus_1.default.NOT_FOUND).json({
            message: messages_1.USERS_MESSAGE.USER_NOT_FOUND,
            data: null
        });
    }
    return res.json({
        message: messages_1.USERS_MESSAGE.GET_USER_BY_USERNAME_SUCCESS,
        data: user
    });
};
exports.getUserByUsernameController = getUserByUsernameController;
const updateUserByUsernameController = async (req, res) => {
    const { username } = req.params;
    const user = await users_service_1.default.updateUserByUsername(username, req.body);
    if (!user) {
        return res.status(httpStatus_1.default.NOT_FOUND).json({
            message: messages_1.USERS_MESSAGE.USER_NOT_FOUND,
            data: null
        });
    }
    return res.json({
        message: messages_1.USERS_MESSAGE.UPDATE_SUCCESS,
        data: user
    });
};
exports.updateUserByUsernameController = updateUserByUsernameController;
const deleteUserByUsernameController = async (req, res) => {
    const { username } = req.params;
    const user = await users_service_1.default.deleteUserByUsername(username);
    if (!user) {
        return res.status(httpStatus_1.default.NOT_FOUND).json({
            message: messages_1.USERS_MESSAGE.USER_NOT_FOUND
        });
    }
    return res.json({
        message: messages_1.USERS_MESSAGE.DELETE_SUCCESS
    });
};
exports.deleteUserByUsernameController = deleteUserByUsernameController;
