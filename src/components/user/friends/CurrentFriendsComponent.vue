<template>
  <div class="__page__profile__user__">
    <div class="profile__user_header">
      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div class="profile___user__header_title" :class="$q.dark.isActive ? 'account__title_dark' : ''">
            {{ this.$t('account.pages.titles.friends') }}
          </div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12 text-right">
          <q-btn-dropdown color="warning" style="margin-right: 10px;" :label="this.$t('account.pages.friends.filters.title')"
                          dropdown-icon="search">
            <q-list>
              <q-item clickable v-close-popup @click="getFriends('friends')">
                <q-item-section>
                  <q-item-label>{{ this.$t('account.pages.friends.filters.friends') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="getFriends('sent')">
                <q-item-section>
                  <q-item-label>{{ this.$t('account.pages.friends.filters.sent') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="getFriends('waiting')">
                <q-item-section>
                  <q-item-label>{{ this.$t('account.pages.friends.filters.waiting') }}</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
          <q-btn
            icon="search"
            outline
            :to="{ name: 'Peoples' }"
            color="warning"
            :label="this.$t('buttons.search')"
          />
        </div>
      </div>
    </div>
    <div class="profile__user_content">
      <component :is="currentComponent"/>
    </div>
  </div>
</template>

<script>
  import FriendsUserComponent from "./FriendsUserComponent";
  import SentInvitationsComponent from "./SentInvitationsComponent";
  import WaitingInvitationsComponent from "./WaitingInvitationsComponent";

  export default {
    name: "CurrentFriendsComponent",
    data() {
      return {
        status: 'friends',
        currentComponent: FriendsUserComponent
      }
    },
    methods: {
      getFriends(status) {
        this.status = status;
        if (this.status === 'friends') {
          this.currentComponent = FriendsUserComponent
        } else if (this.status === 'sent') {
          this.currentComponent = SentInvitationsComponent
        } else if (this.status === 'waiting') {
          this.currentComponent = WaitingInvitationsComponent
        }
      }
    },
    created() {
      this.getFriends('friends');
    }
  }
</script>
