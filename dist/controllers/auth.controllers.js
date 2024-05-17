"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = exports.refreshTokenController = exports.resendVerifyEmailController = exports.emailVerifyController = exports.resetPasswordController = exports.verifyForgotPasswordController = exports.forgotPasswordController = exports.logoutController = exports.loginController = exports.registerController = void 0;
const messages_1 = require("../constants/messages");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const registerController = async (req, res) => {
    const results = await auth_service_1.default.register(req.body);
    return res.json({
        message: messages_1.USERS_MESSAGE.REGISTER_SUCCESS,
        data: results
    });
};
exports.registerController = registerController;
const loginController = async (req, res) => {
    const { user } = req;
    const user_id = user._id;
    const { verify } = user;
    console.log('loginController ~ user', user);
    const results = await auth_service_1.default.login({ user_id: user_id.toString(), verify });
    return res.json({
        message: messages_1.USERS_MESSAGE.LOGIN_SUCCESS,
        data: { ...results, role: user.role }
    });
};
exports.loginController = loginController;
const logoutController = async (req, res) => {
    const { refresh_token } = req.body;
    const result = await auth_service_1.default.logout(refresh_token);
    return res.json({
        message: messages_1.USERS_MESSAGE.LOGOUT_SUCCESS,
        data: result
    });
};
exports.logoutController = logoutController;
const forgotPasswordController = async (req, res) => {
    const { _id, verify } = req.user;
    const result = await auth_service_1.default.forgotPassword({
        user_id: _id.toString(),
        verify
    });
    return res.json(result);
};
exports.forgotPasswordController = forgotPasswordController;
const verifyForgotPasswordController = async (req, res) => {
    return res.json({
        message: messages_1.USERS_MESSAGE.VERIFY_FORGOT_PASSWORD_SUCCESS
    });
};
exports.verifyForgotPasswordController = verifyForgotPasswordController;
const resetPasswordController = async (req, res) => {
    const { user_id } = req.decoded_forgot_password_token;
    const { password } = req.body;
    const result = await auth_service_1.default.resetPassword({ user_id, password });
    return res.json(result);
};
exports.resetPasswordController = resetPasswordController;
const emailVerifyController = async (req, res) => {
    const { user_id } = req.decoded_email_verify_token;
    return await auth_service_1.default.emailVerify(user_id, res);
};
exports.emailVerifyController = emailVerifyController;
const resendVerifyEmailController = async (req, res) => {
    const { user_id } = req.decode_authorization;
    return await auth_service_1.default.resendVerifyEmail(user_id, res);
};
exports.resendVerifyEmailController = resendVerifyEmailController;
const refreshTokenController = async (req, res) => {
    const { refresh_token } = req.body;
    const { user_id, verify, exp } = req.decode_refresh_token;
    const result = await auth_service_1.default.refreshToken({ user_id, verify, refresh_token, exp });
    return res.json({
        message: messages_1.USERS_MESSAGE.REFRESH_TOKEN_SUCCESS,
        result
    });
};
exports.refreshTokenController = refreshTokenController;
const changePasswordController = async (req, res) => {
    const { user_id } = req.decode_authorization;
    const { new_password } = req.body;
    await auth_service_1.default.changePassword(user_id, new_password);
    return res.json({
        message: messages_1.USERS_MESSAGE.CHANGE_PASSWORD_SUCCESS
    });
};
exports.changePasswordController = changePasswordController;
