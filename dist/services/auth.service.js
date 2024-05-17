"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = require("../constants/config");
const enum_1 = require("../constants/enum");
const messages_1 = require("../constants/messages");
const RefreshToken_schema_1 = __importDefault(require("../models/schemas/RefreshToken.schema"));
const User_schema_1 = __importDefault(require("../models/schemas/User.schema"));
const database_service_1 = __importDefault(require("../services/database.service"));
const crypto_1 = require("../utils/crypto");
const email_1 = require("../utils/email");
const jwt_1 = require("../utils/jwt");
class UsersService {
    async signAccessToken({ user_id, verify }) {
        return await (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enum_1.TokenType.AccessToken,
                verify
            },
            secretOrPrivateKey: config_1.envConfig.jwtSecretAccessToken,
            options: { expiresIn: config_1.envConfig.jwtAccessTokenExpiresIn }
        });
    }
    async signRefreshToken({ user_id, verify, exp }) {
        // When getting a new refresh token, the exp field must match the old refresh token
        if (exp) {
            return await (0, jwt_1.signToken)({
                payload: {
                    user_id,
                    token_type: enum_1.TokenType.RefreshToken,
                    verify,
                    exp
                },
                secretOrPrivateKey: config_1.envConfig.jwtSecretRefreshToken
            });
        }
        return await (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enum_1.TokenType.RefreshToken,
                verify
            },
            secretOrPrivateKey: config_1.envConfig.jwtSecretRefreshToken,
            options: { expiresIn: config_1.envConfig.jwtRefreshTokenExpiresIn }
        });
    }
    signAccessTokenAndRefreshToken({ user_id, verify }) {
        return Promise.all([this.signAccessToken({ user_id, verify }), this.signRefreshToken({ user_id, verify })]);
    }
    decodeRefreshToken(refresh_token) {
        return (0, jwt_1.verifyToken)({
            token: refresh_token,
            secretOrPrivateKey: config_1.envConfig.jwtSecretRefreshToken
        });
    }
    signForgotPasswordToken({ user_id, verify }) {
        return (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enum_1.TokenType.ForgotPasswordToken,
                verify
            },
            secretOrPrivateKey: config_1.envConfig.jwtSecretForgotPasswordToken,
            options: { expiresIn: config_1.envConfig.jwtForgotPasswordTokenExpiresIn }
        });
    }
    signEmailVerifyToken({ user_id, verify }) {
        return (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enum_1.TokenType.EmailVerifyToken,
                verify
            },
            secretOrPrivateKey: config_1.envConfig.jwtSecretEmailVerifyToken,
            options: { expiresIn: config_1.envConfig.jwtEmailVerifyTokenExpiresIn }
        });
    }
    async register(payload) {
        const user_id = new mongodb_1.ObjectId();
        const email_verify_token = await this.signEmailVerifyToken({
            user_id: user_id.toString(),
            verify: enum_1.UserVerifyStatus.Unverified
        });
        await database_service_1.default.users.insertOne(new User_schema_1.default({
            ...payload,
            _id: user_id,
            username: `user${user_id.toString()}`,
            email_verify_token,
            password: (0, crypto_1.hashPassword)(payload.password),
            date_of_birth: new Date(payload.date_of_birth)
        }));
        const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
            user_id: user_id.toString(),
            verify: enum_1.UserVerifyStatus.Unverified
        });
        const { iat, exp } = await this.decodeRefreshToken(refresh_token);
        await database_service_1.default.refreshTokens.insertOne(new RefreshToken_schema_1.default({
            user_id,
            token: refresh_token,
            iat,
            exp
        }));
        await (0, email_1.sendMail)({
            to: payload.email,
            subject: 'Verify email',
            htmlContent: `<a href="http://localhost:${config_1.envConfig.port}/verify-email?token=${email_verify_token}"> Verify Email nek</a>`
        });
        return {
            access_token,
            refresh_token,
            email_verify_token
        };
    }
    async login({ user_id, verify }) {
        const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
            user_id,
            verify
        });
        const { iat, exp } = await this.decodeRefreshToken(refresh_token);
        await database_service_1.default.refreshTokens.insertOne(new RefreshToken_schema_1.default({
            user_id: new mongodb_1.ObjectId(user_id),
            token: refresh_token,
            iat,
            exp
        }));
        return {
            access_token,
            refresh_token
        };
    }
    async logout(refresh_token) {
        return await database_service_1.default.refreshTokens.deleteOne({ token: refresh_token });
    }
    async forgotPassword({ user_id, verify }) {
        const forgot_password_token = await this.signForgotPasswordToken({ user_id, verify });
        await database_service_1.default.users.updateOne({
            _id: new mongodb_1.ObjectId(user_id)
        }, [{ $set: { forgot_password_token, updated_at: '$$NOW' } }]);
        // Giả bộ gửi email kèm đường link đến email người dùng: https://example.com/reset-password?token=<forgot_password_token>
        console.log('forgot_password_token', forgot_password_token);
        return {
            message: messages_1.USERS_MESSAGE.CHECK_EMAIL_TO_RESET_PASSWORD
        };
    }
    async resetPassword({ user_id, password }) {
        await database_service_1.default.users.updateOne({
            _id: new mongodb_1.ObjectId(user_id)
        }, [{ $set: { password: (0, crypto_1.hashPassword)(password), updated_at: '$$NOW' } }]);
        return {
            message: messages_1.USERS_MESSAGE.RESET_PASSWORD_SUCCESS
        };
    }
    async emailVerify(user_id, res) {
        const user = await database_service_1.default.users.findOne({ _id: new mongodb_1.ObjectId(user_id) });
        if (!user) {
            return res.json({
                message: messages_1.USERS_MESSAGE.USER_NOT_FOUND
            });
        }
        if (user.email_verify_token === '' || user.verify === enum_1.UserVerifyStatus.Verified) {
            return res.json({
                message: messages_1.USERS_MESSAGE.EMAIL_ALREADY_VERIFIED_BEFORE
            });
        }
        const result = await database_service_1.default.users.updateOne({
            _id: new mongodb_1.ObjectId(user_id)
        }, [{ $set: { email_verify_token: '', verify: enum_1.UserVerifyStatus.Verified, updated_at: '$$NOW' } }]);
        return res.json({
            message: messages_1.USERS_MESSAGE.EMAIL_VERIFY_SUCCESS,
            data: result
        });
    }
    async resendVerifyEmail(user_id, res) {
        const user = await database_service_1.default.users.findOne({ _id: new mongodb_1.ObjectId(user_id) });
        if (!user) {
            return res.json({ message: messages_1.USERS_MESSAGE.USER_NOT_FOUND });
        }
        if (user.verify === enum_1.UserVerifyStatus.Verified) {
            return res.json({ message: messages_1.USERS_MESSAGE.EMAIL_ALREADY_VERIFIED_BEFORE });
        }
        const email_verify_token = await this.signEmailVerifyToken({
            user_id,
            verify: enum_1.UserVerifyStatus.Verified
        });
        const result = await database_service_1.default.users.updateOne({
            _id: new mongodb_1.ObjectId(user_id)
        }, [{ $set: { email_verify_token, updated_at: '$$NOW' } }]);
        // Giả bộ gửi email kèm đường link đến email người dùng: https://example.com/verify-email?token=<email_verify_token>
        console.log('email_verify_token', email_verify_token);
        await (0, email_1.sendMail)({
            to: user.email,
            subject: 'Verify email',
            htmlContent: `<a href="http://localhost:${config_1.envConfig.port}/verify-email?token=${email_verify_token}"> Verify Email nek</a>`
        });
        return res.json({
            message: messages_1.USERS_MESSAGE.RESEND_EMAIL_VERIFY_SUCCESS
            // data: result
        });
    }
    async refreshToken({ user_id, verify, refresh_token, exp }) {
        const [new_access_token, new_refresh_token] = await Promise.all([
            this.signAccessToken({ user_id, verify }),
            this.signRefreshToken({ user_id, verify, exp }),
            database_service_1.default.refreshTokens.deleteOne({ token: refresh_token })
        ]);
        const decoded_refresh_token = await this.decodeRefreshToken(new_refresh_token);
        await database_service_1.default.refreshTokens.insertOne(new RefreshToken_schema_1.default({
            user_id: new mongodb_1.ObjectId(user_id),
            token: new_refresh_token,
            iat: decoded_refresh_token.iat,
            exp: decoded_refresh_token.exp
        }));
        return {
            new_access_token,
            new_refresh_token
        };
    }
    async changePassword(user_id, new_password) {
        return await database_service_1.default.users.findOneAndUpdate({ _id: new mongodb_1.ObjectId(user_id) }, [
            { $set: { password: (0, crypto_1.hashPassword)(new_password), updated_at: '$$NOW' } }
        ]);
    }
    async checkEmailExist(email) {
        try {
            const user = await database_service_1.default.users.findOne({ email });
            return Boolean(user);
        }
        catch (error) {
            console.log('Failed to check user exists', error);
        }
    }
}
const authService = new UsersService();
exports.default = authService;
