<template>
  <div class="row">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="search-articles-bar">
        <q-form @submit.prevent="loadData">
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <q-input type="text" :placeholder="this.$t('search.articles.title')"
                       v-model="search.title">
                <template v-slot:append>
                  <q-icon name="title"/>
                </template>
              </q-input>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12">
              <q-select
                v-model="search.category"
                :options="categories"
                option-label="name"
                option-value="id"
                option-disable="inactive"
                emit-value
                map-options
                :label="this.$t('search.articles.category')"
              >
                <template v-slot:append>
                  <q-icon name="category"/>
                </template>
              </q-select>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
              <q-input type="text" :placeholder="this.$t('search.articles.location')"
                       v-model="search.location">
                <template v-slot:append>
                  <q-icon name="place"/>
                </template>
              </q-input>
            </div>
            <div class="col-xl-2 col-lg-2 col-md-2 ">
              <button class="button-search-articles-list" type="submit">
                <q-icon name="search"/>
              </button>
            </div>
          </div>
        </q-form>
      </div>
    </div>
    <div v-if="articles.length > 0" v-for="article in articles.data" :key="article.id" class="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12 articles__list_front">
      <div class="image__article_list" v-bind:style="{ backgroundImage: 'url(' + article.image + ')' }">
        <follow-article-component :c_follows="article.follows" :resource_id="article.id" :resource_type="'ARTICLE'"/>
        <div class="footer__article_list">
          <router-link
            class="category__article_list link"
            :to="{ name: 'Articles', params: {category: article.category_id, location: 'all'} }">
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
            :to="{ name: 'Articles', params: {category: 'all', location: article.location} }">
            <q-icon name="location_on"/>
            {{ article.location }}
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <no-data-component/>
    </div>
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <pagination :data="articles" @pagination-change-page="loadData">
        <span slot="prev-nav"><q-icon name="skip_previous"/></span>
        <span slot="next-nav"><q-icon name="skip_next"/></span>
      </pagination>
    </div>
  </div>
</template>

<script>
  import FollowArticleComponent from "./follows/FollowArticleComponent";
  import NoDataComponent from "src/common/NoDataComponent";

  export default {
    name: "Articles",
    components: {NoDataComponent, FollowArticleComponent},
    data() {
      return {
        search: {
          title: '',
          category: '',
          location: ''
        },
        articles: {},
        categories: [],
        page: 1
      }
    },
    methods: {
      loadData(page = localStorage.getItem('pagePagination')) {
        if (page === '')
          page = 1;
        if (page !== 1 ) {
          localStorage.setItem('pagePagination', page);
        } else {
          localStorage.setItem('pagePagination', 1);
        }
        if (localStorage.getItem('pagePagination') !== 1) {
          page = localStorage.getItem('pagePagination');
        }
        let category = this.$route.params.category;
        if (category > 0) {
          this.search.category = category;
        }
        let location = this.$route.params.location;
        if (location && location !== 'all') {
          this.search.location = location;
        }
        this.$axios.post(`articles?page=${page}&title=${this.search.title}&category=${this.search.category}&location=${this.search.location}`)
          .then((data) => {
            this.articles = data.data
          })
        .catch(() => {
          this.$q.notify({
            message: this.$t('notification.errors.loadData'),
            color: 'negative'
          })
        })
      },
      loadDataCategories() {
        this.$axios.post('categories-all')
          .then((data) => {
            this.categories = data.data.data
          })
      },
    },
    created() {
      this.loadData();
      this.loadDataCategories();
    }
  }
</script>
