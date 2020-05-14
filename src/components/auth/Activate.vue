<template>
  <div class="container">
    <div class="row q-tabs__content--align-center">
      <div class="col-lg-3">
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
          </q-card-action>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Activate",
    data() {
      return {
        data: {
          _key: ''
        }
      }
    },
    methods: {
      submitActivateAccountForm() {

      }
    }
  }
</script>
