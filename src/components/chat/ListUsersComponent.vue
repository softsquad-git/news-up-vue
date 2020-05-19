<template>
  <div class="chatWindow">
    <q-list padding>
      <q-item-label header>{{title}}</q-item-label>

      <q-item v-for="friend in friends" clickable v-ripple>
        <q-item-section avatar top>
          <q-img :src="friend.friends.avatar" :alt="friend.friends.s.name"/>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ friend.friends.s.name + ' ' + friend.friends.s.last_name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="more_horiz" color="green" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
  export default {
    name: "ListUsersComponent",
    data() {
      return {
        title: this.$t('chat.friends'),
        friends: []
      }
    },
    methods: {
      loadFriends() {
        this.$axios.post('user/friends')
          .then((data) => {
            this.friends = data.data.data;
          })
          .catch(() => {
            //
          })
      }
    },
    created() {
      this.loadFriends();
    }
  }
</script>
