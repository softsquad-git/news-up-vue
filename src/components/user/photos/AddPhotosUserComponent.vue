<template>
  <q-dialog v-model="viewModalUploader" persistent>
    <q-card class="modal__photos">
      <q-card-section>
        <div class="text-h6" :class="$q.dark.isActive ? 'account__title_dark' : ''">
          {{ this.$t('account.pages.albums.photos.create.title') }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="uploadFileSubmit">
          <q-select
            v-model="data.album_id"
            :options="albums.data"
            option-label="name"
            option-value="id"
            option-disable="inactive"
            emit-value
            map-options
            :label="this.$t('account.pages.albums.photos.create.selectAlbum')"
            style="margin-bottom: 20px;"
          />
          <q-uploader
            :label="this.$t('account.pages.albums.photos.create.uploadImages')"
            :multiple="true"
            class="full-width"
            :factory="uploadFile"
            accept=".jpg, .png, .gif, image/*"
            ref="files">
          </q-uploader>
          <q-btn style="margin-top: 20px;" type="submit" :label="this.$t('buttons.save')"/>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat :label="this.$t('buttons.cancel')" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "AddPhotosUserComponent",
    data() {
      return {
        viewModalUploader: false,
        data: {
          album_id: '',
          photos: ''
        },
        files: '',
        errors: []
      }
    },
    props: {
      albums: []
    },
    methods: {
      openModal() {
        this.viewModalUploader = true;
      },
      uploadFileSubmit() {
        this.data.photos = this.$refs.files.files;
        let formData = new FormData();
        for (let i = 0; i < this.data.photos.length; i++) {
          let photo = this.data.photos[i];
          formData.append('photos[' + i + ']', photo, photo.name);
          formData.append('album_id', this.data.album_id);
        }
        this.$axios.post('user/photos/store', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          this.viewModalUploader = false;
          this.data.album_id = '';
          this.$parent.loadData();
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.$q.notify({
            message: this.$t('notification.errors.invalid'),
            color: 'negative'
          })
        })
      },
      uploadFile() {
        this.data.photos = this.$refs.files.files;
      }
    }
  }
</script>
