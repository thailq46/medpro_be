"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Service {
    _id;
    name;
    hospital_id;
    specialty_id;
    description;
    note;
    price;
    session;
    created_at;
    updated_at;
    constructor({ name, description, session, price, hospital_id, specialty_id, note, _id, created_at, updated_at }) {
        const date = new Date();
        this._id = _id || new mongodb_1.ObjectId();
        this.name = name;
        this.description = description;
        this.price = price;
        this.hospital_id = hospital_id;
        this.specialty_id = specialty_id || null;
        this.note = note || null;
        this.session = session;
        this.created_at = created_at || date;
        this.updated_at = updated_at || date;
    }
}
exports.default = Service;
