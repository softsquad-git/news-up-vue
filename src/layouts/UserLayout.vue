<template>
  <q-layout view="lHh Lpr lFf" class="text-black">
    <q-header elevated class="bg-light-green">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />
        <q-toolbar-title>

        </q-toolbar-title>
        <q-btn-dropdown
          flat
          icon="face"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Ustawienia</div>
              <q-toggle v-model="serviceDarkBG" label="Ciemny motyw" />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img :src="user.avatar">
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ user.s.name + ' ' + user.s.last_name }}</div>

              <q-btn
                :to="{name: 'LogoutUser'}"
                color="negative"
                label="Logout"
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
    >
      <q-list bordered separator>
        <q-item :to="{ name: 'IndexPage' }" clickable v-ripple>
          <q-item-section>
            <q-icon name="keyboard_backspace"/>
            {{ this.$t('account.navBar.home') }}
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'Profile' }" style="color: #8bc34a" clickable v-ripple>
          <q-item-section>
            <q-icon name="home"/>
            {{ this.$t('account.navBar.dashboard') }}
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'ArticlesListUser' }" clickable v-ripple>
          <q-item-section>
            <q-icon name="description"/>
            {{ this.$t('account.navBar.articles') }}
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'CurrentFriends' }" clickable v-ripple>
          <q-item-section>
            <q-icon name="group"/>
            {{ this.$t('account.navBar.friends') }}
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'PhotosUser' }" clickable v-ripple>
          <q-item-section>
            <q-icon name="photo"/>
            {{ this.$t('account.navBar.photos') }}
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'GroupsUser' }" clickable v-ripple>
          <q-item-section>
            <q-icon name="group_work"/>
            {{ this.$t('account.navBar.groups') }}
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'SettingsUser' }" clickable v-ripple>
          <q-item-section>
            <q-icon name="settings"/>
            {{ this.$t('account.navBar.settings') }}
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'LogoutUser' }" clickable v-ripple>
          <q-item-section>
            <q-icon name="power_settings_new"/>
            {{ this.$t('account.navBar.logout') }}
          </q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  export default {
    name: "UserLayout",
    data() {
      return {
        leftDrawerOpen: false,
        user: {},
        serviceDarkBG: false
      }
    },
    mounted() {
      this.$axios.post('user')
      .then((data) => this.user = data.data.data)
    }
  }
</script>
