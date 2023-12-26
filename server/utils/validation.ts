import { errors } from "@strapi/utils/"
import Ajv from "ajv"

const { ValidationError } = errors

const validateSchemaModule = (event) => {
    const { params } = event;
    const { data } = params;
    // eslint-disable-next-line camelcase
    const { Schema: schema, Data: toValidate } = data;

    console.log('lifecycles', schema, toValidate)

    if (schema && toValidate) {

        const ajv = new Ajv()
        const validate = ajv.compile(schema)
        const valid = validate(toValidate)
        if (!valid) {

            throw new ValidationError(
                `Não é possível salvar o conteúdo dessa forma!`,
            );
        }

    }

};

export { validateSchemaModule }