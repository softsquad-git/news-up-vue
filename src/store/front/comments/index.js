import axios from 'axios'

export default {
  state: {
    allComments: [],
    createComment: [],
    updateComment: [],
    removeComment: 0,
    allAnswersComment: [],
    createReplyComment: [],
    updateReplyComment: [],
    removeReplyComment: 0,
    errorsComment: []
  },
  getters: {
    allComments: state => {
      return state.allComments
    },
    createComment: state => {
      return state.createComment
    },
    updateComment: state => {
      return state.updateComment
    },
    removeComment: state => {
      return state.removeComment
    },
    allAnswersComment: state => {
      return state.allAnswersComment
    },
    createReplyComment: state => {
      return state.createReplyComment
    },
    updateReplyComment: state => {
      return state.updateReplyComment
    },
    removeReplyComment: state => {
      return state.removeReplyComment
    },
    errorsComment: state => {
      return state.errorsComment
    }
  },
  actions: {
    getComments({commit}, params) {
      axios.post(`comments?resource_id=${params.resource_id}&resource_type=${params.resource_type}`)
        .then((data) => commit('all_comments', data.data.data))
        .catch(() => {
        })
    },
    storeComment({commit}, data) {
      axios.post('comments/store', data)
        .then(() => commit('create_comment'))
        .catch((error) => commit('errors_comment', error.response.data.errors))
    },
    putComment({commit}, data) {
      axios.post(`comments/update/${data.id}`, data)
        .then(() => commit('update_comment'))
        .catch((error) => commit('errors_comment', error.response.data.errors))
    },
    destroyComment({commit}, id) {
      axios.post(`comments/remove/${id}`)
        .then(() => commit('remove_comment'))
        .catch(() => {
        })
    },
    getAnswers({commit}, id) {
      axios.post(`comments/answers/${id}`)
        .then((data) => commit('all_answers_comment', data.data.data))
        .catch(() => {
        })
    },
    storeReply({commit}, data) {
      axios.post('comments/reply/store', data)
        .then(() => commit('create_reply_comment'))
        .catch((error) => commit('errors_comment', error.response.data.errors))
    },
    putReplyComment({commit}, data) {
      axios.post(`comments/reply/update/${data.id}`, data)
        .then(() => commit('update_reply_comment'))
        .catch((error) => commit('errors_comment', error.response.data.errors))
    },
    destroyReplyComment({commit}, id) {
      axios.post(`comments/reply/remove/${id}`)
        .then(() => commit('remove_reply_comment'))
        .catch(() => {
        })
    }
  },
  mutations: {
    all_comments(state, allComments) {
      state.allComments = allComments
    },
    create_comment(state) {
      state.createComment = ++state.createComment
    },
    update_comment(state) {
      state.updateComment = ++state.updateComment
    },
    remove_comment(state) {
      state.removeComment = ++state.removeComment
    },
    all_answers_comment(state, allAnswersComment) {
      state.allAnswersComment = allAnswersComment
    },
    create_reply_comment(state) {
      state.createReplyComment = ++state.createReplyComment
    },
    update_reply_comment(state) {
      state.updateReplyComment = ++state.updateReplyComment
    },
    remove_reply_comment(state) {
      state.removeReplyComment = ++state.removeReplyComment
    },
    errors_comment(state, errorsComment) {
      state.errorsComment = errorsComment
    }
  }
}
