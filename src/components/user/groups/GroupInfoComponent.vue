<template>
  <div class="group-content">
    <div class="g-c-info-desc">
      {{ group.description }}
    </div>
    <div class="g-c-info-members">
      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 padding-10">
          <div class="g-c-i-m-title">
            {{ this.$t('account.pages.groups.userOptions.members') }}  ({{ members.length }})
          </div>
          <q-list>
            <q-item v-for="user in members" clickable v-ripple :to="{name: 'ProfilePage', params: {id: user.user.id}}">
              <q-item-section>{{ user.user.s.name + ' ' + user.user.s.last_name }}</q-item-section>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="user.user.avatar" :alt="user.user.s.name">
                </q-avatar>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 padding-10">
          <div class="g-c-i-m-title">
             {{ this.$t('account.pages.groups.userOptions.administrators') }} ({{ admins.length }})
          </div>
          <q-list>
            <q-item v-for="user in admins" clickable v-ripple :to="{name: 'ProfilePage', params: {id: user.user.id}}">
              <q-item-section>{{ user.user.s.name + ' ' + user.user.s.last_name }}</q-item-section>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="user.user.avatar" :alt="user.user.s.name">
                </q-avatar>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-10">
          <div class="g-c-i-m-title">
            {{ this.$t('account.pages.groups.userOptions.author') }}
          </div>
          <q-list>
            <q-item v-for="user in author" clickable v-ripple :to="{name: 'ProfilePage', params: {id: user.user.id}}">
              <q-item-section>{{ user.user.s.name + ' ' + user.user.s.last_name }}</q-item-section>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="user.user.avatar" :alt="user.user.s.name">
                </q-avatar>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GroupInfoComponent",
    data() {
      return {
        group: {},
        members: [],
        admins: [],
        author: []
      }
    },
    methods: {
      loadData() {
        let id = this.$route.params.id;
        this.$axios.post('user/groups/preview/' + id)
          .then((data) => this.group = data.data.data)
          .catch(() => {
            this.$q.notify({
              message: this.$t('notification.errors.loadData'),
              color: 'positive'
            })
          })
      },
      loadMembers() {
        let id = this.$route.params.id;
        this.$axios.post('user/groups/users/get/' + id)
          .then((data) => {
            this.members = data.data.data
          })
          .catch(() => {
            this.$q.notify({
              message: this.$t('notification.errors.loadData'),
              color: 'negative'
            })
          })
      },
      loadAdmins() {
        let id = this.$route.params.id;
        this.$axios.post(`user/groups/users/get/${id}?is_admin=true`)
          .then((data) => this.admins = data.data.data)
          .catch(() => {
            this.$q.notify({
              message: this.$t('notification.errors.loadData'),
              color: 'negative'
            })
          })
      },
      loadAuthor() {
        let id = this.$route.params.id;
        this.$axios.post(`user/groups/users/get/${id}?is_author=true`)
          .then((data) => this.author = data.data.data)
          .catch(() => {
            this.$q.notify({
              message: this.$t('notification.errors.loadData'),
              color: 'negative'
            })
          })
      }
    },
    mounted() {
      this.loadData();
      this.loadMembers();
      this.loadAdmins();
      this.loadAuthor();
    }
  }
</script>
