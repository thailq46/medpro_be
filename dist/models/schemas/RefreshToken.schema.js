"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class RefreshToken {
    _id;
    user_id;
    token;
    created_at;
    iat;
    exp;
    constructor({ _id, user_id, token, created_at, iat, exp }) {
        this._id = _id || new mongodb_1.ObjectId();
        this.user_id = user_id;
        this.token = token;
        this.created_at = created_at || new Date();
        // Epoch time is in seconds, so we need to multiply by 1000 to convert to milliseconds
        // Epoch time có dạng 1713416024
        this.iat = new Date(iat * 1000); // Convert Epoch time to Date
        this.exp = new Date(exp * 1000); // Convert Epoch time to Date
    }
}
exports.default = RefreshToken;
