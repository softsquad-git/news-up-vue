import axios from 'axios';

export default {
  state: {
    _userArticles: [],
    _userCreateArticle: [],
    _userRemoveArticle: 0,
    _userArchiveArticle: 0,
    _userShowArticle: {},
    _userCategoriesArticle: [],
    _userUpdateArticle: [],
    _userErrorsArticle: []
  },
  getters: {
    _userArticles: state => {
      return state._userArticles
    },
    _userCreateArticle: state => {
      return state._userCreateArticle
    },
    _userRemoveArticle: state => {
      return state._userRemoveArticle
    },
    _userArchiveArticle: state => {
      return state._userArchiveArticle
    },
    _userShowArticle: state => {
      return state._userShowArticle
    },
    _userCategoriesArticle: state => {
      return state._userCategoriesArticle
    },
    _userUpdateArticle: state => {
      return state._userUpdateArticle
    },
    _userErrorsArticle: state => {
      return state._userErrorsArticle
    }
  },
  actions: {
    userCreateArticleACTION({commit}, data) {
      axios.post('  http://127.0.0.1:8000/api/user/articles/store', data)
        .then((data) => {
          commit('user_create_article', data.data.item)
        })
        .catch((error) => commit('user_errors_articles', error.response.data.errors))
    },
    userArticlesACTION({commit}, search) {
      axios.post(`user/articles?status=${search}`)
        .then((data) => {
          commit('user_articles', data.data.data)
        })
        .catch()
    },
    userRemoveArticleACTION({commit}, id) {
      axios.post(`user/articles/remove/${id}`)
        .then(() => commit('user_remove_article'))
        .catch()
    },
    userArchiveArticleACTION({commit}, id) {
      axios.post(`user/articles/archive/${id}`)
        .then(() => {
          commit('user_archive_article')
        })
        .catch()
    },
    userShowArticleACTION({commit}, id) {
      axios.post(`user/articles/item/${id}`)
        .then((data) => {
          commit('user_show_article', data.data.data)
        })
        .catch(() => {
        })
    },
    userCategoriesArticleACTION({commit}) {
      axios.post('user/articles/categories')
        .then((data) => {
          commit('user_categories_article', data.data.data)
        })
        .catch(() => {
        })
    },
    userUpdateArticleACTION({commit}, data) {
      axios.post(`user/articles/update/${data.id}`, data)
        .then(() => {
          commit('user_update_article')
        })
        .catch((error) => commit('user_errors_articles', error.response.data.errors))
    }
  },
  mutations: {
    user_create_article(state) {
      state._userCreateArticle = ++state._userCreateArticle
    },
    user_articles(state, _userArticles) {
      state._userArticles = _userArticles;
    },
    user_remove_article(state) {
      state._userRemoveArticle = ++state._userRemoveArticle
    },
    user_archive_article(state) {
      state._userArchiveArticle = ++state._userArchiveArticle
    },
    user_show_article(state, _userShowArticle) {
      state._userShowArticle = _userShowArticle
    },
    user_categories_article(state, _userCategoriesArticle) {
      state._userCategoriesArticle = _userCategoriesArticle
    },
    user_update_article(state){
      state._userUpdateArticle = ++state._userUpdateArticle;
    },
    user_errors_articles(state, _userErrorsArticle){
      state._userErrorsArticle = _userErrorsArticle
    }
  }
}
