import axios from 'axios'

export default {
  state: {
    updateBasicDataU: [],
    tryUpdateEmailU: [],
    updateEmailU: []
  },
  getters: {
    updateBasicDataU: state => {
      return state.updateBasicDataU
    },
    tryUpdateEmailU: state => {
      return state.tryUpdateEmailU
    },
    updateEmailU: state => {
      return state.updateEmailU
    }
  },
  actions: {
    updateBasicDataACTION({commit}, data) {
      axios.post('user/settings/basic-data', data)
        .then(() => commit('update_basic_data_user'))
        .catch(() => {
        })
    },
    tryUpdateEmailACTION({commit}, data){
      axios.post('user/settings/try-update-email', data)
        .then(() => commit('try_update_email_user'))
        .catch(() => {})
    },
    updateEmailACTION({commit}, data){
      axios.post('user/settings/update-email', data)
        .then(() => commit('update_email_user'))
        .catch(() => {})
    }
  },
  mutations: {
    update_basic_data_user(state) {
      state.updateBasicDataU = ++state.updateBasicDataU
    },
    try_update_email_user(state) {
      state.tryUpdateEmailU = ++state.tryUpdateEmailU
    },
    update_email_user(state) {
      state.updateEmailU = ++state.updateEmailU
    }
  }
}
