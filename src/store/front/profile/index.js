import axios from 'axios'

export default {
  state: {
    userP: {},
    articlesUserP: [],
    photosUserP: [],
    albumsUserP: []
  },
  getters: {
    userP: state => {
      return state.userP
    },
    articlesUserP: state => {
      return state.articlesUserP
    },
    photosUserP: state => {
      return state.photosUserP
    },
    albumsUserP: state => {
      return state.albumsUserP
    }
  },
  actions: {
    getUserP({commit}, id)
    {
      axios.post(`profile-page/user/${id}`)
        .then((data) => commit('get_user_p', data.data.data))
        .catch(() => {})
    },
    getArticlesUserP({commit}, params)
    {
      axios.post('profile-page/articles?user_id='+params.user_id+'&title='+params.title+'&category_id='+params.category_id)
        .then((data) => commit('get_articles_user_p', data.data.data))
        .catch(() => {})
    },
    getAlbumsUserP({commit}, user_id)
    {
      axios.post(`profile-page/albums?user_id=${user_id}`)
        .then((data) => commit('get_albums_user_p', data.data.data))
        .catch(() => {})
    }
  },
  mutations: {
    get_user_p(state, userP){
      state.userP = userP
    },
    get_articles_user_p(state, articlesUserP){
      state.articlesUserP = articlesUserP
    },
    get_albums_user_p(state, albumsUserP){
      state.albumsUserP = albumsUserP
    }
  }
}
