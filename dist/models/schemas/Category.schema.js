"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Category {
    _id;
    name;
    slug;
    parent_id;
    created_at;
    updated_at;
    constructor({ name, slug, parent_id, _id, created_at, updated_at }) {
        const date = new Date();
        this._id = _id || new mongodb_1.ObjectId();
        this.name = name;
        this.slug = slug;
        this.parent_id = parent_id || null;
        this.created_at = created_at || date;
        this.updated_at = updated_at || date;
    }
}
exports.default = Category;
