<template>
  <div class="container">
    <div class="row q-tabs__content--align-center">
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card login__card">
          <div class="card__auth_title">
            {{ this.$t('auth.login') }}
          </div>
          <q-card-action class="card__auth_form">
            <q-form @submit="submitLoginForm">
              <q-input
                type="email"
                :placeholder="this.$t('auth.email')"
                v-model="data.email"
                required
              />
              <q-input
                type="password"
                :placeholder="this.$t('auth.password')"
                v-model="data.password"
                required
              />
              <q-toggle
                v-model="data.remember"
                :label="this.$t('auth.remember')"
              />
              <q-btn
                :label="this.$t('buttons.submit')"
                color="green"
                type="submit"
              />
            </q-form>
            <div class="row" style="margin-top: 10px;">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <router-link :to="{name: 'ForgotPassword'}" style="color: #ff0a0a;margin-top: 10px;">{{ this.$t('auth.forgot.title') }}</router-link>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <router-link :to="{name: 'Register'}" style="margin-top: 10px;color: green">{{ this.$t('auth.register') }}</router-link>
              </div>
            </div>
            <errors v-if="errors" :errors="errors"/>
          </q-card-action>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
  import Errors from "src/common/ErrorsComponent";
  export default {
    name: "Login",
    components: {Errors},
    data() {
      return {
        data: {
          email: '',
          password: '',
          remember: false
        },
        errors: null
      }
    },
    methods: {
      submitLoginForm()
      {
        this.$axios.post('auth/login', this.data)
        .then((data) => {
          if (data.data.success === 1) {
            localStorage.setItem('token', data.data.access_token);
            localStorage.setItem('userId', data.data.user_id);
            if (data.data.dark_mode === true) {
              localStorage.setItem('darkMode', 1);
            }
            this.$router.push({
              name: 'IndexPage'
            });
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
            this.$q.notify({
              message: this.$t('notification.errors.validData'),
              color: 'negative'
            })
          }
          if (error.response.status === 401) {
            this.$q.notify({
              message: this.$t('auth.notify.401'),
              color: 'warning'
            })
          }
        })
      }
    }
  }
</script>
