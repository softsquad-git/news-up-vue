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
          </q-card-action>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        data: {
          email: '',
          password: '',
          remember: false
        }
      }
    },
    methods: {
      submitLoginForm()
      {
        this.$store.dispatch('login', this.data)
        .then(() => this.$router.push('/'))
        .catch(() => {})
      }
    }
  }
</script>
