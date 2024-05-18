"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Doctor {
    _id;
    doctor_id;
    specialty_id;
    description;
    therapy;
    price;
    session;
    created_at;
    updated_at;
    constructor(doctor) {
        const date = new Date();
        this._id = doctor._id || new mongodb_1.ObjectId();
        this.doctor_id = doctor.doctor_id;
        this.specialty_id = doctor.specialty_id;
        this.description = doctor.description;
        this.therapy = doctor.therapy;
        this.price = doctor.price;
        this.session = doctor.session;
        this.created_at = doctor.created_at || date;
        this.updated_at = doctor.updated_at || date;
    }
}
exports.default = Doctor;
