<template>
  <div class="__page__profile__user__">
    <div class="profile__user_header">
      <div class="row mb-3">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div class="profile___user__header_title" :class="$q.dark.isActive ? 'account__title_dark' : ''">
            {{ titles.createGroup }}
          </div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12 text-right">
          <q-btn
            icon="backspace"
            :to="{ name: 'GroupsUser' }"
            color="negative"
            :label="this.$t('buttons.cancel')"
          />
        </div>
      </div>
    </div>
    <q-form @submit.prevent="createGroup">
      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <q-input type="text"
                   v-model="data.name"
                   :placeholder="this.$t('account.pages.groups.create.name')"
          />
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <q-select
            v-model="data.type"
            :options="typeOptions"
            option-label="text"
            option-value="value"
            option-disable="inactive"
            emit-value
            map-options
            :label="this.$t('account.pages.groups.create.type')"
          />
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-select
            v-model="data.is_accept_post"
            :options="acceptPostsOptions"
            option-label="text"
            option-value="value"
            option-disable="inactive"
            emit-value
            map-options
            :label="this.$t('account.pages.groups.create.acceptPost')"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xl-9 col-lg-9 col-md-8 col-sm-6 col-xs-12">
          <q-input type="textarea" v-model="data.description"
                   :placeholder="this.$t('account.pages.groups.create.description')"
          />
        </div>
        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <q-uploader
            :label="this.$t('account.pages.groups.create.bgImage')"
            :multiple="false"
            :factory="createGroup"
            accept=".jpg, .png, .gif, image/*"
            ref="files"
            class="full-width br-0 no-shadow">
          </q-uploader>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <q-btn type="submit" color="positive" icon="send" outline :label="this.$t('buttons.save')" style="margin-top: 10px;"/>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
  import Errors from "../../../common/ErrorsComponent";

  export default {
    name: "AddGroupComponent",
    components: {Errors},
    data() {
      return {
        data: {
          name: '',
          description: '',
          bg_image: '',
          type: '',
          is_accept_post: ''
        },
        titles: {
          createGroup: this.$t('account.pages.titles.createGroup')
        },
        errors: [],
        typeOptions: [
          {value: 'PRIVATE', text: this.$t('basicOptions.private')},
          {value: 'PUBLIC', text: this.$t('basicOptions.public')}
        ],
        acceptPostsOptions: [
          {value: 1, text: this.$t('basicOptions.yes')},
          {value: 0, text: this.$t('basicOptions.no')}
        ]
      }
    },
    methods: {
      createGroup() {
        this.data.bg_image = this.$refs.files.files;
        if (this.data.bg_image.length > 0) {
          let formData = new FormData();
          let bgImage = this.data.bg_image;
          formData.append('bg_image', bgImage[0], bgImage.name);
          formData.append('name', this.data.name);
          formData.append('description', this.data.description);
          formData.append('type', this.data.type);
          formData.append('is_accept_post', this.data.is_accept_post);
          this.saveData(formData)
        } else {
          this.saveData(this.data);
        }
      },
      saveData(data) {
        this.$axios.post('user/groups/store', data)
          .then((data) => {
            if (data.data.success === 1) {
              this.$q.notify({
                message: this.$t('account.groups.notify.successCreateGroup'),
                color: 'positive'
              });
              this.data.name = '';
              this.data.description = '';
              this.data.type = '';
              this.data.bg_image = '';
              this.data.is_accept_post = '';
              this.$router.push({ name: 'GroupsUser' })
            }
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
              this.$q.notify({
                color: 'negative',
                message: this.$t('notification.errors.validData')
              });
            }
          })
      }
    }
  }
</script>
