<template>

</template>

<script>
  export default {
    name: "LogoutUser",
    methods: {
      logout() {
        this.$axios.post('user/logout')
          .then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            this.$router.push({name: 'IndexPage'})
          })
      }
    },
    created() {
      this.logout();
    }
  }
</script>
