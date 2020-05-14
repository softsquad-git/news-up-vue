import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

import routes from './routes'

Vue.use(VueRouter);
Vue.use(VueMeta);


export default function () {
  const DEFAULT_TITLE = 'News Up';
  const router = new VueRouter({
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  router.beforeEach((to, from, next) => {

    Vue.nextTick(() => {
      document.title = to.meta.title || DEFAULT_TITLE
    });

    if (to.meta.description) {
      document.description = to.meta.description
    }
    if (!to.meta.middleware) {
      return next();
    }

    const middleware = to.meta.middleware;

    const context = {
      to,
      from,
      next
    };

    return middleware[0]({
      ...context
    })
  });
  return router;
}
