<template>
  <div class="row">
    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
      <div class="home__page_title" style="margin-top: 10px;margin-left: 10px;">
        {{ this.$t('home.trendingArticles') }}
      </div>
    </div>
    <div class="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12">
      <div class="text-right">
        <ul class="home___trending__articles_nav">
          <li :class="active === 0 ? 'active-trending-btn' : ''" @click="loadArticlesInCategory(0)"> {{ this.$t('home.listCategories.all') }} </li>
          <li :class="active === category.id ? 'active-trending-btn' : ''" @click="loadArticlesInCategory(category.id)" v-for="category in categories"> {{ category.name }}</li>
        </ul>
      </div>
    </div>
    <div class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top: 40px;">
      <div class="row">
        <div v-for="article in articlesInCategory.slice(0, 4)" class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 padding-10">
          <div class="home___trending__articles_img" v-bind:style="{ backgroundImage: 'url(' + article.image + ')' }"></div>
          <router-link :to="{ name: 'Article', params: { id: article.id, title: article.title } }" class="home___trending__articles_title" :style="$q.dark.isActive ? 'color: #969696 !important' : ''">
            {{ article.title }}
          </router-link>
          <div class="home___trending__articles_created">
            <q-icon name="schedule"/> {{ article.created_at | moment('calendar') }}
          </div>
        </div>
      </div>
      <div class="row" style="margin-top: 20px">
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 padding-10">
              <div class="home___trending__articles_list" v-for="article in articlesInCategory.slice(4, 7)">
                <div class="row">
                  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <div class="home____trending___articles__list_img" v-bind:style="{ backgroundImage: 'url(' + article.image + ')' }"></div>
                  </div>
                  <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                    <router-link :to="{ name: 'Article', params: { id: article.id, title: article.title } }" class="home___trending__articles_title" :style="$q.dark.isActive ? 'color: #969696 !important' : ''">
                      {{ article.title }}
                    </router-link>
                    <div class="home___trending__articles_created">
                      <q-icon name="schedule"/> {{ article.created_at | moment('calendar') }}
                    </div>
                  </div>
                </div>
              </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 padding-10">
          <div class="home___trending__articles_list" v-for="article in articlesInCategory.slice(7, 10)">
            <div class="row">
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <div class="home____trending___articles__list_img" v-bind:style="{ backgroundImage: 'url(' + article.image + ')' }"></div>
              </div>
              <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <router-link :to="{ name: 'Article', params: { id: article.id, title: article.title } }" class="home___trending__articles_title" :style="$q.dark.isActive ? 'color: #969696 !important' : ''">
                  {{ article.title }}
                </router-link>
                <div class="home___trending__articles_created">
                  <q-icon name="schedule"/> {{ article.created_at | moment('calendar') }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 padding-10">
          <div class="home___trending__articles_list" v-for="article in articlesInCategory.slice(10, 13)">
            <div class="row">
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <div class="home____trending___articles__list_img" v-bind:style="{ backgroundImage: 'url(' + article.image + ')' }"></div>
              </div>
              <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <router-link :to="{ name: 'Article', params: { id: article.id, title: article.title } }" class="home___trending__articles_title" :style="$q.dark.isActive ? 'color: #969696 !important' : ''">
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
  </div>
</template>

<script>
  export default {
    name: "TrendingArticlesHomeComponent",
    data() {
      return {
        categories: [],
        articlesInCategory: [],
        active: ''
      }
    },
    methods: {
      loadCategories() {
        this.$axios.post('home/categories')
          .then((data) => {
            this.categories = data.data.data
          })
          .catch(() => {
          })
      },
      loadArticlesInCategory(id) {
        this.active = id;
        this.$axios.post(`home/articles-from-category/${id}`)
        .then((data) => {
          this.articlesInCategory = data.data.data
        })
        .catch(() => {})
      }
    },
    mounted() {
      this.loadCategories();
      this.loadArticlesInCategory(0);
    }
  }
</script>

