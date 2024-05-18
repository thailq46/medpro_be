"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Hospital {
    _id;
    categoryId;
    name;
    slug;
    description;
    session; // Thời gian làm việc : Thứ 2 -> Thứ 6
    start_time; // "08:00"
    end_time; // "17:30"
    hotline;
    address;
    avatar;
    banner;
    images;
    booking_forms;
    types;
    created_at;
    updated_at;
    constructor({ address, categoryId, name, types, _id, avatar, banner, description, created_at, end_time, hotline, images, session, slug, booking_forms, start_time, updated_at }) {
        const date = new Date();
        this._id = _id || new mongodb_1.ObjectId();
        this.categoryId = categoryId;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.session = session || '';
        this.start_time = start_time || '';
        this.end_time = end_time || '';
        this.hotline = hotline || '';
        this.address = address;
        this.avatar = avatar || null;
        this.banner = banner || null;
        this.images = images || null;
        this.types = types;
        this.booking_forms = booking_forms;
        this.created_at = created_at || date;
        this.updated_at = updated_at || date;
    }
}
exports.default = Hospital;
