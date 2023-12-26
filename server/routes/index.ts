const clientRoutes = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
];

const adminRoutes = [

]

type PluginRoutes = {
  [key: string]: PluginScopeRoutes;
};

type PluginScopeRoutes = {
  type: string;
  routes: Array<any>;
};

const routes: PluginRoutes = {
  "content-api": {
    type: "content-api",
    routes: clientRoutes,
  },
//  admin: {
//    type: "admin",
//    routes: adminRoutes,
//  },
};

export default routes;