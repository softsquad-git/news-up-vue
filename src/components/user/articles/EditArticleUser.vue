<template>
  <div class="__page__profile__user__">
    <div class="profile__user_header">
      <div class="row mb-3">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div class="profile___user__header_title">
            {{ this.$t('account.pages.titles.editArticle') }}
          </div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12 text-right">
          <q-btn
            icon="backspace"
            :to="{ name: 'ArticlesListUser' }"
            color="negative"
            :label="this.$t('buttons.cancel')"
          />
        </div>
      </div>
    </div>
    <errors :errors="errors"/>
    <div class="profile__user_content">
      <q-form @submit="submitEditArticleForm">
        <div class="row mb-3">
          <div class="col-xl-8 col-lg-8 col-md-6 col-sm-6 col-xs-12">
            <q-input
              type="text"
              :placeholder="this.$t('account.pages.articles.create.title')"
              :label="this.$t('account.pages.articles.create.title')"
              v-model="data.title"
            />
          </div>
          <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <q-select
              v-model="data.category_id"
              :options="categories"
              option-label="name"
              option-value="id"
              option-disable="inactive"
              emit-value
              map-options
              :label="this.$t('account.pages.articles.create.category')"
            />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <vue-editor v-model="data.content" useCustomImageHandler @image-added="handleImageAdded"
                        :editorOptions="editorSettings">
            </vue-editor>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <q-input
              type="text"
              :label="this.$t('account.pages.articles.create.location')"
              :placeholder="this.$t('account.pages.articles.create.location')"
              v-model="data.location"
            />
          </div>
          <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <q-toggle
              class="profile____user___create__form_is"
              :false-value="0"
              :label="this.$t('account.pages.articles.create.isComment')"
              :true-value="1"
              color="positive"
              v-model="data.is_comment"
            />
          </div>
          <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <q-toggle
              class="profile____user___create__form_is"
              :false-value="0"
              :label="this.$t('account.pages.articles.create.isRating')"
              :true-value="1"
              color="positive"
              v-model="data.is_rating"
            />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-lg-3">
            <q-btn
              type="submit"
              outline
              size="sm"
              color="positive"
              icon="send"
              :label="this.$t('buttons.save')"
            />
          </div>
        </div>
      </q-form>
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="row mb-3">
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-12" v-for="image in articleImages">
              <div class="article__images_content" v-bind:style="{ backgroundImage: 'url(' + image.src + ')' }">
                <div class="article___images__content_trash">
                  <q-icon @click="removeImage(image.id)" name="delete"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-form @submit.prevent="uploadFiles">
                <q-uploader
                  :label="this.$t('account.pages.articles.create.images')"
                  :multiple="true"
                  :factory="uploadFile"
                  accept=".jpg, .png, .gif, image/*"
                  ref="files">
                </q-uploader>
                <q-btn type="submit">
                  {{ this.$t('buttons.save') }}
                </q-btn>
              </q-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Errors from "../../../common/Errors";
  import { VueEditor, Quill } from "vue2-editor";
  import { ImageDrop } from "quill-image-drop-module";
  import ImageResize from 'quill-image-resize-vue';
  Quill.register('modules/imageDrop', ImageDrop);
  Quill.register("modules/imageResize", ImageResize);

  export default {
    name: "EditArticleUser",
    components: {Errors, VueEditor},
    data() {
      return {
        data: {
          id: this.$route.params.id,
          title: '',
          category_id: '',
          content: '',
          location: '',
          is_comment: '',
          is_rating: '',
        },
        editorSettings: {
          modules: {
            imageDrop: true,
            imageResize: {},
          }
        },
        articleImages: [],
        images: '',
        files: '',
      }
    },
    computed: {
      ...mapGetters({
        article: '_userShowArticle',
        categories: '_userCategoriesArticle',
        edit: '_userUpdateArticle',
        errors: '_userErrorsArticle'
      })
    },
    watch: {
      article(){
        this.data.title = this.article.title;
        this.data.category_id = this.article.category_id;
        this.data.content = this.article.content;
        this.data.location = this.article.location;
        this.data.is_comment = this.article.is_comment;
        this.data.is_rating = this.article.is_rating;
      },
      edit(){
        this.$router.push({ name: 'ArticlesListUser' })
      }
    },
    methods: {
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        var formData = new FormData();
        formData.append("image", file);
        this.$axios.post('user/articles/upload-file-editor', formData)
          .then((data) => {
            let url = data.data.link; // Get url from response
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
          })
          .catch((error) => {
            console.log(error)
          })
      },
      submitEditArticleForm(){
        if (this.data.id){
          this.$store.dispatch('userUpdateArticleACTION', this.data)
        }else {
          return alert('Error. Refresh page!')
        }
      },
      uploadFiles()
      {
        let article_id = this.$route.params.id;
        this.images = this.$refs.files.files;
        let formData = new FormData();
        for (var i = 0; i < this.images.length; i++) {
          let image = this.images[i];
          formData.append('images[' + i + ']', image, image.name);
        }
        this.$axios.post(`user/articles/upload-images/${article_id}`, formData)
        .then(() => {
          this.getArticleImages();
          this.$q.notify({
            message: 'Upload files success',
            color: 'positive'
          })
        })
      },
      getArticleImages()
      {
        let article_id = this.$route.params.id;
        this.$axios.post(`user/articles/get-images/${article_id}`)
        .then((data) => {
          this.articleImages = data.data.data;
        })
        .catch(() => {})
      },
      removeImage(id){
        this.$axios.post(`user/articles/remove-image/${id}`)
        .then(() => {
          this.getArticleImages();
        })
        .catch(() => {})
      },
      uploadFile(){
        this.images = this.$refs.files.files;
      }
    },
    created() {
      if (this.$route.params.id){
        this.$store.dispatch('userShowArticleACTION', this.$route.params.id);
        this.getArticleImages();
      }else{
        this.$router.push({ name: 'ArticlesListUser' })
      }
      this.$store.dispatch('userCategoriesArticleACTION')
    }
  }
</script>
