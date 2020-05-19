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
                    :label="this.$t('auth.name')"
                    v-model="data.name"
                    name="name"
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
                  />
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input
                    type="password"
                    :placeholder="this.$t('auth.password')"
                    v-model="data.password"
                    :label="this.$t('auth.password')"
                    name="password"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-input v-model="data.birthday" :label="this.$t('auth.birthday')" mask="####-##-##"
                   name="birthday"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="q-gutter-sm mb-3" :label="this.$t('auth.sex.title')">
                    <q-radio v-model="data.sex" name="sex" val="FEMALE" :label="this.$t('auth.sex.female')"/>
                    <q-radio v-model="data.sex" name="sex" val="MALE" :label="this.$t('auth.sex.male')"/>
                  </div>
                </div>
              </div>
              <q-toggle
                v-model="data.terms" name="terms">
                <span v-html="this.$t('auth.acceptTerms')"></span>
              </q-toggle>
              <q-btn
                :label="this.$t('buttons.submit')"
                color="green"
                type="submit"
              />
            </q-form>
            <errors-component v-if="errorsV" :errors="errorsV"/>
            <div class="row" style="margin-top: 10px;">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <router-link :to="{name: 'Login'}" style="color:green">{{this.$t('auth.login')}}</router-link>
              </div>
            </div>
          </q-card-action>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
  import ErrorsComponent from "src/common/ErrorsComponent";
  export default {
    name: "Register",
    components: {
      'errors-component': ErrorsComponent
    },
    data() {
      return {
        showErrors: false,
        data: {
          name: '',
          last_name: '',
          email: '',
          password: '',
          birthday: '',
          sex: '',
          terms: false
        },
        errorsV: null
      }
    },
    validations: {

    },
    methods: {
      submitRegisterForm() {
        this.$axios.post('auth/register', this.data)
          .then((data) => {
            if (data.data.success === 1) {
              this.$q.notify({
                message: this.$t('auth.notify.registerSuccess'),
                color: 'positive'
              });
              this.$router.push({name: 'Login'})
            }
          })
          .catch((error) => {
            this.errorsV = error.response.data.errors;
          })
      },
    },
  }
</script>
