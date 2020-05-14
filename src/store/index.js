import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import _user_article from './user/articles'
import _front_articles from './front/articles'
import comments from './front/comments'
import like from './front/likes'
import follow from './front/follows'
import profile_page from './front/profile'
import categories from './front/categories'
import user_settings from './user/settings'
import user_photos from './user/photos'
import peoples from './front/friends/peoples'
import friends from './friends'
import user_friends from './user/friends'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      _user_article,
      _front_articles,
      comments,
      like,
      follow,
      profile_page,
      categories,
      user_settings,
      user_photos,
      peoples,
      friends,
      user_friends
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
