import { Strapi } from "@strapi/strapi";
// import { Event } from "@strapi/database/lib/lifecycles";
// import { Subscriber } from "@strapi/database/lib/lifecycles/subscribers";
import { validateSchemaModule } from "./validation";

const createSubscriber = (strapi: Strapi): unknown => {
  // const db = strapi.db.connection;

  return {
    beforeCreate: async (event: unknown) => {
      // const { model } = event;
      validateSchemaModule(event)
    },

    afterCreate: async (event: unknown) => {
      validateSchemaModule(event)
    },

    beforeUpdate: async (event: unknown) => {
        validateSchemaModule(event)
    },
    
    afterUpdate: async (event: unknown) => {
        validateSchemaModule(event)
    },

  };
};

export default createSubscriber;