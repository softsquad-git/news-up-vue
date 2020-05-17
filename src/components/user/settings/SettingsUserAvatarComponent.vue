<template>
  <div class="row">
    <div class="col-lg-12">
      <div v-on:click="vShowUploadAvatar ^= true" class="profile__user__edit__avatar_title" :class="$q.dark.isActive ? 'account__title_dark' : ''">
        {{ this.$t('account.pages.settings.avatar.title') }}
        <q-icon class="float-right" style="margin-top: 5px;color: green" name="create"/>
      </div>
      <div class="profile__user__edit_avatar">
        <img class="shadow-1" :src="avatar" alt="Avatar"/>
      </div>
    </div>
    <div class="col-lg-12">
      <q-uploader v-if="vShowUploadAvatar"
        :label="this.$t('account.pages.settings.avatar.title')"
        :multiple="false"
        class="full-width"
        :factory="uploadFile"
        accept=".jpg, .png, .gif, image/*"
        ref="files">
      </q-uploader>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SettingsUserAvatarComponent",
    data() {
      return {
        data: {
          avatar: ''
        },
        files: '',
        vShowUploadAvatar: false
      }
    },
    props: {
      avatar: ''
    },
    methods: {
      uploadFile() {
        this.data.avatar = this.$refs.files.files;
        let formData = new FormData();
        let avatar = this.data.avatar;
        formData.append('avatar', avatar[0], avatar.name);
        this.$axios.post('user/settings/avatar', formData)
          .then(() => {
            this.$parent.loadData();
            this.$q.notify({
              message: 'Avatar updated',
              color: 'positive'
            });
            this.vShowUploadAvatar = false;
            this.data.avatar = '';
          })
      }
    }
  }
</script>
