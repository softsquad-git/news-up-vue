<template>
  <div style="margin-bottom: 10px;">
    <q-rating
      v-model="data.points"
      max="10"
      size="20px"
      color="orange"
    />
    <q-btn
      @click="setRatingArticle"
      size="10px" class="footer__article_icon"
      color="positive" round icon="send"
    />
    <q-btn
      @click="close"
      size="10px" class="footer__article_icon"
      color="red" round icon="close"
    />
  </div>
</template>

<script>
  export default {
    name: "RatingArticleComponent",
    data() {
      return {
        data: {
          article_id: this.article_id,
          points: ''
        }
      }
    },
    props: {
      article_id: ''
    },
    methods: {
      setRatingArticle() {
        if (localStorage.getItem('token')) {
          this.$axios.post('article-rating', this.data)
            .then((data) => {
              if (data.data.success === 1) {
                this.data.points = 0;
                this.$parent.v_show_raing = false;
                this.$parent.loadData();
                this.$q.notify({
                  message: this.$t('global.addRating'),
                  color: 'positive'
                })
              }
            })
            .catch((error) => {
              if (error.response.status === 422) {
                this.$q.notify({
                  message: this.$t('notification.info.reloadPage'),
                  color: 'warning'
                })
              }
            })
        } else {
          this.$q.notify({
            message: this.$t('errors.please_login'),
            color: 'negative'
          })
        }
      },
      close() {
        this.$parent.v_show_rating = false;
      }
    }
  }
</script>
