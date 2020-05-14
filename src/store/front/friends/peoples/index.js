import axios from 'axios'

export default {
  state: {
    peoples: []
  },
  getters: {
    peoples: state => {
      return state.peoples
    }
  },
  actions: {
    getAllPeoples({commit}, params){
      axios.post(`peoples?name=${params.name}`)
        .then((data) => commit('get_all_peoples', data.data.data))
        .catch(() => {})
    }
  },
  mutations: {
    get_all_peoples(state, peoples){
      state.peoples = peoples;
    }
  }
}
