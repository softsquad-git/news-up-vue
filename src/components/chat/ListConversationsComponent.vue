<template>
  <q-list>
    <q-item-label header>{{title}}</q-item-label>

    <div v-for="conversation in conversations">
      <q-item class="q-mb-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Michał</q-item-label>
          <q-item-label caption lines="1">uu</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="grey" />
        </q-item-section>
      </q-item>

      <q-separator inset="item"/>
    </div>
  </q-list>
</template>

<script>
  export default {
    name: "ListConversationsComponent",
    data() {
      return {
        conversations: [],
        title: this.$t('chat.conversations')
      }
    },
    methods: {
      loadConversations() {
        this.$axios.post('user/chat/messages')
          .then((data) => {
            this.conversations = data.data.data;
          })
          .catch(() => {
            this.$q.notify({
              message: this.$t('notification.errors.loadData'),
              color: 'warning'
            })
          })
      }
    },
    mounted() {
      this.loadConversations();
    }
  }
</script>

<style scoped>

</style>
