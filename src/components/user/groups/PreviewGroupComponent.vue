<template>
 <div class="__page__profile__user__">
   <div class="preview-group">
     <div class="row">
       <div class="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12 padding-10">
         <div class="preview-group-bg" v-bind:style="{ backgroundImage: 'url(' + group.bg_image + ')' }">
           <div class="preview-group-bg-dark">
             {{ group.name }}
             <div class="p-g-b-d-footer">
               <q-btn :to="{ name: 'GroupsUser' }" round outline icon="keyboard_backspace" size="sm"/>
             </div>
           </div>
         </div>
         <div class="preview-group-nav">
           <div class="row">
             <div class="col-xl-8 col-lg-8 col-md-8 col-sm-10 col-xs-12">
               <q-btn @click="getCurrentInfo" :class="$q.dark.isActive ? 'account-color' : ''" :label="this.$t('account.pages.groups.subNavBar.info')" flat/>
               <q-btn @click="getCurrentPosts" :class="$q.dark.isActive ? 'account-color' : ''" :label="this.$t('account.pages.groups.subNavBar.posts')" flat/>
               <q-btn @click="getCurrentPhotos" :class="$q.dark.isActive ? 'account-color' : ''" :label="this.$t('account.pages.groups.subNavBar.photos')" flat/>
             </div>
             <div class="col-lg-4 text-right">

             </div>
           </div>
         </div>
         <div class="row">
           <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <component :is="currentComponent"/>
           </div>
         </div>
       </div>
       <div class="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12 padding-10">
         <q-btn-dropdown size="sm" color="orange" icon="search">
           <q-list>
             <q-item clickable v-close-popup @click="loadDataUsersGroup(params.is_admin = true)">
               <q-item-section>
                 <q-item-label>{{usersOptions.administrators}}</q-item-label>
               </q-item-section>
             </q-item>

             <q-item clickable v-close-popup @click="loadDataUsersGroup(params.is_author = true)">
               <q-item-section>
                 <q-item-label>{{usersOptions.author}}</q-item-label>
               </q-item-section>
             </q-item>

             <q-item clickable v-close-popup @click="loadDataUsersGroup(params.is_author = '', params.is_admin = '')">
               <q-item-section>
                 <q-item-label>{{usersOptions.members}}</q-item-label>
               </q-item-section>
             </q-item>
           </q-list>
         </q-btn-dropdown>
         <q-list>
           <q-item v-for="user in usersGroup" clickable v-ripple :to="{name: 'ProfilePage', params: {id: user.user.id}}">
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
  import PostsGroupComponent from "./PostsGroupComponent";
  import GroupInfoComponent from "./GroupInfoComponent";
  import PhotosGroupComponent from "./PhotosGroupComponent";

  export default {
    name: "PreviewGroupComponent",
    components: {GroupInfoComponent},
    data() {
      return {
        group: {},
        usersGroup: [],
        params: {
          ordering: '',
          is_admin: '',
          is_author: ''
        },
        currentComponent: PostsGroupComponent,
        usersOptions: {
          administrators: this.$t('account.pages.groups.userOptions.administrators'),
          author: this.$t('account.pages.groups.userOptions.author'),
          members: this.$t('account.pages.groups.userOptions.members')
        }
      }
    },
    methods: {
      getCurrentPosts() {
        this.currentComponent = PostsGroupComponent
      },
      getCurrentInfo() {
        this.currentComponent = GroupInfoComponent
      },
      getCurrentPhotos() {
        this.currentComponent = PhotosGroupComponent
      },
      loadData() {
        const id = this.$route.params.id;
        this.$axios.post('user/groups/preview/' + id)
          .then((data) => {
            this.group = data.data.data
          })
          .catch(() => {
            this.$q.notify({
              message: this.$t('notification.errors.loadData'),
              color: 'negative'
            })
          })
      },
      loadDataUsersGroup() {
        const id = this.$route.params.id;
        this.$axios.post('user/groups/users/get/' + id + `?is_admin=${this.params.is_admin}&is_author=${this.params.is_author}&ordering=${this.params.ordering}`)
          .then((data) => {
            this.usersGroup = data.data.data
          })
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
      this.loadDataUsersGroup();
    }
  }
</script>
