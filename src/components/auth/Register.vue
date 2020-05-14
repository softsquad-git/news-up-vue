<template>
  <div class="container">
    <div class="row q-tabs__content--align-center">
      <div class="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card login__card">
          <div class="card__auth_title">
            {{ this.$t('auth.register') }}
          </div>
          <q-card-action class="card__auth_form">
            <q-form @submit="submitRegisterForm">
              <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    type="text"
                    :placeholder="this.$t('auth.name')"
                    v-model="data.name"
                    :label="this.$t('auth.name')"
                  />
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    type="text"
                    v-model="data.last_name"
                    :placeholder="this.$t('auth.lastName')"
                    :label="this.$t('auth.lastName')"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    type="email"
                    :placeholder="this.$t('auth.email')"
                    v-model="data.email"
                    :label="this.$t('auth.email')"
                    required
                  />
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    type="password"
                    :placeholder="this.$t('auth.password')"
                    v-model="data.password"
                    :label="this.$t('auth.password')"
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-input v-model="data.birthday" :label="this.$t('auth.birthday')" mask="####-##-##"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="q-gutter-sm mb-3" :label="this.$t('auth.sex.title')">
                    <q-radio v-model="data.sex" val="FEMALE" :label="this.$t('auth.sex.female')"/>
                    <q-radio v-model="data.sex" val="MALE" :label="this.$t('auth.sex.male')"/>
                  </div>
                </div>
              </div>
              <q-toggle
                v-model="data.terms">
                <span v-html="this.$t('auth.acceptTerms')"></span>
              </q-toggle>
              <q-btn
                :label="this.$t('buttons.submit')"
                color="green"
                type="submit"
              />
            </q-form>
          </q-card-action>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "Register",
    data() {
      return {
        data: {
          name: '',
          last_name: '',
          email: '',
          password: '',
          birthday: '',
          sex: '',
          terms: false
        }
      }
    },
    watch: {
      register() {
        this.$router.push({name: 'Login'})
      }
    },
    computed: {
      ...mapGetters({
        register: 'register'
      })
    },
    methods: {
      submitRegisterForm() {
        this.$store.dispatch('registerACTION', this.data)
      }
    }
  }
</script>
