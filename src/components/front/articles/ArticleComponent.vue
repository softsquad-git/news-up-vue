<template>
  <div class="container" style="margin-top: 50px;">
    <div class="row q-tabs__content--align-center">
      <div class="col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11">
        <div class="row">
          <div class="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12">
            <div class="article__content">
              <div class="row">
                <div class="col-xl-11 col-lg-11 col-md-11 col-sm-12 col-xs-12">
                  <div class="article__content_title">
                    {{ article.title }}
                  </div>
                </div>
                <div class="col-lg-1 text-right">
                  <follow-article-component :c_follows="article.follows" :resource_type="'ARTICLE'" :resource_id="this.$route.params.id"/>
                </div>
              </div>
              <div class="row article__category__rating">
                <div class="col-lg-6">
                  <router-link :to="{ name: 'Articles', params: {category: article.category_id, location: 'all'} }" class="article__content_category">
                    {{ article.category.name }}
                  </router-link>
                </div>
                <div class="col-lg-6">
                  <rating-component v-show="article.is_rating" style="float: right" :stars="article.ratings"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <p v-html="article.content"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="article__footer">
                    <div class="row">
                      <div class="col-lg-6 offset-lg-6 text-right">
                        <rating-article-component v-if="article.is_rating && v_show_rating" :article_id="article.id"/>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <like-article-component @loadData="loadData" :c_likes_up="article.like_up" :c_likes_down="article.like_down" :resource_type="'ARTICLE'" :resource_id="this.$route.params.id"/>
                      </div>
                      <div class="col-lg-6 text-right">
                        <q-btn @click="vShowRating" size="10px" class="footer__article_icon" round icon="star"
                               v-show="article.is_rating"/>
                        <q-btn size="10px" class="footer__article_icon" round icon="comment"
                               v-on:click="viewComments ^= true" v-show="article.is_comment">
                          <q-tooltip>
                            {{ this.$t('article.viewComments') }}
                          </q-tooltip>
                        </q-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="viewComments" class="article__comments_list" style="margin-top: 50px;">
              <comments-article-component :resource_type="'ARTICLE'" :resource_id="article.id" v-show="viewComments"/>
            </div>
          </div>
          <div class="col-xl-3 pl-xl-4 col-lg-3 pl-lg-4 pl-md-3 col-md-4 pl-md-0 pl-sm-0 col-sm-12 col-xs-12">
            <div class="article__sidebar">
              <div class="article__sidebar_user">
                <q-btn style="position: absolute;z-index: 1; background: #fff;" size="10px"
                       class="footer__article_icon" round icon="add">
                  <q-tooltip>
                    {{ this.$t('friends.addFriend') }}
                  </q-tooltip>
                </q-btn>
                <q-img
                  :src="article.user.avatar"
                  :alt="article.user.s.name"
                  class="article___sidebar__user_avatar"
                />
                <router-link
                  :to="{ name: 'ProfilePage', params: { id: article.user_id } }"
                  class="article___sidebar__user_fullname">
                  {{ article.user.s.name + ' ' + article.user.s.last_name }}
                </router-link>
                <q-btn size="10px"
                       class="footer__article_icon"
                       round
                       icon="chat">
                  <q-tooltip>
                    {{ this.$t('article.user.chat') }}
                  </q-tooltip>
                </q-btn>
              </div>
              <div class="article__sidebar_gallery">
                <lingallery
                  :height="height"
                  v-if="images.length > 0"
                  :iid.sync="currentId"
                  :showThumbnails="false"
                  :responsive="true"
                  :items="images"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RatingComponent from "./ratings/RatingComponent";
  import LikeArticleComponent from "./likes/LikeArticleComponent";
  import FollowArticleComponent from "./follows/FollowArticleComponent";
  import CommentsArticleComponent from "./comments/CommentsArticleComponent";
  import RatingArticleComponent from "./ratings/RatingArticleComponent";

  export default {
    name: "Article",
    components: {
      RatingArticleComponent,
      CommentsArticleComponent,
      FollowArticleComponent,
      LikeArticleComponent,
      RatingComponent
    },
    data() {
      return {
        viewComments: false,
        v_show_rating: false,
        images: [],
        height: 200,
        currentId: null,
        article: {}
      }
    },
    methods: {
      loadData(){
        if (this.$route.params.id) {
          let id = this.$route.params.id;
          this.$axios.post(`article/${id}`)
          .then((data) => {
            this.article = data.data.data
          })
          .catch((error) => {
            this.$q.notify({
              message: this.$t('notification.errors.loadData'),
              color: 'negative'
            })
          });
          this.loadImages();
        } else {
          this.$router.push({name: 'ListComponent'})
        }
      },
      loadImages(){
        this.$axios.post(`get-images-article/${this.$route.params.id}`)
        .then((data) => this.images = data.data.data)
      },
      vShowRating(){
        this.v_show_rating = true;
      }
    },
    created() {
      this.loadData();
      document.title = this.$route.params.title;
    }
  }
</script>
