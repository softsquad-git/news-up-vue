<template>
    <div>
      <div class="home__page_title" style="margin-top: 10px;">
        {{ this.$t('home.featuredArticles') }}
      </div>
      <div class="row" style="margin-top: 50px;">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="home___trending__articles_list" v-for="article in articles">
            <div class="row">
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <div class="home____trending___articles__list_img" v-bind:style="{ backgroundImage: 'url(' + article.image + ')' }"></div>
              </div>
              <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <router-link :to="{ name: 'Article', params: { id: article.id, title: article.title } }" class="home___trending__articles_title">
                  {{ article.title }}
                </router-link>
                <div class="home___trending__articles_created">
                  <q-icon name="schedule"/> {{ article.created_at | moment('calendar') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "FeaturedHomeArticlesComponent",
      data(){
          return{
            articles: []
          }
      },
      methods: {
          loadData(){
            this.$axios.post('home/articles-featured')
            .then((data) => {
              this.articles = data.data.data
            })
          }
      },
      mounted() {
          this.loadData();
      }
    }
</script>
