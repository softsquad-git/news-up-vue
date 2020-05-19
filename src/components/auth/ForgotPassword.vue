<template>
  <div class="container">
    <div class="row q-tabs__content--align-center">
      <div class="col-xl-3 col-lg-3 col-md-5 col-sm-9 col-xs-12">
        <q-card class="my-card login__card">
          <div class="card__auth_title">
            {{ this.$t('auth.forgot.title') }}
          </div>
          <q-card-action class="card__auth_form">
            <q-form @submit="submitLink">
              <div class="row">
                <div class="col-lg-10">
                  <q-input
                    type="text"
                    :label="this.$t('auth.forgot.email')"
                    :placeholder="this.$t('auth.forgot.enterEmail')"
                    v-model="data.email"
                  />
                </div>
                <div class="col-lg-2">
                  <q-btn
                    color="green"
                    type="submit"
                    style="width: 100%; border-radius: 0;">
                    <q-icon name="send"/>
                  </q-btn>
                </div>
              </div>
            </q-form>
          </q-card-action>
          <router-link :to="{name: 'NewPassword'}" style="color: #ff0a0a;display: block; margin-top: 10px;">{{ this.$t('auth.forgot.NNNEmptyKey') }}</router-link>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ForgotPassword",
    data() {
      return {
        data: {
          email: ''
        }
      }
    },
    methods: {
      submitLink()
      {
        this.$axios.post('auth/forgot-password-send-key', this.data)
        .then((data) => {
          if (data.data.success === 1) {
            this.$q.notify({
              message: this.$t('auth.forgot.sendKey'),
              color: 'positive'
            });
            this.$router.push({name: 'NewPassword'})
          } else if (data.data.success === 0) {
            this.$q.notify({
              message: this.$t('auth.forgot.emptyAccount'),
              color: 'warning'
            })
          }
        })
        .catch(() => {
          //
        })
      }
    }
  }
</script>
