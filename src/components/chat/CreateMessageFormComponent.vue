<template>
    <q-form @submit.prevent="sendMessage">
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-input type="textarea" placeholder="Napisz wiadomość" rows="2"/>
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-btn
            type="submit"
            label="Wyślij"
            size="sm"
            />
        </div>
      </div>
    </q-form>
</template>

<script>
    export default {
        name: "CreateMessageFormComponent"
    }
</script>

<style scoped>

</style>
