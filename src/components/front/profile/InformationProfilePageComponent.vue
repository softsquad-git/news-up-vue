<template>
  <div>
    <div class="__profile__content_title">
      {{this.$t('profilePage.pages.titles.information')}}
    </div>
    <div class="__profile__content__content">
      <table class="q-table q-table--cell-separator q-table--bordered q-table--no-wrap">
        <tbody>
        <tr>
          <td>{{ this.$t('profilePage.pages.information.name') }}</td>
          <td>{{ user.s.name + ' ' + user.s.last_name }}</td>
        </tr>
        <tr>
          <td>{{ this.$t('profilePage.pages.information.email') }}</td>
          <td>{{ user.email }}</td>
        </tr>
        <tr>
          <td>{{ this.$t('profilePage.pages.information.phone') }}</td>
          <td>{{ user.s.number_phone ? user.s.number_phone : '---' }}</td>
        </tr>
        <tr>
          <td>{{ this.$t('profilePage.pages.information.birthday') }}</td>
          <td>{{ user.s.birthday }}</td>
        </tr>
        <tr>
          <td>{{ this.$t('profilePage.pages.information.addressOne') }}</td>
          <td>{{ user.s.address ? user.s.address : '---' }}</td>
        </tr>
        <tr>
          <td>{{ this.$t('profilePage.pages.information.addressTwo') }}</td>
          <td>{{ user.s.city ? user.s.city : '---' }}, {{ user.s.post_code ? user.s.post_code : '---' }}</td>
        </tr>
        <tr>
          <td>{{ this.$t('profilePage.pages.information.sex.title') }}</td>
          <td>{{ user.s.sex === 'MALE' ? this.$t('profilePage.pages.information.sex.male') :
            this.$t('profilePage.pages.information.sex.female') }}
          </td>
        </tr>
        <tr>
          <td>{{ this.$t('profilePage.pages.information.created') }}</td>
          <td>{{ user.created_at }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InformationProfilePageComponent",
    data() {
      return {
        user: {}
      }
    },
    methods: {
      loadData() {
        this.$axios.post(`profile-page/user/${this.$route.params.id}`)
          .then((data) => {
            this.user = data.data.data
          })
          .catch(() => {
            this.$q.notify({
              message: this.$t('notification.errors.loadData')
            })
          })
      },
    },
    created() {
      this.loadData()
    }
  }
</script>
