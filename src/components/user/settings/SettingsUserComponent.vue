<template>
  <div class="__page__profile__user__">
    <div class="profile__user_header">
      <div class="row mb-3">
        <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
          <div class="profile___user__header_title">
            {{ this.$t('account.pages.titles.settings') }}
          </div>
        </div>
      </div>
    </div>
    <errors :errors="errors"/>
    <div class="profile__user_content">
      <q-form @submit.prevent="submitEditDataUser">
        <div class="row">
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input type="text" :placeholder="this.$t('account.pages.settings.basicData.name')"
                     v-model="data.name"/>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input type="text" :placeholder="this.$t('account.pages.settings.basicData.lastName')"
                     v-model="data.last_name"/>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input type="text" :placeholder="this.$t('account.pages.settings.basicData.phone')"
                     v-model="data.number_phone"/>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <q-input type="text" :placeholder="this.$t('account.pages.settings.basicData.postCode')"
                     v-model="data.post_code" mask="##-###"/>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input type="text" :placeholder="this.$t('account.pages.settings.basicData.city')"
                     v-model="data.city"/>
          </div>
          <div class="col-xl-5 col-lg-5 col-md-4 col-sm-6 col-xs-12">
            <q-input type="text" :placeholder="this.$t('account.pages.settings.basicData.address')"
                     v-model="data.address"/>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <div class="q-gutter-sm" style="margin-top: 0" :label="this.$t('account.pages.settings.basicData.sex.title')">
              <q-radio v-model="data.sex" val="FEMALE" :label="this.$t('account.pages.settings.basicData.sex.female')"/>
              <q-radio v-model="data.sex" val="MALE" :label="this.$t('account.pages.settings.basicData.sex.male')"/>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <q-btn style="margin-top: 5px;" type="submit" icon="send" :label="this.$t('buttons.save')"/>
          </div>
        </div>
      </q-form>
      <div class="row" style="margin-top: 50px;">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-form v-if="!isTmpEmail" @submit.prevent="submitTryUpdateEmail">
            <div class="row">
              <div class="col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-10">
                <q-input type="email" v-model="dataTryUpdateEmail.tmp_email" :placeholder="this.$t('account.pages.settings.basicData.email.new')"/>
              </div>
              <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-2">
                <q-btn style="margin-top: 19px;border-radius: 0" type="submit" icon="send"/>
              </div>
            </div>
          </q-form>
          <q-form v-else @submit.prevent="submitUpdateEmail">
            <div class="row">
              <div class="col-lg-11">
                <q-input type="text" v-model="dataUpdateEmail._key" :placeholder="this.$t('account.pages.settings.basicData.email.key')"/>
              </div>
              <div class="col-lg-1">
                <q-btn style="margin-top: 19px;border-radius: 0" type="submit" icon="send"/>
              </div>
            </div>
          </q-form>
        </div>
      </div>
      <div class="row" style="margin-top: 50px;">
        <div class="col-lg-3">
          <settings-user-avatar-component :avatar="user.avatar"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SettingsUserAvatarComponent from "./SettingsUserAvatarComponent";

  export default {
    name: "SettingsUserComponent",
    components: {SettingsUserAvatarComponent},
    data() {
      return {
        data: {
          name: '',
          last_name: '',
          number_phone: '',
          city: '',
          post_code: '',
          address: '',
          sex: ''
        },
        s: {},
        dataTryUpdateEmail: {
          tmp_email: ''
        },
        dataUpdateEmail: {
          _key: ''
        },
        isTmpEmail: true
      }
    },
    computed: {
      ...mapGetters({
        user: 'user',
        updateBasicData: 'updateBasicDataU',
        tryUpdateEmailUser: 'tryUpdateEmailU',
        sUpdateEmail: 'updateEmailU'
      })
    },
    watch: {
      user(){
        this.data.name = this.user.s.name;
        this.data.last_name = this.user.s.last_name;
        this.data.number_phone = this.user.s.number_phone;
        this.data.city = this.user.s.city;
        this.data.post_code = this.user.s.post_code;
        this.data.address = this.user.s.address;
        this.data.sex = this.user.s.sex;
      },
      updateBasicData(){
        this.loadData();
      },
      tryUpdateEmailUser(){
        this.checkTryEmail();
      },
      sUpdateEmail(){
        this.checkTryEmail();
      }
    },
    methods: {
      loadData() {
        this.$store.dispatch('getLoggedUser')
      },
      submitEditDataUser(){
        this.$store.dispatch('updateBasicDataACTION', this.data)
      },
      submitTryUpdateEmail()
      {
          this.$store.dispatch('tryUpdateEmailACTION', this.dataTryUpdateEmail)
      },
      checkTryEmail(){
        this.$axios.post('user/settings/check-tmp-email')
        .then((data) => {
          if (data.data.is_tmp === 1){
              this.isTmpEmail = true;
          } else {
              this.isTmpEmail = false;
          }
        })
        .catch(() => {alert(false)})
      },
      submitUpdateEmail(){
        this.$store.dispatch('updateEmailACTION', this.dataUpdateEmail)
      }
    },
    created() {
      this.loadData();
      this.checkTryEmail();
    }
  }
</script>
