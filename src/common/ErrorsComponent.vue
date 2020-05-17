<template>
  <div class="row" v-if="errors">
    <ul class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 errorsLIST" v-for="(v, k) in errors" :key="k">
      <li v-for="error in v" :key="error">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Errors",
    props: {
      errors: []
    },
  }
</script>
<style scoped>
  ul.errorsLIST {
    list-style: none;
    padding: 0;
    color: #da3d3d;
  }
  ul.errorsLIST li {
    margin-bottom: -21px;
  }
</style>
