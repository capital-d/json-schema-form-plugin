import { Strapi } from '@strapi/strapi';
import pluginPkg from "../package.json";
import pluginId from "../admin/src/pluginId";

export default ({ strapi }: { strapi: Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: pluginPkg.strapi.name,
    plugin: pluginId,
    type: "json",
  });
};