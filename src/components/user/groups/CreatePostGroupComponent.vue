<template>
<div class="create-post">
      <q-form @submit.prevent="createPostInGroup">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input type="textarea" class="" v-model="data.content"
                     :placeholder="this.$t('account.pages.groups.posts.create.content')"/>
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin: 10px 5px 10px 0">
            <q-btn v-on:click="sUploadImage ^= true" round icon="photo" :class="$q.dark.isActive ? 'account-color' : ''" size="xs"/>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <q-uploader
              v-show="sUploadImage"
              class="full-width"
              :label="this.$t('account.pages.groups.posts.create.images')"
              :multiple="true"
              :factory="uploadPostImages"
              accept=".jpg, .png, .gif, image/*"
              ref="files">
            </q-uploader>
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-btn type="submit" flat :label="this.$t('buttons.save')"/>
          </div>
        </div>
      </q-form>
</div>
</template>

<script>

  export default {
    name: "CreatePostGroupComponent",
    data() {
      return {
        sUploadImage: false,
        data: {
          group_id: this.$route.params.id,
          content: '',
          images: []
        },
        errors: []
      }
    },
    methods: {
      createPostInGroup() {
        this.data.images = this.$refs.files.files;
        if (this.data.images.length > 0) {
          let formData = new FormData();
          for (var i = 0; i < this.data.images.length; i++) {
            let image = this.data.images[i];
            formData.append('images[' + i + ']', image, image.name);
            formData.append('group_id', this.data.group_id);
            formData.append('content', this.data.content);
          }
          this.saveData(formData);
        } else {
          this.saveData(this.data);
        }
      },
      saveData(data){
        this.$axios.post('user/groups/posts/store', data)
          .then((data) => {
            if (data.data.success === 1) {
              this.$parent.loadData();
              this.$q.notify({
                message: this.$t('account.groups.notify.successCreatePost'),
                color: 'positive'
              });
              this.data.content = '';
              this.data.images = [];
              this.sUploadImage = false;
            }
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
              this.$q.notify({
                message: this.$t('notification.errors.invalid'),
                color: 'negative'
              })
            }
          })
      },
      uploadPostImages() {
        this.data.images = this.$refs.files.files;
      }
    }
  }
</script>
