<template>
  <div>
    <q-btn
      @click="setFollow"
      size="10px" class="footer__article_icon"
      :color="follow_ch ? 'lime-6' : 'white'"
      text-color="black" round icon="star_outline"
    >
      <q-badge floating :color="follow_ch ? 'lime-6' : 'white'" text-color="black">{{ c_follows }}</q-badge>
    </q-btn>
  </div>
</template>

<script>
  export default {
    name: "FollowArticleComponent",
    data() {
      return {
        data: {
          resource_id: this.resource_id,
          resource_type: this.resource_type
        },
        follow_ch: null
      }
    },
    props: {
      resource_id: '',
      resource_type: '',
      c_follows: 0
    },
    mounted() {
      this.followOrNot()
    },
    methods: {
      setFollow() {
        if (localStorage.getItem('token')){
          this.$axios.post('follow', this.data)
          .then((data) => {
            if (data.data.success === 1) {
              this.followOrNot();
              this.$parent.loadData();
            }
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.$q.notify({
                message: this.$t('notification.info.reloadPage'),
                color: 'warning'
              })
            }
          })
        } else {
          this.$q.notify({
            message: this.$t('errors.please_login'),
            color: 'negative'
          })
        }
      },
      followOrNot() {
        if (localStorage.getItem('token')){
          this.$axios.post('get-follow?resource_id=' + this.resource_id + '&resource_type=' + this.resource_type)
            .then((data) => {
              const isFollow = data.data.follow;
              if (isFollow === true) {
                this.follow_ch = true;
              } else if (isFollow === false) {
                this.follow_ch = false
              }
            })
        }
      }
    },
    created() {
      this.followOrNot()
    }
  }
</script>
