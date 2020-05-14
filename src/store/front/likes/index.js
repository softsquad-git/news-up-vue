import axios from 'axios'

export default {
  state: {
    like: [],
    errorsLike: []
  },
  getters: {
    like: state => {
      return state.like
    },
    errorsLike: state => {
      return state.errorsLike
    }
  },
  actions: {
    setLike({commit}, data) {
      axios.post('like', data)
        .then(() => commit('set_like'))
        .catch((error) => commit('errors_like', error.response.data.errors))
    }
  },
  mutations: {
    set_like(state) {
      state.like = ++state.like
    },
    errors_like(state, errorsLike) {
      state.errorsLike = errorsLike
    }
  }
}
