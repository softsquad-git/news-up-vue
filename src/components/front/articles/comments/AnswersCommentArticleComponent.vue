<template>
  <q-dialog v-model="answersComment" :position="position">
    <q-card>
      <div class="row">
        <div v-for="reply in answers" class="col-lg-12">
          <div class="comments__list">
            <div class="comments__list_header">
              <q-img :src="reply.user.avatar" :alt="reply.user.s.name" class="comments___list__author_avatar"/>
              <span class="comments___list__author_fullname">
           <router-link :to="{name: 'ProfilePage', params: {id: reply.user_id}}"> {{ reply.user.s.name + ' ' + reply.user.s.last_name }}</router-link>
          </span>
              <span class="comments___list_header_created">
            {{ reply.created_at }}
          </span>
            </div>
            <div class="comments__list_content">
              {{ reply.content }}
            </div>
            <q-form v-show="reply.id === replyID" @submit="submitEditReplyForm(reply.id)">
              <q-input
                type="textarea"
                v-model="dataEdit.content"
                :label="editText.title"
                :placeholder="editText.placeholder"
              />
              <q-btn
                type="submit"
                color="positive"
                :label="editButton.save"
                style="margin: 5px 5px 0 0"
                outline
                size="sm"
              />
              <q-btn
                @click="c"
                type="button"
                color="red"
                :label="editButton.cancel"
                style="margin-top: 5px;"
                outline
                size="sm"
              />
            </q-form>
            <div class="comments__list_footer">
              <q-btn v-if="user_id == reply.user_id" @click="editReply(reply.id, reply.content)" size="10px"
                     class="footer__article_icon" color="warning"
                     round icon="edit"/>
              <q-btn v-if="user_id == reply.user_id" @click="removeReply(reply.id)" size="10px"
                     class="footer__article_icon" color="red" round
                     icon="delete_outline"/>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "AnswersCommentArticleComponent",
    data() {
      return {
        answers: [],
        user_id: localStorage.getItem('userId'),
        replyID: null,
        commentID: null,
        answersComment: false,
        position: 'left',
        dataEdit: {
          id: '',
          content: ''
        },
        editText: {
          title: this.$t('comments.answers.edit.title'),
          placeholder: this.$t('comments.answers.edit.placeholder')
        },
        editButton: {
          save: this.$t('buttons.save'),
          cancel: this.$t('buttons.cancel')
        }
      }
    },
    methods: {
      view(id) {
        this.commentID = id;
        this.loadData(id);
      },
      loadData(id) {
        this.$axios.post(`comments/answers/${id}`)
          .then((data) => {
            this.answers = data.data.data;
            this.answersComment = true;
          })
          .catch(() => {
            //
          });
      },
      removeReply(id) {
        this.$axios.post(`comments/reply/remove/${id}`)
          .then(() => {
            this.view(this.commentID);
            this.$q.notify({
              message: this.$t('global.removeReplyComment'),
              color: 'positive'
            })
          })
          .catch(() => {
            //
          })
      },
      editReply(id, content) {
        this.replyID = id;
        this.dataEdit.content = content;
      },
      submitEditReplyForm(id) {
        this.$axios.post(`comments/reply/update/${id}`, this.dataEdit)
          .then(() => {
            this.$q.notify({
              message: this.$t('global.updateReply'),
              color: 'positive'
            });
            this.c();
            this.view(this.commentID);
            this.data.id = '';
            this.data.content = '';
          })
          .catch((error) => {
            //
          })
      },
      c() {
        this.replyID = null;
        this.dataEdit.reply = '';
      }
    }
  }
</script>

