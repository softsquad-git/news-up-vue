import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
window.axios = axios;

let jwtToken = localStorage.getItem('token');
if (jwtToken){
  setHeaderToken();
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401) {
      refreshToken();
    }
  })
  if (localStorage.getItem('token') === undefined) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('darkMode');
    window.location.reload();
  }
}

function setHeaderToken() {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

function refreshToken() {
  axios.post('refresh-token')
    .then((data) => {
      localStorage.setItem('token', data.data.access_token);
      setHeaderToken();
    })
    .catch(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return this.$router.push({path: '/'});
    })
}
