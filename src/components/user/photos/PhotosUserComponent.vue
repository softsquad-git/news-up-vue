<template>
  <div>
    <albums-photo-user-component @images="loadImages"/>
    <div class="__page__profile__user__">
      <div class="profile__user_content">
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-12" v-for="image in images.data">
            <div class="profile__user__list_photos text-right"
                 v-bind:style="{ backgroundImage: 'url(' + image.src + ')' }">
              <q-icon @click="lookPhoto(image.src)" class="album__user__photos_content_icon" name="search"/>
              <q-icon @click="removePhoto(image.id)" class="album__user__photos_content_icon" name="delete"/>
            </div>
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <pagination :data="images" @pagination-change-page="loadData">
              <span slot="prev-nav"><q-icon name="skip_previous"/></span>
              <span slot="next-nav"><q-icon name="skip_next"/></span>
            </pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex'
  import AlbumsPhotoUserComponent from "./AlbumsPhotoUserComponent";

  export default {
    name: "PhotosUserComponent",
    components: {AlbumsPhotoUserComponent},
    data() {
      return {
        album_id: '',
        images: []
      }
    },
    computed: {
      ...mapGetters({
        deletePhoto: 'removePhoto',
      })
    },
    watch: {
      deletePhoto() {
        this.loadData();
      }
    },
    methods: {
      loadImages(album_id) {
        this.album_id = album_id;
        this.loadData();
      },
      loadData(page = 1){
        this.$axios.post(`user/photos/get/${this.album_id}?page=${page}`)
        .then((data) => {
          this.images = data.data;
        })
      },
      lookPhoto(src) {
        //
      },
      removePhoto(id) {
        this.$store.dispatch('removePhotoACTION', id)
      }
    }
  }
</script>
