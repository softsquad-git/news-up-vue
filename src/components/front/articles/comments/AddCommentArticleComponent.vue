<template>
  <div>
    <errors v-if="errors" :errors="errors"/>
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
  import Errors from "src/common/ErrorsComponent";
  export default {
    name: "AddCommentArticleComponent",
    components: {Errors},
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
          .then((data) => {
           if (data.data.success === 1) {
             this.$parent.loadData();
             this.data.content = '';
             this.$q.notify({
               message: this.$t('global.addComment'),
               color: 'positive'
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
      }
    }
  }
</script>
