<template>
  <div class="window-conversation">
    <div class="header-window-conversation">
      Michał Łosak
    </div>
    <div class="content-window-conversation">
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar4.jpg"
        :text="['hey, how are you?']"
        sent
        stamp="7 minutes ago"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['doing fine, how r you?']"
        stamp="4 minutes ago"
      />
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar4.jpg"
        :text="['hey, how are you?']"
        sent
        stamp="7 minutes ago"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['doing fine, how r you?']"
        stamp="4 minutes ago"
      />
    </div>
    <div class="footer-window-conversation">
      <create-message-form-component/>
    </div>
  </div>
</template>

<script>
  import CreateMessageFormComponent from "components/chat/CreateMessageFormComponent";

  export default {
    name: "WindowConversationComponent",
    components: {CreateMessageFormComponent}
  }
</script>
