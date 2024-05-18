"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const enum_1 = require("../../constants/enum");
class User {
    _id;
    name;
    email;
    date_of_birth;
    gender;
    password;
    created_at;
    updated_at;
    forgot_password_token;
    email_verify_token;
    verify;
    address;
    username;
    avatar;
    role;
    phone_number;
    position;
    constructor(user) {
        const date = new Date();
        this._id = user._id || new mongodb_1.ObjectId();
        this.name = user.name;
        this.email = user.email;
        this.date_of_birth = user.date_of_birth || new Date();
        this.gender = user.gender || enum_1.GenderType.Male;
        this.password = user.password;
        this.created_at = user.created_at || date;
        this.updated_at = user.updated_at || date;
        this.forgot_password_token = user.forgot_password_token || '';
        this.email_verify_token = user.email_verify_token || '';
        this.address = user.address || '';
        this.username = user.username || '';
        this.avatar = user.avatar || '';
        this.role = user.role || enum_1.RoleType.User;
        this.phone_number = user.phone_number || '';
        this.position = user.position || enum_1.PositionType.None;
        this.verify = user.verify || enum_1.UserVerifyStatus.Unverified;
    }
}
exports.default = User;
