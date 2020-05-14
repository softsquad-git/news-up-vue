<template>
  <div>
    <span class="ratings-points">
      {{ stars }} / 10
    </span>
    <q-rating
      v-model="stars"
      max="10"
      size="20px"
      color="orange"
      readonly
    />

  </div>
</template>

<script>
  export default {
    name: "RatingComponent",
    props: {
      stars: ''
    }
  }
</script>
