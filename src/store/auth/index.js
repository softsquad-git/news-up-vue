import axios from "axios";
import Vue from 'vue';

export default {
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    register: []
  },
  getters: {
    register: state => {
      return state.register
    },
    user: state => {
      return state.user
    }
  },
  actions: {
    login({commit}, data) {
      axios.post('auth/login', data)
        .then((data) => {
          let token = data.data.access_token;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', data.data.user_id);
          Vue.prototype.$user_id = localStorage.getItem('userId');
          commit('auth_success', token)
        })
    },
    registerACTION({commit}, data) {
      axios.post('auth/register', data)
        .then((data) => {
          commit('register_success', data.data.item)
        })
    },
    getLoggedUser({commit}) {
      axios.post('user')
        .then((data) => commit('get_user', data.data.data))
        .catch(() => {
        })
    }
  },
  mutations: {
    auth_error(state) {
      state.status = 'error';
    },
    auth_success(state, token) {
      state.status = 'success';
      state.token = token;
      window.location.reload();
    },
    auth_request(state) {
      state.status = 'loading';
    },
    register_success(state, item) {
      state.register = ++state.register;
    },
    get_user(state, user) {
      state.user = user;
    }
  }
}
