import axios from 'axios'

export default {
  state: {
    userFriends: [],
    sentInvitations: [],
    waitingInvitations: []
  },
  getters: {
    userFriends: state => {
      return state.userFriends
    },
    sentInvitations: state => {
      return state.sentInvitations
    },
    waitingInvitations: state => {
      return state.waitingInvitations
    }
  },
  actions: {
    getUserFriends({commit}, name) {
      axios.post(`user/friends?name=${name}`)
        .then((data) => commit('user_friends', data.data.data))
        .catch(() => {
        })
    },
    getSentInvitations({commit}) {
      axios.post('user/friends/sent')
        .then((data) => commit('user_sent_invitations', data.data.data))
        .catch(() => {})
    },
    getWaitingInvitations({commit}){
      axios.post('user/friends/waiting')
        .then((data) => commit('user_waiting_invitations', data.data.data))
        .catch(() => {})
    }
  },
  mutations: {
    user_friends(state, userFriends) {
      state.userFriends = userFriends
    },
    user_sent_invitations(state, sentInvitations){
      state.sentInvitations = sentInvitations
    },
    user_waiting_invitations(state, waitingInvitations){
      state.waitingInvitations = waitingInvitations
    }
  }
}
