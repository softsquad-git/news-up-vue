<template>
  <div class="chat-components">
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-xs-4 chat-icon">
        <q-btn @click="onListConversations" flat icon="home" class="full-width"/>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-xs-4 chat-icon">
        <q-btn @click="onListUsers" flat icon="people" class="full-width"/>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-xs-4 chat-icon">
        <q-btn flat icon="drag_indicator" class="full-width"/>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <component :is="currentComponent"/>
<!--        <window-conversation-component/>-->
      </div>
    </div>
  </div>
</template>

<script>
  import ListConversationsComponent from "components/chat/ListConversationsComponent";
  import ListUsersComponent from "components/chat/ListUsersComponent";
  import WindowConversationComponent from "components/chat/WindowConversationComponent";

  export default {
    name: "ChatComponent",
    components: {WindowConversationComponent},
    data() {
      return {
        currentComponent: ListConversationsComponent
      }
    },
    methods: {
      onListConversations() {
        this.currentComponent = ListConversationsComponent
      },
      onListUsers() {
        this.currentComponent = ListUsersComponent
      }
    }
  }
</script>
