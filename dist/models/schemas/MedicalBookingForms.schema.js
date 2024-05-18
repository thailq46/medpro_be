"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MedicalBookingForms {
    _id;
    name;
    slug;
    image;
    created_at;
    updated_at;
    constructor({ _id, name, image, created_at, updated_at, slug }) {
        const date = new Date();
        this._id = _id || new mongodb_1.ObjectId();
        this.name = name;
        this.slug = slug;
        this.image = image || null;
        this.created_at = created_at || date;
        this.updated_at = updated_at || date;
    }
}
exports.default = MedicalBookingForms;
