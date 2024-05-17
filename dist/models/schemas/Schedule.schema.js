"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Schedule {
    _id;
    doctor_id;
    current_number; // số bệnh nhân hiện tại
    max_number; // số bệnh nhân nhận max
    date; // ngày khám bệnh
    time_type; //TimeScheduleType[]
    created_at;
    updated_at;
    constructor({ date, doctor_id, max_number, time_type, _id, created_at, current_number, updated_at }) {
        const initDate = new Date();
        this._id = _id || new mongodb_1.ObjectId();
        this.doctor_id = doctor_id;
        this.current_number = current_number || 0;
        this.max_number = max_number;
        this.date = date;
        this.time_type = time_type;
        this.created_at = created_at || initDate;
        this.updated_at = updated_at || initDate;
    }
}
exports.default = Schedule;
