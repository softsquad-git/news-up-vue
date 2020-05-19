<template>
  <div class="container">
    <div class="row q-tabs__content--align-center">
      <div class="col-xl-3 col-lg-3 col-md-5 col-sm-9 col-xs-12">
        <q-card class="my-card login__card">
          <div class="card__auth_title">
            {{ this.$t('auth.activate.title') }}
          </div>
          <q-card-action class="card__auth_form">
            <q-form @submit="submitActivateAccountForm">
              <div class="row">
                <div class="col-lg-10">
                  <q-input
                    type="text"
                    :label="this.$t('auth.activate.key')"
                    :placeholder="this.$t('auth.activate.key')"
                    v-model="data._key"
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
            <q-btn type="button" class="float-left" @click="refreshLink" color="negative" flat size="sm" :label="this.$t('auth.activate.refresh')"/>
            <q-btn type="button" @click="removeAccount" color="negative" flat size="sm" :label="this.$t('auth.remove_account')"/>
          </q-card-action>
          <errors v-if="errors" :errors="errors"/>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
  import Errors from "src/common/ErrorsComponent";
  export default {
    name: "Activate",
    components: {Errors},
    data() {
      return {
        data: {
          _key: ''
        },
        errors: null
      }
    },
    methods: {
      submitActivateAccountForm() {
        this.$axios.post('user/activate', this.data)
        .then((data) => {
          if (data.data.success === 1) {
            this.$q.notify({
              message: this.$t('auth.activate.success'),
              color: 'positive'
            });
            this.$router.push({name: 'IndexPage'});
          } else {
            this.$q.notify({
              message: this.$t('auth.activate.invalid'),
              color: 'negative'
            })
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
        })
      },
      removeAccount()
      {
        this.$axios.post('user/remove-account')
        .then((data) => {
          if (data.data.success === 1) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            this.$router.push({name: 'IndexPage'});
            this.$q.notify({
              message: this.$t('notification.success.successOperation'),
              color: 'positive'
            })
            window.location.reload();
          }
        })
        .catch(() => {
          this.$q.notify({
            message: this.$t('notification.errors.invalid'),
            color: 'negative'
          })
        })
      },
      refreshLink()
      {
        this.$axios.post('user/activate-key-refresh')
        .then((data) => {
          if (data.data.success === 1) {
            this.$q.notify({
              message: this.$t('auth.activate.refreshSuccess'),
              color: 'positive'
            })
          } else {
            this.$q.notify({
              message: this.$t('notification.errors.invalid'),
              color: 'negative'
            });
            this.$router.push({name: 'IndexPage'})
          }
        })
        .catch((error) => {
          this.$router.push({name: 'IndexPage'})
        })
      }
    }
  }
</script>
