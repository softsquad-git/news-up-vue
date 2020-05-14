import axios from 'axios'

export default {
  state: {
    articles: [],
    article: {},
    rating: [],
    errors_rating: []
  },
  getters: {
    articles: state => {
      return state.articles
    },
    article: state => {
      return state.article
    },
    rating: state => {
      return state.rating
    },
    errors_rating: state => {
      return state.errors_rating
    }
  },
  actions: {
    getArticles({commit}, search) {
      axios.post(`articles?title=${search.title}&category=${search.category}&location=${search.location}`)
        .then((data) => commit('articles', data.data.data))
        .catch(() => {
        })
    },
    getArticle({commit}, id) {
      axios.post(`article/${id}`)
        .then((data) => commit('article', data.data.data))
        .catch(() => {
        })
    },
    setRatingArticle({commit}, data){
      axios.post('article-rating', data)
        .then(() => commit('set_rating'))
        .catch((error) => commit('errors_ratings', error.response.data.errors))
    }
  },
  mutations: {
    articles(state, articles) {
      state.articles = articles
    },
    article(state, article) {
      state.article = article
    },
    set_rating(state){
      state.rating = ++state.rating
    },
    errors_ratings(state, errors_rating){
      state.errors_rating = errors_rating
    }
  }
}
