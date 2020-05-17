<template>
  <div class="row">
    <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12" v-for="user in friends">
      <div class="peoples__list_content" v-bind:style="{ backgroundImage: 'url(' + user.friends.avatar + ')' }">
        <div class="bg__peoples_list_content__header">
          <delete-friend-component :id="user.id"/>
        </div>
        <div class="bg__peoples_list_content">
          <router-link :to="{name: 'ProfilePage', params: {id: user.friends.id}}" class="bg__peoples_list_content_name">
            {{user.friends.s.name + ' ' + user.friends.s.last_name}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DeleteFriendComponent from "./DeleteFriendComponent"
  export default {
    name: "FriendsUserComponent",
    data(){
      return{
        name: '',
        friends: []
      }
    },
    components: {DeleteFriendComponent},
    methods: {
      loadData() {
        this.$axios.post(`user/friends?name=${this.name}`)
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
