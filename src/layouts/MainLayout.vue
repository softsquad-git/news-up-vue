<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-black text-white">
        <q-btn flat round dense icon="menu" @click="showDrawer = !showDrawer">
        </q-btn>
        <q-btn :to="{name: 'IndexPage'}" flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-toolbar-title shrink class="text-weight-bold">
            {{ titles.SiteName }}
          </q-toolbar-title>
        </q-btn>
        <q-toolbar-title/>
        <q-btn flat round dense icon="perm_phone_msg"/>
        <q-btn-dropdown stretch flat icon-right="account_circle">
          <q-list>
            <div v-if="!logged">
            <q-separator inset spaced/>
              <q-item :to="{ name: 'Login' }" clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar icon="account_circle" color="green" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ this.$t('navBar.login') }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="fingerprint"/>
                </q-item-section>
              </q-item>
              <q-item :to="{ name: 'Register' }" clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar icon="account_circle" color="green" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ this.$t('navBar.register') }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="lock_open"/>
                </q-item-section>
              </q-item>
            </div>
            <div v-else>
              <q-separator inset spaced/>
              <q-item :to="{name: 'Profile'}" clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar icon="account_circle" color="primary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ this.$t('navBar.dropdown.profile.t') }}</q-item-label>
                  <q-item-label caption>{{ this.$t('navBar.dropdown.profile.d') }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="account_circle"/>
                </q-item-section>
              </q-item>
              <q-separator inset spaced/>
              <q-item :to="{name: 'ArticlesListUser'}" clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar icon="description" color="primary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ this.$t('navBar.dropdown.articles.t') }}</q-item-label>
                  <q-item-label caption>{{ this.$t('navBar.dropdown.articles.d') }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="description"/>
                </q-item-section>
              </q-item>
              <q-item :to="{name: 'CurrentFriends'}" clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar icon="supervised_user_circle" color="primary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ this.$t('navBar.dropdown.friends.t') }}</q-item-label>
                  <q-item-label caption>{{ this.$t('navBar.dropdown.friends.d') }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="supervised_user_circle"/>
                </q-item-section>
              </q-item>
              <q-item :to="{name: 'GroupsUser'}" clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar icon="group" color="primary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ this.$t('navBar.dropdown.groups.t') }}</q-item-label>
                  <q-item-label caption>{{ this.$t('navBar.dropdown.groups.d') }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="group"/>
                </q-item-section>
              </q-item>
              <q-separator inset spaced/>
              <q-item :to="{name: 'SettingsUser'}" clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar icon="settings" color="warning" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ this.$t('navBar.dropdown.settings.t') }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="settings"/>
                </q-item-section>
              </q-item>
              <q-separator inset spaced/>
              <q-item :to="{name: 'LogoutUser'}" clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar icon="power_settings_new" color="red" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ this.$t('navBar.dropdown.logout.t') }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="lock"/>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="showDrawer"
      bordered
      content-class="bg-grey-2"
      :width="240"
      >
      <q-scroll-area class="fit" :style="$q.dark.isActive ? 'background: #000' : ''">
        <q-list>
          <logo/>
          <q-separator class="q-my-md" />
          <q-item :to="{name: 'IndexPage'}" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ titles.home }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item :to="{ name: 'Articles', params: {category: 'all', location: 'all'} }" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" name="description" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ titles.articles }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item :to="{name: 'Peoples'}" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" name="people" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ titles.peoples }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="q-my-md" />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <div style="padding: 2px;">
        <router-view/>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
  import Logo from "../common/Logo";
  export default {
    name: 'MainLayout',

    components: {Logo},

    data() {
      return {
        logged: localStorage.getItem('token'),
        showDrawer: false,
        titles: {
          home: this.$t('navBar.pages.home'),
          articles: this.$t('navBar.pages.articles'),
          peoples: this.$t('navBar.pages.peoples'),
          SiteName: this.$t('SiteName')
        }
      }
    }
  }
</script>
