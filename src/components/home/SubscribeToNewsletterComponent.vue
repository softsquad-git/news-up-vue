<template>
    <div class="home_newsletter">
      <div class="home__newsletter_text">
        Subscribe to newsletter
      </div>
      <q-form @submit.prevent="saveNewsletter">
        <q-input type="email" class="home__newsletter_input" v-model="data.email" placeholder="E-mail"/>
        <q-btn class="home__newsletter_btn">
          Subscribe
        </q-btn>
      </q-form>
    </div>
</template>

<script>
    export default {
        name: "SubscribeToNewsletterComponent",
      data(){
          return{
            data: {
              email: ''
            }
          }
      }
    }
</script>
