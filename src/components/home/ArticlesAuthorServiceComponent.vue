<template>
  <div class="padding-10">
    <div class="home__page_title" style="margin: 50px auto 30px;">
      {{ this.$t('home.articlesFromPageCreators') }}
    </div>
    <carousel :navigationEnabled="false" :paginationEnabled="false" :per-page-custom="[[300, 2], [700, 3], [1020, 4]]">
      <slide v-for="article in authorArticles">
          <div class="home___trending__articles_img" v-bind:style="{ backgroundImage: 'url(' + article.image + ')' }">
            <router-link :to="{ name: 'Articles', params: {category: article.category_id, location: 'all'} }" class="header____home___article__footer_category" style="padding: 5px!important;">
              <q-icon name="tag"/> {{ article.category.name }}
            </router-link>
          </div>
          <router-link :to="{ name: 'Article', params: { id: article.id, title: article.title } }" class="home___trending__articles_title">
            {{ article.title }}
          </router-link>
          <div class="home___trending__articles_created">
            <q-icon name="schedule"/> {{ article.created_at | moment('calendar') }}
          </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
  export default {
    name: "ArticlesAuthorServiceComponent",
    data() {
      return {
        authorArticles: []
      }
    },
    methods: {
      loadArticlesAuthor() {
        this.$axios.post('home/articles-author-service')
          .then((data) => this.authorArticles = data.data.data)
          .catch(() => {
          })
      }
    },
    mounted() {
      this.loadArticlesAuthor();
    }
  }
</script>
