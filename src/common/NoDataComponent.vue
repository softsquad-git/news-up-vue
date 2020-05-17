<template>
  <div v-else class="row">
    <div class="col-lg-12">
      <p class="no-data">
        {{ this.$t('notification.info.noData') }}
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NoDataComponent"
    }
</script>

<style scoped>

</style>
