<template>
  <div>
    <div class="home__page_title" style="margin-bottom: 10px;">
      {{ this.$t('home.latestPhotos') }}
    </div>
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" v-for="photo in photos">
            <div class="home__latest_photos" v-bind:style="{ backgroundImage: 'url(' + photo.src + ')' }">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PhotosHomeComponent",
    data() {
      return {
        photos: []
      }
    },
    methods: {
      loadData() {
        this.$axios.post('home/latest-photos')
          .then((data) => {
            this.photos = data.data.data
          })
      }
    },
    mounted() {
      this.loadData();
    }
  }
</script>
