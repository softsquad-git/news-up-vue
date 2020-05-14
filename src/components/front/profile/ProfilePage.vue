<template>

  <div class="row q-tabs__content--align-center" style="margin-top: 50px;">
    <div class="col-xl-9 col-lg-9 col-md-10 col-sm-12 col-xs-12">
      <div class="__card__profile__page__">
        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12">
            <div class="__card__profile__sidebar">
              <div class="__profile__sidebar__avatar">
                <img :src="user.avatar" :alt="user.s.name"/>
              </div>
              <div class="__profile__sidebar__full_name">
                {{ user.s.name + ' ' + user.s.last_name }}
              </div>
              <div class="__profile__sidebar__navbar">
                <q-list bordered separator>
                  <q-item @click="go" clickable v-ripple>
                    <q-item-section>{{ this.$t('profilePage.navBar.dashBoard') }}</q-item-section>
                  </q-item>
                  <q-item @click="goToInfoP" clickable v-ripple>
                    <q-item-section>{{ this.$t('profilePage.navBar.information') }}</q-item-section>
                  </q-item>
                  <q-item @click="goToArticlesP" clickable v-ripple>
                    <q-item-section>{{ this.$t('profilePage.navBar.articles') }}</q-item-section>
                  </q-item>
                  <q-item @click="goToFriends" clickable v-ripple>
                    <q-item-section>{{ this.$t('profilePage.navBar.friends') }}</q-item-section>
                  </q-item>
                  <q-item @click="goToPhotosP" clickable v-ripple>
                    <q-item-section>{{ this.$t('profilePage.navBar.photos') }}</q-item-section>
                  </q-item>
<!--                  <q-item clickable v-ripple>-->
<!--                    <q-item-section>{{ this.$t('profile_page.navbar.achievements') }}</q-item-section>-->
<!--                  </q-item>-->
                </q-list>
              </div>
            </div>
          </div>
          <div class="col-lg-10 col-lg-10 col-md-9 col-sm-8 col-xs-12">
            <div class="__card__profile__content">
              <component :is="currentComponent" :user_id="this.$route.params.id"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import ProfilePageCurrentComponent from "./ProfilePageCurrentComponent";
  import ArticlesProfilePageComponent from "./ArticlesProfilePageComponent";
  import InformationProfilePageComponent from "./InformationProfilePageComponent";
  import AlbumsProfilePageComponent from "./AlbumsProfilePageComponent";
  import FriendsProfilePageComponent from "./FriendsProfilePageComponent";

  export default {
    name: "ProfilePage",
    data() {
      return {
        currentComponent: ProfilePageCurrentComponent
      }
    },
    computed: {
      ...mapGetters({
        'user': 'userP'
      })
    },
    watch: {
      //
    },
    methods: {
      go(){
        this.currentComponent = ProfilePageCurrentComponent;
      },
      loadData() {
        this.$store.dispatch('getUserP', this.$route.params.id);
      },
      goToArticlesP()
      {
        this.currentComponent = ArticlesProfilePageComponent;
      },
      goToInfoP()
      {
        this.currentComponent = InformationProfilePageComponent;
      },
      goToPhotosP()
      {
        this.currentComponent = AlbumsProfilePageComponent
      },
      goToFriends()
      {
        this.currentComponent = FriendsProfilePageComponent
      }
    },
    created() {
      this.loadData();
    }
  }
</script>
