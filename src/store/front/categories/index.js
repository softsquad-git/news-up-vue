import axios from 'axios'

export default {
  state: {
    categories: []
  },
  getters: {
    categories: state => {
      return state.categories
    }
  },
  actions: {
    getCategories({commit}) {
      axios.post('categories-all')
        .then((data) => commit('get_categories', data.data.data))
        .catch(() => {
        })
    }
  },
  mutations: {
    get_categories(state, categories) {
      state.categories = categories
    }
  }
}
