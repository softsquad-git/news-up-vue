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
            this.$router.push({name: 'IndexPage'});
            localStorage.removeItem('darkMode');
            window.location.reload();
          })
      }
    },
    created() {
      this.logout();
    }
  }
</script>
