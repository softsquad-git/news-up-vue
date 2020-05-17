<template>
  <div class="row">
    <div v-if="friends.length > 0" class="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12" v-for="user in friends">
      <div class="peoples__list_content" v-bind:style="{ backgroundImage: 'url(' + user.friends.avatar + ')' }">
        <div class="bg__peoples_list_content">
          <div class="bg__peoples_list_content__header">
            <delete-friend-component :id="user.id"/>
          </div>
          <router-link :to="{name: 'ProfilePage', params: {id: user.friends.id}}" class="bg__peoples_list_content_name">
            {{user.friends.s.name + ' ' + user.friends.s.last_name}}
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <no-data-component/>
    </div>
  </div>
</template>

<script>
  import DeleteFriendComponent from "./DeleteFriendComponent";
  import NoDataComponent from "src/common/NoDataComponent";

  export default {
    name: "SentInvitationsComponent",
    components: {NoDataComponent, DeleteFriendComponent},
    data() {
      return {
        friends: []
      }
    },
    methods: {
      loadData() {
        this.$axios.post('user/friends/sent')
        .then((data) => {
          this.friends = data.data.data;
        })
        .catch(() => {
          this.$q.notify({
            message: this.$t('notification.errors.loadData'),
            color: 'negative'
          })
        })
      },
    },
    created() {
      this.loadData();
    }
  }
</script>
