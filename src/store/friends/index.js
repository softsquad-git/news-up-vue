import axios from 'axios'

export default {
  state: {
    sendInvitation: []
  },
  getters: {
    sendInvitation: state => {
      return state.sendInvitation
    }
  },
  actions: {
    sendInvitationACTION({commit}, data) {
      axios.post('user/friends/add', data)
        .then(() => commit('add_friend'))
        .catch(() => {
        })
    }
  },
  mutations: {
    add_friend(state) {
      state.sendInvitation = ++state.sendInvitation
    }
  }
}
