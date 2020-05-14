<template>
  <q-dialog v-model="viewDescription">
    <q-card>

      <q-card-section>
        {{ description }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "ViewDescriptionAlbum",
    data(){
      return{
        viewDescription: false
      }
    },
    props: {
      description: ''
    },
    methods: {
      openModal(){
        this.viewDescription = true;
      }
    }
  }
</script>
