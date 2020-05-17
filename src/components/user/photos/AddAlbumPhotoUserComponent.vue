<template>
  <q-dialog v-model="addAlbum">
    <q-card class="modal__photos">
      <q-card-section>
        <div class="text-h6">Add album</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="submitCreateAlbum">
          <q-input type="text" v-model="data.name" placeholder="Name album"/>
          <q-input type="textarea" v-model="data.description" placeholder="Description"/>
          <q-btn style="margin-top: 20px;" type="submit" color="positive" label="Send"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "AddAlbumPhotoUserComponent",
    data() {
      return {
        addAlbum: false,
        data: {
          name: '',
          description: ''
        }
      }
    },
    methods: {
      openModal() {
        this.addAlbum = true
      },
      submitCreateAlbum() {
        this.$axios.post('user/album-photos/store', this.data)
        .then((data) => {
          if (data.data.success === 1) {
            this.addAlbum = false;
            this.$parent.loadData();
          }
        })
      }
    }
  }
</script>

