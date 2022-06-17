import { route } from "quasar/wrappers";
import { CHECK_AUTH } from "src/store/actions.type";
import state from "src/store/module-example/state";
import { CLEAN_ERROR } from "src/store/mutations.type";

import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
  routerKey,
} from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store } /* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach(async (to, from) => {
    if (
      to.path !== "/login" &&
      to.path !== "/register" &&
      !store.getters["isAuthenticated"]
    ) {
      console.log(store.getters["isAuthenticated"]);
      return { path: "/login" };
    }
  });

  return Router;
});
