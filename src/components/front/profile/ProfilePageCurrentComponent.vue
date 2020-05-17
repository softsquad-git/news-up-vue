<template>
  <div>
    <div class="row q-tabs__content--align-center">
      <div class="col-xl-4 col-xl-4">
        <div class="avatar--c-profile">
          <img :src="user.avatar" :alt="user.s.name"/>
        </div>
        <div class="full--name">
          {{ user.s.name + ' ' + user.s.last_name }}
        </div>
        <div class="created--at">
          {{ user.created_at | moment('calendar')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfilePageCurrentComponent",
    data() {
      return {
        params: {
          user_id: this.$route.params.id
        },
        user: {}
      }
    },
    methods: {
      loadDataUser() {
        this.$axios.post(`profile-page/user/${this.params.user_id}`)
        .then((data) => {
          this.user = data.data.data
        })
        .catch(() => {

        })
      }
    },
    created() {
      this.loadDataUser();
    }
  }
</script>
