import { Strapi } from '@strapi/strapi';
import createSubscriber from './utils/lifecycles';

export default async ({ strapi }: { strapi: Strapi }) => {

  // const db = strapi.db.connection;

  const subscriber = createSubscriber(strapi);
  //@ts-ignore
  strapi.db.lifecycles.subscribe(subscriber);

};