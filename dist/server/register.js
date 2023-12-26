"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../package.json"));
const pluginId_1 = __importDefault(require("../admin/src/pluginId"));
exports.default = ({ strapi }) => {
    // register phase
    strapi.customFields.register({
        name: package_json_1.default.strapi.name,
        plugin: pluginId_1.default,
        type: "json",
    });
};
