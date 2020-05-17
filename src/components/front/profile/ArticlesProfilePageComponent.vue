<template>
  <div>
    <div class="__profile__content_title">
      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
          {{this.$t('profilePage.pages.titles.articles')}} ({{articles.length}})
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="article in articles" class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 articles__list_front">
        <div class="image__article_list" v-bind:style="{ backgroundImage: 'url(' + article.image + ')' }">
          <div class="footer__article_list">
            <router-link
              class="category__article_list link"
              :to="{ name: 'Article', params: { id: article.id, title: article.title } }">
              <q-icon name="local_offer"/>
              {{ article.category.name }}
            </router-link>

            <router-link
              class="to__article_list link"
              :to="{ name: 'Article', params: { id: article.id, title: article.title } }">
              {{ article.title.substr(0, 70) }} <span v-show="article.title.length > 70">...</span>
            </router-link>

            <router-link
              class="location__article_list link"
              :to="{ name: 'Article', params: { id: article.id, title: article.title } }">
              <q-icon name="location_on"/>
              {{ article.location }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ArticlesProfilePageComponent",
    data() {
      return {
        params: {
          user_id: this.user_id,
        },
        articles: []
      }
    },
    methods: {
      loadData() {
        this.$axios.post(`profile-page/articles?user_id=${this.params.user_id}`)
        .then((data) => {
          this.articles = data.data.data;
        })
        .catch(() => {
          this.$q.notify({
            message: this.$t('notification.errors.loadData'),
            color: 'negative'
          })
        })
      },
    },
    mounted() {
      this.loadData();
    }
  }
</script>
