"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lifecycles_1 = __importDefault(require("./utils/lifecycles"));
exports.default = async ({ strapi }) => {
    // const db = strapi.db.connection;
    const subscriber = (0, lifecycles_1.default)(strapi);
    //@ts-ignore
    strapi.db.lifecycles.subscribe(subscriber);
};
