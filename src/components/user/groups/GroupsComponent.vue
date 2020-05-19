<template>
  <div class="__page__profile__user__">
    <div class="profile__user_header">
      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div class="profile___user__header_title" :class="$q.dark.isActive ? 'account__title_dark' : ''">
            {{ title }}
          </div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12 text-right">
          <q-btn-dropdown color="warning" style="margin-right: 10px;"
                          :label="this.$t('account.pages.groups.filters.title')"
                          dropdown-icon="search">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>{{ filters.yourGroups }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>{{ filters.belongTo }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn
            icon="add"
            :to="{ name: 'CreateGroup' }"
            color="positive"
            :label="this.$t('account.pages.titles.createGroup')"
          />
        </div>
      </div>
    </div>
    <div class="profile__user_content">
      <div class="row">
        <div v-if="groups.length > 0" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 20px;"
             v-for="group in groups">
          <div class="groups-list" :class="$q.dark.isActive ? 'text-light' : ''">
            <div class="groups-list-header">
              <div class="row">
                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-7 col-xs-7">
                  <div class="groups-list-header-name" :class="$q.dark.isActive ? 'groups-list-header-name_dark' : ''">
                    <router-link :to="{name: 'PreviewGroup', params: {id: group.id, name: group.name}}"> {{ group.name}}
                    </router-link>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-xs-5">
                  <div class="groups-list-header-created">
                    {{ group.created_at | moment('calendar') }}
                    <q-btn-dropdown v-if="group.is_admin === 1 || group.is_author === 1" flat size="xs">
                      <q-list>
                        <q-item :to="{ name: 'EditGroup', params: { id: group.id } }"
                                v-if="group.is_admin === 1 || group.is_author === 1" clickable v-close-popup>
                          <q-item-section>
                            <q-item-label>{{ buttons.edit }}</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item v-if="group.is_author === 1" clickable v-close-popup @click="onRemoveGroup(group.id)">
                          <q-item-section>
                            <q-item-label>{{ buttons.remove }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 col-xl-12">
                <div class="groups-list-description">
                  <span v-if="group.description">{{ group.description.substr(0, 500) }}</span>
                  <span v-else>{{ notification.noAdded }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <no-data-component/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PostsGroupComponent from "./PostsGroupComponent";
  import NoDataComponent from "src/common/NoDataComponent";

  export default {
    name: "GroupsComponent",
    components: {NoDataComponent},
    data() {
      return {
        title: this.$t('account.pages.titles.groups'),
        groups: [],
        currentComponent: PostsGroupComponent,
        filters: {
          yourGroups: this.$t('account.pages.groups.filters.yourGroups'),
          belongTo: this.$t('account.pages.groups.filters.belongTo')
        },
        notification: {
          noAdded: this.$t('notification.info.noAdded')
        },
        buttons: {
          remove: this.$t('buttons.delete'),
          edit: this.$t('buttons.edit')
        }
      }
    },
    methods: {
      loadData() {
        this.$axios.post('user/groups')
          .then((data) => {
            this.groups = data.data.data
          })
          .catch(() => {
            this.$q.notify({
              message: this.$t('notification.errors.loadData'),
              color: 'negative'
            })
          })
      },
      onRemoveGroup(id) {
        this.$axios.post(`user/groups/remove/${id}`)
          .then((data) => {
            if (data.data.success === 1) {
              this.loadData();
              this.$q.notify({
                message: this.$t('account.groups.notify.removeGroup'),
                color: 'positive'
              })
            }
          })
          .catch(() => {
            this.$q.notify({
              message: this.$t('notification.errors.invalid'),
              color: 'negative'
            })
          })
      }
    },
    mounted() {
      this.loadData();
    }
  }
</script>
