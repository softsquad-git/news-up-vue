<template>

  <div>
    <div class="comments__title">
      {{ this.$t('comments.title') }} ({{ comments.length }})
    </div>

    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <add-comment-article-component
          :resource_id="params.resource_id"
          :resource_type="params.resource_type"
          style="margin-bottom: 50px"/>
      </div>
    </div>

    <div class="row">
      <div v-for="comment in comments" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="comments__list">
          <div class="comments__list_header">
            <q-img :src="comment.user.avatar" :alt="comment.user.s.name" class="comments___list__author_avatar"/>
            <span class="comments___list__author_fullname">
              <router-link :to="{name: 'ProfilePage', params: { id: comment.user_id }}">
                {{ comment.user.s.name + ' ' + comment.user.s.last_name }}
              </router-link>
          </span>
            <span class="comments___list_header_created">
            {{ comment.created_at }}
          </span>
          </div>
          <div class="comments__list_content">
            {{ comment.content }}
          </div>
          <q-form v-show="comment.id === commentID" @submit="submitEditCommentForm(comment.id)">
            <q-input
              type="textarea"
              v-model="dataEdit.content"
              :label="edit.label"
              :placeholder="edit.placeholder"
              style="margin-bottom: 10px;"
            />
            <q-btn
              type="submit"
              color="positive"
              outline
              style="margin-right: 10px;"
              size="sm"
              :label="edit.buttons.save"
            />
            <q-btn
              @click="c"
              outline
              type="button"
              color="red"
              size="sm"
              :label="edit.buttons.cancel"
            />
          </q-form>
          <div class="comments__list_footer">
            <q-btn @click="addReply(comment.id)" size="10px" class="footer__article_icon" round icon="reply"/>
            <q-btn v-if="comment.c_answers > 0" @click="viewAnswers(comment.id)" size="10px"
                   class="footer__article_icon" round icon="reply_all"/>

            <q-btn v-if="user_id == comment.user_id" @click="editComment(comment.id, comment.content)" size="10px"
                   class="footer__article_icon"
                   color="warning" round icon="edit"/>
            <q-btn v-if="user_id == comment.user_id" @click="removeComment(comment.id)" size="10px"
                   class="footer__article_icon" color="red" round
                   icon="delete_outline"/>

          </div>
        </div>
      </div>
    </div>
    <answers-comment-article-component ref="AnswersCommentArticleComponent"/>
    <add-reply-comment-article-component ref="AddReplyCommentArticleComponent"/>
  </div>

</template>

<script>
  import AddCommentArticleComponent from "./AddCommentArticleComponent";
  import AnswersCommentArticleComponent from "./AnswersCommentArticleComponent";
  import AddReplyCommentArticleComponent from "./AddReplyCommentArticleComponent";

  export default {
    name: "CommentsArticleComponent",
    components: {
      'add-reply-comment-article-component': AddReplyCommentArticleComponent,
      'answers-comment-article-component': AnswersCommentArticleComponent,
      AddCommentArticleComponent
    },
    data() {
      return {
        comments: [],
        commentID: null,
        user_id: localStorage.getItem('userId'),
        edit: {
          label: this.$t('comments.edit.title'),
          placeholder: this.$t('comments.edit.placeholder'),
          buttons: {
            save: this.$t('buttons.save'),
            cancel: this.$t('buttons.cancel')
          }
        },
        dataEdit: {
          id: '',
          content: ''
        },
        params: {
          resource_id: this.resource_id,
          resource_type: this.resource_type
        }
      }
    },
    props: {
      resource_id: '',
      resource_type: ''
    },
    methods: {
      loadData() {
        this.$axios.post(`comments?resource_id=${this.params.resource_id}&resource_type=${this.params.resource_type}`)
          .then((data) => {
            this.comments = data.data.data
          })
          .catch(() => {
            //
          });
      },
      viewAnswers(id) {
        this.$refs.AnswersCommentArticleComponent.view(id)
      },
      addReply(commentID) {
        if (localStorage.getItem('token')) {
          this.$refs.AddReplyCommentArticleComponent.view(commentID)
        } else {
          this.$q.notify({
            message: this.$t('errors.please_login'),
            color: 'negative'
          })
        }
      },
      editComment(id, content) {
        this.commentID = id;
        this.dataEdit.content = content;
      },
      submitEditCommentForm(id) {
        this.$axios.post(`comments/update/${id}`, this.dataEdit)
          .then(() => {
            this.loadData();
            this.c();
            this.$q.notify({
              message: this.$t('global.updatedComment'),
              color: 'positive'
            })
          })
          .catch((error) => {
            //
          })
      },
      removeComment(id) {
        this.$axios.post(`comments/remove/${id}`)
          .then(() => {
            this.loadData();
            this.$q.notify({
              message: this.$t('global.removeComment'),
              color: 'positive'
            })
          })
          .catch(() => {
            //
          });
      },
      c() {
        this.commentID = null;
        this.dataEdit.comment = '';
      },
    },
    created() {
      this.loadData();
    }
  }
</script>
