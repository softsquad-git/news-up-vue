<template>
  <div class="__page__profile__user__">
    <div class="profile__user_header">
      <div class="row mb-3">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div class="profile___user__header_title">
            {{ this.$t('account.pages.titles.createArticle') }}
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
    <div class="profile__user_content">
      <q-form @submit="submitCreateArticleForm" enctype="multipart/form-data">
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
        <div class="row mb-3" style="margin-top: 50px;">
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
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-uploader
              :label="this.$t('account.pages.articles.create.images')"
              :multiple="true"
              :factory="uploadFile"
              accept=".jpg, .png, .gif, image/*"
              ref="files">
            </q-uploader>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3">
            <q-btn
              type="submit"
              outline
              color="positive"
              icon="send"
              :label="this.$t('buttons.save')"
            />
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Errors from "../../../common/Errors";
  import {VueEditor, Quill} from "vue2-editor";
  import {ImageDrop} from "quill-image-drop-module";
  import ImageResize from 'quill-image-resize-vue';

  Quill.register('modules/imageDrop', ImageDrop);
  Quill.register("modules/imageResize", ImageResize);

  export default {
    name: "AddArticleUser",
    components: {Errors, VueEditor},
    data() {
      return {
        data: {
          title: '',
          category_id: '',
          content: '',
          location: '',
          is_comment: 1,
          is_rating: 1,
          images: ''
        },
        files: '',
        editorSettings: {
          modules: {
            imageDrop: true,
            imageResize: {},
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        _userCreateArticle: '_userCreateArticle',
        categories: '_userCategoriesArticle',
        errors: '_userErrorsArticle',
      })
    },
    watch: {
      _userCreateArticle() {
        this.$router.push({name: 'ArticlesListUser'});
      }
    },
    methods: {
      submitCreateArticleForm() {
        this.data.images = this.$refs.files.files;
        if (this.data.images.length > 0) {
          let formData = new FormData();
          for (var i = 0; i < this.data.images.length; i++) {
            let image = this.data.images[i];
            formData.append('images[' + i + ']', image, image.name);
            formData.append('title', this.data.title);
            formData.append('category_id', this.data.category_id);
            formData.append('content', this.data.content);
            formData.append('location', this.data.location);
            formData.append('is_comment', this.data.is_comment);
            formData.append('is_rating', this.data.is_rating);
          }
          this.saveData(formData);
        } else {
          this.saveData(this.data);
        }
      },
      saveData(data) {
        this.$axios.post('user/articles/store', data)
          .then(() => {
            this.$router.push({name: 'ArticlesListUser'})
          })
          .catch((error) => {
            //
          })
      },
      handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
        var formData = new FormData();
        formData.append("image", file);
        this.$axios.post('user/articles/upload-file-editor', formData)
          .then((data) => {
            let url = data.data.link;
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
          })
          .catch((error) => {
            console.log(error)
          })
      },
      uploadFile() {
        this.data.images = this.$refs.files.files;
      }
    },
    created() {
      this.$store.dispatch('userCategoriesArticleACTION');
    }
  }
</script>
