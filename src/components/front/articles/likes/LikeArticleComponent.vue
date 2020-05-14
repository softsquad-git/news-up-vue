<template>
  <div>
    <q-btn @click="setLike(1)" size="10px" class="footer__article_icon" :color="like_y ? 'positive' : 'white'" text-color="black" round icon="thumb_up">
      <q-badge floating color="green">{{ c_likes_up }}</q-badge>
      <q-tooltip>
        {{ this.$t('like.add_like') }}
      </q-tooltip>
    </q-btn>
    <q-btn @click="setLike(0)" size="10px" class="footer__article_icon" :color="like_n ? 'negative' : 'white'" text-color="black" round icon="thumb_down">
      <q-badge floating color="red">{{ c_likes_down }}</q-badge>
      <q-tooltip>
        {{ this.$t('like.add_un_like') }}
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "LikeArticleComponent",
    data() {
      return {
        data: {
          resource_id: this.resource_id,
          resource_type: this.resource_type,
          like: ''
        },
        like_y: null,
        like_n: null
      }
    },
    props: {
      resource_id: '',
      resource_type: '',
      c_likes_up: 0,
      c_likes_down: 0,
      group_id: ''
    },
    mounted() {
      this.likeOrNot()
    },
    computed: {
      ...mapGetters({
        like: 'like',
        errors: 'errorsLike'
      }),
    },
    watch: {
      like() {
        this.likeOrNot();
        this.$emit('loadData')
      }
    },
    methods: {
      setLike(like) {
        if (localStorage.getItem('token')){
          this.data.like = like;
          this.$store.dispatch('setLike', this.data)
        }else{
          this.$q.notify({
            message: this.$t('errors.please_login'),
            color: 'negative'
          })
        }
      },
      likeOrNot(){
          this.$axios.post('get-like?resource_id=' + this.resource_id + '&resource_type='+this.resource_type)
            .then((data) => {
              const isLike = data.data.like;
              if (isLike !== undefined){
                if (isLike === 1){
                  this.like_y = true;
                  this.like_n = false;
                }else if (isLike === 0) {
                  this.like_n = true;
                  this.like_y = false;
                }
              } else {
                this.like_y = false;
                this.like_n = false;
              }
            })
            .catch(() => {
              //
            })
        }
    },
    created() {
      if (localStorage.getItem('token')){
        this.likeOrNot();
      }
    }
  }
</script>
