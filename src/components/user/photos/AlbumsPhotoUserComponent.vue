<template>
  <div class="__page__profile__user__">
    <div class="profile__user_header">
      <div class="row mb-3">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div class="profile___user__header_title">
            {{ this.$t('account.pages.titles.albums') }}
          </div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-xs-12 text-right">
          <q-btn
            icon="add"
            @click="addAlbumClick"
            color="positive"
            outline
            :label="this.$t('account.pages.titles.createAlbum')"
            style="margin-right: 10px;"
          />
          <q-btn
            icon="add"
            @click="openModalAddPhotos"
            color="positive"
            outline
            :label="this.$t('account.pages.titles.addPhotos')"
          />
        </div>
      </div>
    </div>
    <div class="profile__user_content">
      <div class="row">
        <div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12" style="padding: 10px;" v-for="album in albums.data">
          <div class="album__user__photos_content" v-bind:style="{ backgroundImage: 'url(' + album.intro_img + ')' }">
            <div class="count_photos">
              {{ album.c_images }}
            </div>
            <q-btn-dropdown split class="no-shadow" color="transparent" style="float: right">
              <q-list>
                <q-item v-show="album.description" clickable v-close-popup @click="viewDescription(album.description)">
                  <q-item-section>
                    <q-item-label>{{ actions.viewDescription }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="editAlbumClick(album.id, album.description, album.name)">
                  <q-item-section>
                    <q-item-label>{{ actions.edit }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="removeAlbumClick(album.id)">
                  <q-item-section>
                    <q-item-label>{{ actions.remove }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-icon @click="loadImagesFromAlbum(album.id)" v-show="album.c_images > 0" class="album__user__photos_content_icon float-left" name="perm_media"/>
            <div class="album__user_photos__content_name">
              {{album.name}}
            </div>
          </div>
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <pagination :data="albums" @pagination-change-page="loadData">
            <span slot="prev-nav"><q-icon name="skip_previous"/></span>
            <span slot="next-nav"><q-icon name="skip_next"/></span>
          </pagination>
        </div>
      </div>
    </div>
    <add-album-photo-user-component ref="AddAlbumPhotoUserComponent"/>
    <view-description-album ref="ViewDescriptionAlbum" :description="description"/>
    <q-dialog v-model="viewEditForm">
      <q-card style="width: 500px!important;">
        <q-card-section>
          <div class="text-h6">{{ actions.editAlbum }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="submitUpdateAlbum">
            <q-input type="text" v-model="dataEditAlbum.name" :placeholder="this.$t('account.pages.albums.create.name')"/>
            <q-input type="textarea" v-model="dataEditAlbum.description" :placeholder="this.$t('account.pages.albums.create.description')"/>
            <q-btn style="margin-top: 20px;" type="submit" color="positive" :label="this.$t('buttons.save')"/>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <add-photos-user-component :albums="albums" ref="AddPhotosUserComponent"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import AddAlbumPhotoUserComponent from "./AddAlbumPhotoUserComponent";
  import ViewDescriptionAlbum from "./ViewDescriptionAlbum";
  import AddPhotosUserComponent from "./AddPhotosUserComponent";

  export default {
    name: "AlbumsPhotoUserComponent",
    components: {
      AddPhotosUserComponent,
      'add-album-photo-user-component': AddAlbumPhotoUserComponent,
      'view-description-album': ViewDescriptionAlbum,
      'add-photos-user-component': AddPhotosUserComponent
    },
    data() {
      return {
        params: {
          name: '',
          order_by: ''
        },
        actions: {
          editAlbum: this.$t('account.pages.albums.editAlbum'),
          remove: this.$t('buttons.delete'),
          edit: this.$t('buttons.edit'),
          viewDescription: this.$t('account.pages.albums.viewDescription')
        },
        albums: {},
        description: '',
        dataEditAlbum: {
          id: '',
          name: '',
          description: ''
        },
        viewEditForm: false
      }
    },
    computed: {
      ...mapGetters({
        delAlbum: 'removeAlbum',
        updateAlbum: 'updateAlbum'
      })
    },
    watch: {
      delAlbum(){
        this.loadData();
      },
      updateAlbum(){
        this.loadData();
        this.viewEditForm = false;
      }
    },
    methods: {
      loadData(page = 1) {
        this.$axios.post(`user/album-photos?page=${page}&name=${this.params.name}&order_by=${this.params.order_by}`)
        .then((data) => {
          this.albums = data.data;
        })
      },
      addAlbumClick() {
        this.$refs.AddAlbumPhotoUserComponent.openModal();
      },
      viewDescription(description) {
        this.description = description;
        this.$refs.ViewDescriptionAlbum.openModal();
      },
      editAlbumClick(id, description, name){
        this.dataEditAlbum.id = id;
        this.dataEditAlbum.description = description;
        this.dataEditAlbum.name = name;
        this.viewEditForm = true;
      },
      removeAlbumClick(id){
        this.$store.dispatch('removeAlbumACTION', id)
      },
      submitUpdateAlbum(){
        this.$store.dispatch('updateAlbumACTION', this.dataEditAlbum)
      },
      loadImagesFromAlbum(album_id) {
        this.$emit('images', album_id)
      },
      openModalAddPhotos(){
        this.$refs.AddPhotosUserComponent.openModal();
      }
    },
    created() {
      this.loadData();
    }
  }
</script>
