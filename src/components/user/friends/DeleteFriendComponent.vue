<template>
  <q-btn
    :size="'xs'"
    round
    color="negative"
    @click="deleteFriendClick"
    icon="delete"
    outline
  />
</template>

<script>
  export default {
    name: "DeleteFriendComponent",
    data() {
      return {
        //
      }
    },
    props: {
      id: ''
    },
    methods: {
      deleteFriendClick() {
        this.$axios.post(`user/friends/remove/${this.id}`)
          .then(() => {
            this.$parent.loadData()
          })
          .catch(() => {
          })
      }
    }
  }
</script>
