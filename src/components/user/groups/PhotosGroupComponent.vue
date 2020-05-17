<template>
  <viewer :images="images">
    <div class="row">
      <div class="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-xs-3" v-for="src in images" :key="src">
        <img class="full-width posts-group-content-img" :src="src">
      </div>
    </div>
  </viewer>
</template>

<script>
    export default {
        name: "PhotosGroupComponent",
      data() {
        return {
          images: []
        }
      },
      methods:{
        loadData(){
          let id = this.$route.params.id;
          this.$axios.post('user/groups/images/' + id)
            .then((data) => this.images = data.data.data)
            .catch((error) => {
              this.$q.notify({
                message: this.$t('notification.errors.loadData'),
                color: 'positive'
              })
            })
        }
      },
      mounted() {
          this.loadData();
      }
    }
</script>
