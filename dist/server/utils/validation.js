"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaModule = void 0;
const utils_1 = require("@strapi/utils/");
const ajv_1 = __importDefault(require("ajv"));
const { ValidationError } = utils_1.errors;
const validateSchemaModule = (event) => {
    const { params } = event;
    const { data } = params;
    // eslint-disable-next-line camelcase
    const { Schema: schema, Data: toValidate } = data;
    console.log('lifecycles', schema, toValidate);
    if (schema && toValidate) {
        const ajv = new ajv_1.default();
        const validate = ajv.compile(schema);
        const valid = validate(toValidate);
        if (!valid) {
            throw new ValidationError(`Não é possível salvar o conteúdo dessa forma!`);
        }
    }
};
exports.validateSchemaModule = validateSchemaModule;
