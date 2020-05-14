<template>
  <div class="row">
    <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12" v-for="user in peoples.data">
      <div class="peoples__list_content" v-bind:style="{ backgroundImage: 'url(' + user.avatar + ')' }">
        <div class="bg__peoples_list_content">
          <div class="header__peoples__list_content">
            <q-btn @click="sendInvitationClick(user.id)" style="background: #fff;margin:10px;" size="10px" round
                   icon="add">
              <q-tooltip>
                Send an invitation
              </q-tooltip>
            </q-btn>
          </div>
          <router-link :to="{name: 'ProfilePage', params: {id: user.id}}" class="bg__peoples_list_content_name">
            {{user.s.name + ' ' + user.s.last_name}}
          </router-link>
        </div>
      </div>
    </div>
    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
      <pagination :data="peoples" @pagination-change-page="loadData">
        <span slot="prev-nav"><q-icon name="skip_previous"/></span>
        <span slot="next-nav"><q-icon name="skip_next"/></span>
      </pagination>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "PeoplesComponent",
    data() {
      return {
        params: {
          name: ''
        },
        data: {
          recipient_id: ''
        },
        peoples: {}
      }
    },
    computed: {
      ...mapGetters({
        s_invitation: 'sendInvitation'
      })
    },
    watch: {
      s_invitation() {
        //
      }
    },
    methods: {
      loadData(page = localStorage.getItem('pagePagination')) {
        if (page === '')
          page = 1;
        if (page !== 1 ) {
          localStorage.setItem('pagePagination', page);
        } else {
          localStorage.setItem('pagePagination', 1);
        }
        if (localStorage.getItem('pagePagination') !== 1) {
          page = localStorage.getItem('pagePagination');
        }
        this.$axios.post(`peoples?page=${page}&name=${this.params.name}`)
          .then((data) => {
            this.peoples = data.data
          })
      },
      sendInvitationClick(id) {
        this.data.recipient_id = id;
        this.$store.dispatch('sendInvitationACTION', this.data);
      }
    },
    created() {
      this.loadData();
    }
  }
</script>
