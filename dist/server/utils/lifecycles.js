"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Event } from "@strapi/database/lib/lifecycles";
// import { Subscriber } from "@strapi/database/lib/lifecycles/subscribers";
const validation_1 = require("./validation");
const createSubscriber = (strapi) => {
    // const db = strapi.db.connection;
    return {
        beforeCreate: async (event) => {
            // const { model } = event;
            (0, validation_1.validateSchemaModule)(event);
        },
        afterCreate: async (event) => {
            (0, validation_1.validateSchemaModule)(event);
        },
        beforeUpdate: async (event) => {
            (0, validation_1.validateSchemaModule)(event);
        },
        afterUpdate: async (event) => {
            (0, validation_1.validateSchemaModule)(event);
        },
    };
};
exports.default = createSubscriber;
