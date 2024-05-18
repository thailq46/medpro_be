"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const database_service_1 = __importDefault(require("../services/database.service"));
class UsersService {
    async getMe(user_id) {
        const user = await database_service_1.default.users.findOne({ _id: new mongodb_1.ObjectId(user_id) }, {
            // Những field nào mà không muốn trả về cho user thì dùng projection để loại bỏ
            projection: {
                password: 0,
                email_verify_token: 0,
                forgot_password_token: 0
            }
        });
        return user;
    }
    async updateMe(user_id, payload) {
        const _payload = payload.date_of_birth ? { ...payload, date_of_birth: new Date(payload.date_of_birth) } : payload;
        const user = await database_service_1.default.users.findOneAndUpdate({ _id: new mongodb_1.ObjectId(user_id) }, [
            {
                $set: {
                    ..._payload,
                    updated_at: '$$NOW'
                }
            }
        ], {
            returnDocument: 'after',
            projection: {
                password: 0,
                email_verify_token: 0,
                forgot_password_token: 0
            }
        });
        return user;
    }
    async getListUsers() {
        const users = await database_service_1.default.users.find({}, {
            projection: {
                password: 0,
                email_verify_token: 0,
                forgot_password_token: 0
            }
        });
        return users.toArray();
    }
    async getUserByUsername(username) {
        return await database_service_1.default.users.findOne({ username }, {
            projection: {
                password: 0,
                email_verify_token: 0,
                forgot_password_token: 0
            }
        });
    }
    async updateUserByUsername(username, payload) {
        const _payload = payload.date_of_birth ? { ...payload, date_of_birth: new Date(payload.date_of_birth) } : payload;
        const user = await database_service_1.default.users.findOneAndUpdate({ username }, [
            {
                $set: {
                    ..._payload,
                    updated_at: '$$NOW'
                }
            }
        ], {
            returnDocument: 'after',
            projection: {
                password: 0,
                email_verify_token: 0,
                forgot_password_token: 0
            }
        });
        return user;
    }
    async deleteUserByUsername(username) {
        const user = await database_service_1.default.users.findOneAndDelete({ username });
        return user;
    }
}
const usersService = new UsersService();
exports.default = usersService;
