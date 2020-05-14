import axios from 'axios'

export default {
  state: {
    follow: [],
    errorsFollow: []
  },
  getters: {
    follow: state => {
      return state.follow
    },
    errorsFollow: state => {
      return state.errorsFollow
    }
  },
  actions: {
    setFollow({commit}, data) {
      axios.post('follow', data)
        .then(() => commit('set_follow'))
        .catch((error) => commit('errors_follow', error.response.data.errors))
    }
  },
  mutations: {
    set_follow(state){
      state.follow = ++state.follow
    },
    errors_follow(state, errorsFollow) {
      state.errorsFollow = errorsFollow
    }
  }
}
