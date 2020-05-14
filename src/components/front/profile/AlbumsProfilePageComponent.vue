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
    <viewer :images="images">
      <div class="row">
        <div class="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-xs-4" v-for="src in images" :key="src">
          <img class="full-width posts-group-content-img" :src="src">
        </div>
      </div>
    </viewer>
  </div>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "AlbumsProfilePageComponent",
    data() {
      return {
        images: []
      }
    },
    computed: {
      ...mapGetters({
        albums: 'albumsUserP',
      })
    },
    props: {
      user_id: ''
    },
    watch: {
      //
    },
    methods: {
      loadData() {
        this.$store.dispatch('getAlbumsUserP', this.user_id)
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
