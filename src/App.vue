<template>
  <div id="q-app">
    <router-view />
    <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 350px">
        <q-linear-progress :value="0.6" color="pink" />

        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold">The Walker</div>
            <div class="text-grey">Fitz & The Tantrums</div>
          </div>

          <q-space />

          <q-btn flat round icon="fast_rewind" />
          <q-btn flat round icon="pause" />
          <q-btn flat round icon="fast_forward" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      dialog: false,
      position: 'bottom'
    }
  },
  created() {
    this.$q.loadingBar.setDefaults({
      color: 'light-green',
      size: '5px',
      position: 'bottom'
    });
  }
}
</script>
