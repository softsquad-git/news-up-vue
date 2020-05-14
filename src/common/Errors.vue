<template>
<div v-if="validationErrors">
  <ul class="errors_list">
    <li v-for="(value, key, index) in validationErrors">{{ value }}</li>
  </ul>
</div>
</template>

<script>
  export default {
    name: "Errors",
    props: {
      errors: []
    },
    computed: {
      validationErrors(){
        let errors = Object.values(this.errors);
        errors = errors.flat();
        return errors;
      }
    }
  }
</script>
