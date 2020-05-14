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
  import {mapGetters} from 'vuex'

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
    computed: {
      ...mapGetters({
        rating: 'rating'
      })
    },
    watch: {
      rating() {
        this.data.points = 0;
        this.$parent.v_show_rating = false;
        this.$parent.loadData();
        this.$q.notify({
          message: this.$q.notify({
            message: this.$t('global.addRating'),
            color: 'positive'
          })
        })
      }
    },
    methods: {
      setRatingArticle() {
        if (localStorage.getItem('token')) {
          this.$store.dispatch('setRatingArticle', this.data)
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
