<template>
<div>
  <div class="row">
    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12" style="padding: 10px;" v-for="album in albums">
      <div class="album__user__photos_content" v-bind:style="{ backgroundImage: 'url(' + album.intro_img + ')' }">
        <div class="count_photos">
          {{ album.c_images }}
        </div>
        <q-icon @click="loadImagesFromAlbum(album.id)" v-show="album.c_images > 0" class="album__user__photos_content_icon float-left" name="perm_media"/>
        <div class="album__user_photos__content_name">
          {{album.name}}
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <viewer :images="images">
      <div class="row" style="padding: 0 10px;">
        <div class="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-xs-4" v-for="src in images" :key="src">
          <img class="full-width posts-group-content-img" :alt="src" :src="src">
        </div>
      </div>
    </viewer>
  </div>
</div>
</template>

<script>
  import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'

Vue.use(Viewer)
  export default {
    name: "AlbumsProfilePageComponent",
    data() {
      return {
        images: [],
        albums: []
      }
    },
    props: {
      user_id: ''
    },
    methods: {
      loadData() {
        this.$axios.post(`profile-page/albums?user_id=${this.user_id}`)
        .then((data) => {
          this.albums = data.data.data
        })
        .catch(() => {
          this.$q.notify({
            message: this.$t('notification.errors.loadData'),
            color: 'warning'
          })
        })
      },
      loadImagesFromAlbum(album_id){
        this.$axios.post('profile-page/photos?album_id='+album_id)
        .then((data) => this.images = data.data.data)
        .catch(() => {})
      }
    },
    created() {
      this.loadData();
    }
  }
</script>
