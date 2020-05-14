<template>
    <div>
      <carousel :navigationEnabled="false" :touch-drag="true" :mouse-drag="true" :paginationEnabled="false" :per-page-custom="[[300, 1], [975, 2], [2048, 3]]">
        <slide v-for="article in headerArticles">
          <div class="header__home_article" v-bind:style="{ backgroundImage: 'url(' + article.image + ')' }">
              <div class="header___home__article_footer">
                <router-link :to="{ name: 'Articles', params: {category: article.category_id, location: 'all'} }" class="header____home___article__footer_category">
                    <q-icon name="tag"/> {{ article.category.name }}
                </router-link>
                <router-link :to="{ name: 'Article', params: { id: article.id, title: article.title } }" class="header____home___article__footer_title">
                  {{ article.title }}
                </router-link>
                <div class="header____home___article__footer_time">
                  <q-icon name="schedule"/>  {{ article.created_at | moment('calendar') }}
                </div>
              </div>
          </div>
        </slide>
      </carousel>
    </div>
</template>

<script>
    export default {
        name: "HeaderHomeComponent",
      data(){
          return{
            headerArticles: []
          }
      },
      methods:{
          loadHeaderArticles()
          {
            this.$axios.post('home/latest-four-articles')
            .then((data) => {
              this.headerArticles = data.data.data;
            })
            .catch(() => {})
          }
      },
      mounted() {
          this.loadHeaderArticles();
      }
    }
</script>

<style scoped>

</style>
