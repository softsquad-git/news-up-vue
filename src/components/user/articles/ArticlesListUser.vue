<template>
  <div class="__page__profile__user__">
    <div class="profile__user_header">
      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div class="profile___user__header_title">
            {{ this.$t('account.pages.titles.articles') }}
          </div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12 text-right">
          <q-btn-dropdown color="warning" style="margin-right: 10px;" :label="this.$t('account.pages.articles.filters.title')"
                          dropdown-icon="search">
            <q-list>
              <q-item clickable v-close-popup @click="loadData('NEW')">
                <q-item-section>
                  <q-item-label>{{ this.$t('account.pages.articles.filters.new') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="loadData('PUBLISHED')">
                <q-item-section>
                  <q-item-label>{{ this.$t('account.pages.articles.filters.published') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="loadData('ARCHIVE')">
                <q-item-section>
                  <q-item-label>{{ this.$t('account.pages.articles.filters.archive') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="loadData('REMOVE')">
                <q-item-section>
                  <q-item-label>{{ this.$t('account.pages.articles.filters.improve') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="loadData('LOCKED')">
                <q-item-section>
                  <q-item-label>{{ this.$t('account.pages.articles.filters.locked') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn
            icon="add"
            :to="{ name: 'AddArticleUser' }"
            color="positive"
            :label="this.$t('account.pages.titles.createArticle')"
          />
        </div>
      </div>
    </div>
    <div class="profile__user_content">
      <div v-if="articles.data.length > 0" class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 profile___user__article_list" v-for="article in articles.data">
          <div class="profile__user_articles" v-bind:class="BindClassStatus(article.status)">
            <div class="row">
              <div class="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-xs-3">
                <div class="profile___user__article_image"
                     v-bind:style="{ backgroundImage: 'url(' + article.image + ')' }"></div>
              </div>
              <div class="col-xl-11 col-lg-11 col-md-10 col-sm-10 col-xs-9">
                <div class="profile___user_article_content">
                  <div class="profile____user___article__content_header">
                    <div class="row">
                      <div class="col-xl-9 col-lg-9 col-md-9 col-sm-8 col-xs-7">
                        <div class="profile____user___article__content_header-title">
                          {{ article.title }}
                        </div>
                      </div>
                      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-5">
                        <div class="profile____user___article__content_header-created_at">
                          {{ article.created_at | moment('calendar') }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="profile____user___article__content_content">
                    <q-btn-dropdown color="orange" size="sm" :label="options.title" dropdown-icon="change_history">
                      <q-list>
                        <q-item clickable v-close-popup @click="onPreview(article.id)">
                          <q-item-section>
                            <q-item-label>{{options.preview}}</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup :to="{ name: 'EditArticleUser', params: { id: article.id } }">
                          <q-item-section>
                            <q-item-label>{{options.edit}}</q-item-label>
                          </q-item-section>
                        </q-item>

                        <div v-if="article.status !== 'NEW' && article.status !== 'IMPROVE'">
                          <q-item v-if="article.status === 'ARCHIVE'" style="background: #e0e0b4" clickable v-close-popup @click="onArchive(article.id)">
                            <q-item-section>
                              <q-item-label>{{ options.unArchive }}</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item v-else clickable v-close-popup @click="onArchive(article.id)">
                            <q-item-section>
                              <q-item-label>{{options.archive}}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </div>

                        <q-item clickable v-close-popup @click="onRemove(article.id)">
                          <q-item-section>
                            <q-item-label>{{options.delete}}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </div>
                </div>
              </div>
            </div>
            <q-tooltip>
              {{ BindStatus(article.status) }}
            </q-tooltip>
          </div>
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <pagination :data="articles" @pagination-change-page="loadData">
            <span slot="prev-nav"><q-icon name="skip_previous"/></span>
            <span slot="next-nav"><q-icon name="skip_next"/></span>
          </pagination>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-lg-12">
          <p class="no-data">
            {{ this.$t('no_data') }}
          </p>
        </div>
      </div>
    </div>
    <show-article-user ref="ShowArticleUser"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import ShowArticleUser from "./ShowArticleUser";
  import EditArticleUser from "./EditArticleUser";

  export default {
    name: "ArticlesListUser",
    components: {
      'show-article-user': ShowArticleUser,
      'edit-article-user': EditArticleUser
    },
    data() {
      return {
        articles: {},
        status: 'PUBLISHED',
        options: {
          title: this.$t('account.pages.articles.options.title'),
          edit: this.$t('account.pages.articles.options.edit'),
          preview: this.$t('account.pages.articles.options.preview'),
          delete: this.$t('account.pages.articles.options.delete'),
          archive: this.$t('account.pages.articles.options.archive'),
          unArchive: this.$t('account.pages.articles.options.unArchive'),
        }
      }
    },
    computed: {
      ...mapGetters({
        articles: '_userArticles',
        archive: '_userArchiveArticle',
        delete: '_userRemoveArticle'
      })
    },
    watch: {
      archive(){
        this.loadData()
      },
      delete(){
        this.loadData()
      }
    },
    methods: {
      loadData(status) {
        this.status = status;
        if (this.status === undefined)
          this.status = '';
        this.$axios.post(`user/articles?status=${this.status}`)
        .then((data) => {
          this.articles = data.data;
        })
      },
      onArchive(id) {
        this.$store.dispatch('userArchiveArticleACTION', id)
      },
      onRemove(id) {
        this.$store.dispatch('userRemoveArticleACTION', id)
      },
      onPreview(id){
        this.$refs.ShowArticleUser.loadData(id);
      },
      BindClassStatus(status){
        if (status === 'NEW'){
          return "article__list__status__new";
        }else if (status === 'PUBLISHED'){
          return "article__list__status__published"
        }else if (status === 'LOCKED'){
          return "article__list__status__locked"
        }else if (status === 'IMPROVE'){
          return "article__list__status__improve"
        }else if (status === 'ARCHIVE'){
          return "article__list__status__archive"
        }
      },
      BindStatus(status){
        if (status === 'NEW'){
          return this.$t('account.pages.articles.filters.new')
        }else if (status === 'PUBLISHED'){
          return this.$t('account.pages.articles.filters.published')
        }else if (status === 'ARCHIVE'){
          return this.$t('account.pages.articles.filters.archive')
        }else if (status === 'IMPROVE'){
          return this.$t('account.pages.articles.filters.improve')
        }else if (status === 'LOCKED'){
          return this.$t('account.pages.articles.filters.locked')
        }
      },
    },
    created() {
      this.loadData('');
    }
  }
</script>
