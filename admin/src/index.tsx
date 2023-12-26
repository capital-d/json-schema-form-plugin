import { prefixPluginTranslations } from '@strapi/helper-plugin'

import pluginPkg from '../../package.json'
import pluginId from './pluginId'
import Initializer from './components/Initializer'
import PluginIcon from './components/PluginIcon'

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    }

    app.customFields.register({
      name: name,
      pluginId: pluginId, // the custom field is created by a color-picker plugin
      type: "json", // the color will be stored as a string
      intlLabel: {
        id: `${pluginId}.form.label`,
        defaultMessage: "Json form schema",
      },
      intlDescription: {
        id: `${pluginId}.form.description`,
        defaultMessage: "Json form schema",
      },
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "json-schema-form-component" */ "./components/JsonSchemaForm"
          ),
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: `${pluginId}.name.title`,
              defaultMessage: "Target",
            },
            items: [
              {
                intlLabel: {
                  id: `${pluginId}.name.label`,
                  defaultMessage: "target",
                },
                description: {
                  id: `${pluginId}.name.label.description`,
                  defaultMessage:
                    "Name of data",
                },
                name: "options.name",
                type: "text",
                value: "",
              },
              {
                intlLabel: {
                  id: `${pluginId}.schema.label`,
                  defaultMessage: "schema schema",
                },
                description: {
                  id: `${pluginId}.schema.description`,
                  defaultMessage:
                    "Name of attribute in target collection that is going to be displayed as option name",
                },
                name: "options.schema",
                type: "json",
                value: {},
              }
            ],
          }
        ],  
      },
    });

    app.registerPlugin(plugin)

  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app

    const importedTrads = await Promise.all(
      (locales as any[]).map(async (locale) => {
        return await import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            }
          })
          .catch(() => {
            return {
              data: {},
              locale,
            }
          })
      }),
    )

    return await Promise.resolve(importedTrads)
  },
}
