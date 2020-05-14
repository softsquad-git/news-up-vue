<template>
  <div class="posts-group-list">
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-10">
        <create-post-group-component/>
      </div>
      <div class="col-lg-12" v-for="post in posts">
        <div class="posts-group">
          <div class="posts-group-header">
            <div class="row">
              <div class="col-xl-9 col-lg-9 col-md-9 col-sm-7 col-xs-7">
                <div class="posts-group-author">
                  <q-img style="width: 40px;height: 40px;border-radius: 50%;" :src="post.user.avatar"
                         :alt="post.user.s.name"/>
                  <span class="fullname">
                   <router-link :to="{name: 'ProfilePage', params: {id: post.user_id}}">
                      {{ post.user.s.name + ' ' + post.user.s.last_name }}
                   </router-link>
                  </span>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-5 col-xs-5 text-right">
                <span class="created">{{ post.created_at | moment('calendar')}} </span>
                <q-btn-dropdown flat size="xs">
                  <q-list>
                    <q-item v-if="userId == post.user_id" clickable v-close-popup
                            @click="postIDe = post.id, dataEditPost.content = post.content, loadPostImages(post.id)">
                      <q-item-section>
                        <q-item-label> {{ actionsPost.edit }} </q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item v-if="userId == post.user_id" clickable v-close-popup @click="removePost(post.id)">
                      <q-item-section>
                        <q-item-label> {{ actionsPost.remove }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>
          </div>
          <div class="posts-group-content">
            {{ post.content }}
            <div v-if="post.images.length > 0" class="posts-group-content-images">
              <viewer :images="post.images">
                <div class="row">
                  <div class="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-xs-3" v-for="src in post.images" :key="src">
                    <img class="full-width posts-group-content-img" :src="src">
                  </div>
                </div>
              </viewer>
            </div>
          </div>
          <div class="posts-group-footer">
            <like-article-component style="float: left;margin-right: 5px;" :resource_type="'POST_GROUP'"
                                    @loadData="loadData" :resource_id="post.id" :c_likes_down="post.c_likes_down"
                                    :c_likes_up="post.c_likes_up"/>
            <q-btn v-if="postID !== post.id" @click="postID = post.id" round size="sm" icon="comment">
              <q-badge floating color="warning">{{ post.c_comments }}</q-badge>
              <q-tooltip>
                Show comments
              </q-tooltip>
            </q-btn>
            <q-btn v-else @click="postID = 0" round size="sm" icon="close">
              <q-tooltip>
                Hide comments
              </q-tooltip>
            </q-btn>
            <q-btn @click="cancelEdit" style="margin-left: 10px;" v-if="postIDe === post.id" round size="sm"
                   icon="close">
              <q-tooltip>
                Finish edit
              </q-tooltip>
            </q-btn>
          </div>
          <div v-if="postID === post.id" class="post-group-comments">
            <comments-article-component :resource_id="post.id" :resource_type="'POST_GROUP'"/>
          </div>
          <div v-if="postIDe === post.id" class="post-group-edit">
            <q-form @submit.prevent="submitEditPost">
              <q-input type="textarea" v-model="dataEditPost.content"/>
              <q-btn type="submit" label="Edit post" style="margin-top: 5px;"/>
            </q-form>
            <div class="edit-post-images">
              <div class="edit-images_title">Edit images
                <q-btn @click="uploadImagesModal = true" round size="xs" icon="add"/>
              </div>
              <div class="row">
                <div class="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-xs-3" v-for="img in imagesPost">
                  <div class="posts-group-content-edit-img" v-bind:style="{ backgroundImage: 'url(' + img.src + ')' }">
                    <q-btn round @click="removeImage(img.id)" size="xs" icon="delete" color="negative"/>
                  </div>
                </div>
              </div>
              <q-btn @click="cancelEdit" label="Done" color="positive" size="sm" style="margin-top: 10px;"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="uploadImagesModal">
      <q-card class="modal__photos">
        <q-form @submit.prevent="uploadImages">
          <q-uploader
            class="full-width"
            label="Upload images"
            :multiple="true"
            accept=".jpg, .png, .gif, image/*"
            ref="files">
          </q-uploader>
          <q-btn type="submit" label="Submit"/>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'
  import Vue from 'vue'

  Vue.use(Viewer)
  import CreatePostGroupComponent from "./CreatePostGroupComponent";
  import LikeArticleComponent from "../../front/articles/likes/LikeArticleComponent";
  import CommentsArticleComponent from "../../front/articles/comments/CommentsArticleComponent";

  export default {
    name: "PostsGroupComponent",
    components: {CommentsArticleComponent, LikeArticleComponent, CreatePostGroupComponent},
    data() {
      return {
        uploadImagesModal: false,
        postID: 0,
        postIDe: 0,
        posts: [],
        userId: localStorage.getItem('userId'),
        index: null,
        dataEditPost: {
          content: '',
        },
        imagesPost: [],
        uploadImagesPost: [],
        actionsPost: {
          edit: this.$t('buttons.edit'),
          remove: this.$t('buttons.delete')
        }
      }
    },
    methods: {
      loadData() {
        const id = this.$route.params.id;
        this.$axios.post('user/groups/posts/get/' + id)
          .then((data) => {
            this.posts = data.data.data
          })
          .catch(() => {
            this.$q.notify({
              message: 'Failed load data',
              color: 'negative'
            })
          })
      },
      removePost(id) {
        this.$axios.post('user/groups/posts/remove/' + id)
          .then(() => {
            this.loadData();
            this.$q.notify({
              message: 'Removed post success',
              color: 'positive'
            })
          })
          .catch((error) => {
            //
          })
      },
      submitEditPost() {
        this.$axios.post(`user/groups/posts/update/${this.postIDe}`, this.dataEditPost)
          .then(() => {
            this.loadData();
            this.dataEditPost.content = '';
          })
          .catch(() => {
            this.$q.notify({
              message: 'Something went wrong',
              color: 'negative'
            })
          })
      },
      loadPostImages(id) {
        this.$axios.post(`user/groups/posts/images/${id}`)
          .then((data) => this.imagesPost = data.data.data)
          .catch((error) => {
            this.$q.notify({
              message: 'Failed load images',
              color: 'negative'
            })
          })
      },
      removeImage(id) {
        this.$axios.post(`user/groups/posts/images/remove/${id}`)
          .then(() => {
            this.loadPostImages(this.postIDe);
            this.$q.notify({
              message: 'Image removed',
              color: 'positive'
            })
          })
          .catch((error) => {
            this.$q.notify({
              message: 'Something went wrong',
              color: 'negative'
            })
          })
      },
      uploadImages() {
        this.uploadImagesPost = this.$refs.files.files;
        let formData = new FormData();
        for (var i = 0; i < this.uploadImagesPost.length; i++) {
          let image = this.uploadImagesPost[i];
          formData.append('images[' + i + ']', image, image.name);
        }
        this.$axios.post(`user/groups/posts/images/upload/${this.postIDe}`, formData)
          .then(() => {
            this.loadPostImages(this.postIDe);
            this.$q.notify({
              message: 'Upload images success',
              color: 'positive'
            });
            this.uploadImagesModal = false;
          })
          .catch((error) => {
            this.$q.notify({
              message: 'Something went wrong',
              color: 'negative'
            })
          })
      },
      cancelEdit() {
        this.postIDe = 0;
        this.loadData();
        this.dataEditPost.content = '';
      }
    },
    mounted() {
      this.loadData();
    }
  }
</script>
