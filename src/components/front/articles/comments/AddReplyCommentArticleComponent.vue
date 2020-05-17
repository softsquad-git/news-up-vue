<template>
  <q-dialog v-model="addReplyComment" full-width :position="position">
    <q-card>
      <q-form @submit="submitAddReplyCommentForm">
        <div class="row">
          <div class="col-lg-12">
            <q-input
              type="textarea"
              style="padding: 5px;"
              v-model="data.content"
              :placeholder="this.$t('comments.answers.create.title')"
            />
          </div>
          <div class="col-lg-1">
            <q-btn
              type="submit"
              icon="send"
              style="width: 100%;height: 100%"
            />
          </div>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "AddReplyCommentArticleComponent",
    data() {
      return {
        addReplyComment: false,
        position: 'bottom',
        data: {
          comment_id: '',
          content: '',
          parent_id: ''
        }
      }
    },
    methods: {
      view(commentID) {
        this.data.comment_id = commentID;
        this.addReplyComment = true;
      },
      submitAddReplyCommentForm() {
        this.$axios.post('comments/reply/store', this.data)
        .then((data) => {
         if (data.data.success === 1) {
           this.$q.notify({
             message: this.$t('global.addReplyComment'),
             color: 'positive'
           });
           this.data.content = '';
           this.data.parent_id = '';
           this.addReplyComment = false;
           this.$parent.loadData();
           this.data.comment_id = '';
         }
        })
        .catch((error) => {
          console.log(error.response.status)
        })
      }
    }
  }
</script>
