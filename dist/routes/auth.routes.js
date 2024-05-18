"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const handlers_1 = require("../utils/handlers");
const authRouter = (0, express_1.Router)();
/**
 * Desscription: Register new user
 * Path: /auth/register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601, gender: GenderType }
 */
authRouter.post('/register', auth_middlewares_1.registerValidator, (0, handlers_1.wrapRequestHandler)(auth_controllers_1.registerController));
/**
 * Desscription: Login user
 * Path: /auth/login
 * Method: POST
 * Body: { email: string, password: string }
 */
authRouter.post('/login', auth_middlewares_1.loginValidator, (0, handlers_1.wrapRequestHandler)(auth_controllers_1.loginController));
/**
 * Desscription: Logout user
 * Path: /auth/logout
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
authRouter.post('/logout', auth_middlewares_1.accessTokenValidator, auth_middlewares_1.refreshTokenValidator, (0, handlers_1.wrapRequestHandler)(auth_controllers_1.logoutController));
/**
 * Desscription: Submit email to reset password, then send email to user
 * Path: /auth/forgot-password
 * Method: POST
 * Body: { email: string }
 */
authRouter.post('/forgot-password', auth_middlewares_1.forgotPasswordValidator, (0, handlers_1.wrapRequestHandler)(auth_controllers_1.forgotPasswordController));
/**
 * Desscription: Verify link in email to reset password
 * Path: /auth/verify-forgot-password
 * Method: POST
 * Body: { forgot_password_token: string }
 */
authRouter.post('/verify-forgot-password', auth_middlewares_1.verifyForgotPasswordTokenValidator, (0, handlers_1.wrapRequestHandler)(auth_controllers_1.verifyForgotPasswordController));
/**
 * Desscription: Reset password
 * Path: /auth/reset-password
 * Method: POST
 * Body: { forgot_password_token: string, password: string, confirm_password: string }
 */
authRouter.post('/reset-password', auth_middlewares_1.resetPasswordValidator, (0, handlers_1.wrapRequestHandler)(auth_controllers_1.resetPasswordController));
/**
 * Desscription: Verify email when user client click on the link in email
 * Path: /auth/verify-email
 * Method: POST
 * Body: { email_verify_token : string }
 */
authRouter.post('/verify-email', auth_middlewares_1.emailVerifyTokenValidator, (0, handlers_1.wrapRequestHandler)(auth_controllers_1.emailVerifyController));
/**
 * Desscription: Verify email when user client click on the link in email
 * Path: /auth/resend-verify-email
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: {}
 */
authRouter.post('/resend-verify-email', auth_middlewares_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(auth_controllers_1.resendVerifyEmailController));
/**
 * Desscription: Refresh Token
 * Path: /auth/refresh-token
 * Method: POST
 * Body: { refresh_token: string }
 */
authRouter.post('/refresh-token', auth_middlewares_1.refreshTokenValidator, (0, handlers_1.wrapRequestHandler)(auth_controllers_1.refreshTokenController));
/**
 * Desscription: Change password
 * Path: /auth/change-password
 * Method: PUT
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { old_password: string, new_password: string, confirm_new_password: string }
 */
authRouter.put('/change-password', auth_middlewares_1.accessTokenValidator, auth_middlewares_1.changePasswordValidator, (0, handlers_1.wrapRequestHandler)(auth_controllers_1.changePasswordController));
exports.default = authRouter;
