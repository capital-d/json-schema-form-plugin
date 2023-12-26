"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const adminRoutes = [];
const routes = {
    "content-api": {
        type: "content-api",
        routes: clientRoutes,
    },
    //  admin: {
    //    type: "admin",
    //    routes: adminRoutes,
    //  },
};
exports.default = routes;
