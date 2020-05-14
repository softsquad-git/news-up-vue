<template>
  <div>
    <q-form @submit="submitCommentForm">
      <q-input
        type="textarea"
        v-model="data.content"
        :label="this.$t('comments.create.title')"
        :placeholder="this.$t('comments.create.placeholder')"
      />
      <q-btn
        type="submit"
        color="positive"
        outline
        style="margin-top: 5px"
        :label="this.$t('buttons.save')"/>
    </q-form>
  </div>
</template>

<script>
  export default {
    name: "AddCommentArticleComponent",
    data() {
      return {
        data: {
          content: '',
          resource_id: this.resource_id,
          resource_type: this.resource_type
        },
        errors: []
      }
    },
    props: {
      resource_id: '',
      resource_type: ''
    },
    methods: {
      submitCommentForm() {
        this.$axios.post('comments/store', this.data)
          .then(() => {
            this.$parent.loadData();
            this.data.content = '';
            this.$q.notify({
              message: this.$t('global.addComment'),
              color: 'positive'
            })
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
            this.$q.notify({
              message: this.$t('notification.errors.validData'),
              color: 'negative'
            })
          })
      }
    }
  }
</script>
