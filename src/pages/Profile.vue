<template>
  <q-page class="profile_user_page">
    <header>
      <div class="p_u_p_welcome" :class="$q.dark.isActive ? 'account__title_dark' : ''">
        {{ this.$t('account.welcome') }}, {{ user.s.name + ' ' + user.s.last_name }}
      </div>
    </header>
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 padding-10">
        <div class="p_u_p_box" :class="$q.dark.isActive ? 'p_u_p_box_dark' : ''">
          <div class="row">
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <div class="p_u_p_box_icon">
                <q-icon name="description"/>
              </div>
            </div>
            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
              <div class="p_u_p_box_content">
                {{ this.$t('account.articles') }} <br/>
                <router-link :to="{name: 'ArticlesListUser'}"> {{ this.$t('account.look') }}
                  <q-icon name="navigate_next"/>
                </router-link>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="p_u_p_box_number">
                {{ user.articles }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 padding-10">
        <div class="p_u_p_box" :class="$q.dark.isActive ? 'p_u_p_box_dark' : ''">
          <div class="row">
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <div class="p_u_p_box_icon">
                <q-icon name="supervised_user_circle"/>
              </div>
            </div>
            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
              <div class="p_u_p_box_content">
                {{ this.$t('account.friends') }} <br/>
                <router-link :to="{name: 'CurrentFriends'}"> {{ this.$t('account.look') }}
                  <q-icon name="navigate_next"/>
                </router-link>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="p_u_p_box_number">
                {{ user.friends }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 padding-10">
        <div class="p_u_p_box" :class="$q.dark.isActive ? 'p_u_p_box_dark' : ''">
          <div class="row">
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <div class="p_u_p_box_icon">
                <q-icon name="photo"/>
              </div>
            </div>
            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
              <div class="p_u_p_box_content">
                {{ this.$t('account.photos') }} <br/>
                <router-link :to="{name: 'PhotosUser'}"> {{ this.$t('account.look') }}
                  <q-icon name="navigate_next"/>
                </router-link>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
              <div class="p_u_p_box_number">
                {{ user.photos }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 padding-10">
        <div class="p_u_p_info">
          <div class="q-table__top relative-position row items-center">
            <div class="q-table__control">
              <div class="q-table__title" :class="$q.dark.isActive ? 'account__title_dark' : ''">
                {{ this.$t('account.information.title') }} <sub>
                <router-link style="color: #8bc34a; font-size: 13px;" :to="{name: 'SettingsUser'}">
                  {{ this.$t('buttons.edit') }}
                </router-link>
              </sub>
              </div>
            </div>
          </div>
          <table class="q-table q-table--cell-separator q-table--bordered q-table--no-wrap" :class="$q.dark.isActive ? 'q-table_dark' : ''">
            <tbody>
            <tr>
              <td>{{ this.$t('account.information.user') }}</td>
              <td>{{ user.s.name + ' ' + user.s.last_name }}</td>
            </tr>
            <tr>
              <td>{{ this.$t('account.information.email') }}</td>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <td>{{ this.$t('account.information.contactData') }}</td>
              <td>{{ user.s.post_code }} {{ user.s.city }}, {{ user.s.address }}</td>
            </tr>
            <tr>
              <td>{{ this.$t('account.information.contactPhone') }}</td>
              <td v-if="user.s.number_phone">{{ user.s.number_phone }}</td>
              <td v-else>{{ this.$t('notification.info.noAdded') }}</td>
            </tr>
            <tr>
              <td>{{ this.$t('account.information.birthday') }}</td>
              <td>{{ user.s.birthday }}</td>
            </tr>
            <tr>
              <td>{{ this.$t('account.information.dateRegister') }}</td>
              <td>{{ user.created_at | moment('calendar') }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 padding-10">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="p_u_p_title" :class="$q.dark.isActive ? 'account__title_dark' : ''">
              {{ this.$t('account.watching') }}
            </div>
            <div class="p_u_p_followed_nav">
              <q-btn
                @click="loadWatchingData('ARTICLE')"
                color="positive"
                :outline="type !== 'ARTICLE'"
                size="sm"
                :label="this.$t('account.articles')"
                style="margin-right: 5px;"
              />
              <q-btn
                @click="loadWatchingData('USER')"
                color="positive"
                :outline="type !== 'USER'"
                size="sm"
                :label="this.$t('account.users')"
              />
            </div>
            <div class="p_u_p_followed_box">
              <q-list bordered>
                <div v-if="type === 'ARTICLE'">
                  <q-item v-for="watchArticle in watchingArticles.data" clickable v-ripple>
                    <q-item-section avatar>
                      <q-avatar rounded>
                        <img :src="watchArticle.article.image" :alt="watchArticle.article.title">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <router-link :to="{name: 'Article', params: {id: watchArticle.article.id, title: watchArticle.article.title}}">
                        {{ watchArticle.article.title }}
                      </router-link>
                    </q-item-section>
                    <q-item-section side top>
                      <q-icon @click="unfollow(watchArticle.id)" name="delete" style="font-size: 15px;" color="negative"/>
                    </q-item-section>
                  </q-item>
                  <pagination :data="watchingArticles" @pagination-change-page="loadWatchingData">
                    <span slot="prev-nav"><q-icon name="skip_previous"/></span>
                    <span slot="next-nav"><q-icon name="skip_next"/></span>
                  </pagination>
                </div>
                <div v-if="type === 'USER'">
                  <q-item v-for="watchUser in watchingUsers.data" clickable v-ripple>
                    <q-item-section avatar>
                      <q-avatar rounded>
                        <img :src="watchUser.user.avatar" :alt="watchUser.user.s.name">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <router-link :to="{name: 'ProfilePage', params: {id: watchUser.user.id}}">{{ watchUser.user.s.name + ' ' + watchUser.user.s.last_name }}</router-link>
                    </q-item-section>
                    <q-item-section side top>
                      <q-icon @click="unfollow(watchUser.id)" name="delete" style="font-size: 15px;" color="negative"/>
                    </q-item-section>
                  </q-item>
                  <pagination :data="watchingUsers" @pagination-change-page="loadWatchingData">
                    <span slot="prev-nav"><q-icon name="skip_previous"/></span>
                    <span slot="next-nav"><q-icon name="skip_next"/></span>
                  </pagination>
                </div>

              </q-list>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="p_u_p_title" :class="$q.dark.isActive ? 'account__title_dark' : ''">
              {{ this.$t('account.watchingYou') }}
            </div>
            <div class="p_u_p_followed_box" style="margin-top: 30px;">
              <q-list>
                <q-item v-for="watchUser in watchingYou.data" clickable v-ripple :to="{name: 'ProfilePage', params: {id: watchUser.user.id}}">
                  <q-item-section avatar>
                    <q-avatar rounded>
                      <img :src="watchUser.user.avatar" :alt="watchUser.user.s.name">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>{{ watchUser.user.s.name + ' ' + watchUser.user.s.last_name }}</q-item-section>
                </q-item>
              </q-list>
              <pagination :data="watchingYou" @pagination-change-page="loadWatchingYouData">
                <span slot="prev-nav"><q-icon name="skip_previous"/></span>
                <span slot="next-nav"><q-icon name="skip_next"/></span>
              </pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: "Profile",
    data() {
      return {
        user: {},
        watchingArticles: {},
        watchingUsers: {},
        watchingYou: {},
        type: '',
        name: ''
      }
    },
    methods: {
      loadUser() {
        this.$axios.post('user')
          .then((data) => this.user = data.data.data)
      },
      loadWatchingData(type, page = 1) {
        this.type = type;
        this.$axios.post(`user/follows/get/${type}?page=${page}`)
          .then((data) => {
            if (type === 'ARTICLE') {
              this.watchingArticles = data.data
            } else if (type === 'USER') {
              this.watchingUsers = data.data
            }
          })
      },
      unfollow(id) {
        this.$axios.post(`user/follows/remove/${id}`)
        .then(() => {
          this.loadWatchingData(this.type);
          this.$q.notify({
            message: this.$t('global.unFollow'),
            color: 'positive'
          })
        })
      },
      loadWatchingYouData(page = 1) {
        this.$axios.post('user/follows/watching-you?page='+page)
        .then((data) => {
          this.watchingYou = data.data
        })
      }
    },
    mounted() {
      this.loadUser();
      this.loadWatchingData('ARTICLE');
      this.loadWatchingYouData();
    },
    created() {
      console.log(this.name);
    }
  }
</script>
