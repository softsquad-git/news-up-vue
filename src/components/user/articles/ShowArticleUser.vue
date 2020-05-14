<template>
<div>
  <q-dialog
    v-model="openShowArticle"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-light text-dark">
      <q-bar>
        <q-space />

        <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
          <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
          <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="q-pt-none">
        <div class="row q-tabs__content--align-center">
          <div class="col-lg-10">
            <div class="__card__show__user__">
              <div class="row">
                <div class="col-lg-3">
                  <div class="_user_article_show_image">
                    <q-img :src="article.image" :alt="article.title"/>
                  </div>
                </div>
                <div class="col-lg-9">
                  <div style="height: 55px;"/>
                  <div class="_user_article_show_right __title__">
                    {{ article.title }}
                  </div>
                  <div class="_user_article_show_right __category__">
                    <span>Category: </span> First
                  </div>
                  <div class="_user_article_show_right __location__">
                    <span>Location: </span> {{ article.location }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="_user_article_show_content">
                    <p v-html="article.content"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "ShowArticleUser",
    data() {
      return {
        openShowArticle: false,
        maximizedToggle: true
      }
    },
    computed: {
      ...mapGetters({
        article: '_userShowArticle'
      })
    },
    watch: {
      article(){
        this.openShowArticle = true;
      }
    },
    methods: {
      loadData(id) {
        this.$store.dispatch('userShowArticleACTION', id)
      }
    }
  }
</script>
