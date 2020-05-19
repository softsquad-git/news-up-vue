<template>
  <div class="container">
    <div class="row q-tabs__content--align-center">
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card login__card">
          <div class="card__auth_title">
            {{ this.$t('auth.forgot.newPassword') }}
          </div>
          <q-card-action class="card__auth_form">
            <q-form @submit="createNewPassword">
              <q-input
                type="email"
                :placeholder="this.$t('auth.forgot.email')"
                v-model="data.email"
                required
                />
              <q-input
                type="text"
                :placeholder="this.$t('auth.forgot.key')"
                v-model="data.key"
                required
              />
              <q-input
                type="password"
                :placeholder="this.$t('auth.forgot.password')"
                v-model="data.password"
                required
              />
              <q-btn
                :label="this.$t('buttons.submit')"
                color="green"
                type="submit"
              />
            </q-form>
            <router-link :to="{name: 'ForgotPassword'}" style="color: #ff0a0a;display: block; margin-top: 10px;">{{ this.$t('auth.forgot.newKey') }}</router-link>
            <errors v-if="errors" :errors="errors"/>
          </q-card-action>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NewPasswordComponent",
      data(){
          return{
            data: {
              email: '',
              password: '',
              key: ''
            }
          }
      },
      methods: {
        createNewPassword()
        {
          this.$axios.post('auth/new-password', this.data)
          .then((data) => {
            if (data.data.success === 1) {
              this.$q.notify({
                message: this.$t('auth.forgot.notify.successChange'),
                color: 'positive'
              });
              this.$router.push({name: 'Login'})
            } else if (data.data.success === 0) {
              this.$q.notify({
                message: this.$t('auth.forgot.keyInvalid'),
                color: 'negative'
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

<style scoped>

</style>
