<template>
  <div>
    <div class="__profile__content_title">
      {{this.$t('profilePage.pages.titles.friends')}} ({{friends.length}})
    </div>
    <div class="__profile__content__content">
      <div class="row">
        <div v-if="friends.length > 0" class="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-xs-12" v-for="user in friends">
          <div class="peoples__list_content" v-bind:style="{ backgroundImage: 'url(' + user.friends.avatar + ')' }">
            <div class="bg__peoples_list_content">
              <router-link :to="{name: 'ProfilePage', params: {id: user.friends.id}}"
                           class="bg__peoples_list_content_name">
                {{user.friends.s.name + ' ' + user.friends.s.last_name}}
              </router-link>
            </div>
          </div>
        </div>
        <div v-else>
<!--          <no-data-component/>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NoDataComponent from "src/common/NoDataComponent";
  export default {
    name: "FriendsProfilePageComponent",
    components: {NoDataComponent},
    data() {
      return {
        friends: []
      }
    },
    props: {
      user_id: ''
    },
    methods: {
      loadData() {
        this.$axios.post(`profile-page/friends/${this.user_id}`)
          .then((data) => this.friends = data.data.data)
          .catch(() => {
          })
      }
    },
    created() {
      this.loadData()
    }
  }
</script>
