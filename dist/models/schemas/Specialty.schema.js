"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Specialty {
    _id;
    hospital_id;
    name;
    slug;
    description;
    created_at;
    updated_at;
    constructor({ name, description, hospital_id, slug, _id, created_at, updated_at }) {
        const date = new Date();
        this._id = _id || new mongodb_1.ObjectId();
        this.name = name;
        this.description = description;
        this.hospital_id = hospital_id;
        this.slug = slug;
        this.created_at = created_at || date;
        this.updated_at = updated_at || date;
    }
}
exports.default = Specialty;
