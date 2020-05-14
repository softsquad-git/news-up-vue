import axios from 'axios'

export default {
  state: {
    addPhotos: [],
    addAlbum: [],
    photosList: [],
    albumsList: [],
    removePhoto: 0,
    removeAlbum: 0,
    updateAlbum: [],
    errorsList: []
  },
  getters: {
    addAlbum: state => {
      return state.addAlbum
    },
    addPhotos: state => {
      return state.addPhotos
    },
    photosList: state => {
      return state.photosList
    },
    albumsList: state => {
      return state.albumsList
    },
    removePhoto: state => {
      return state.removePhoto
    },
    removeAlbum: state => {
      return state.removeAlbum
    },
    updateAlbum: state => {
      return state.updateAlbum
    },
    errorsList: state => {
      return state.errorsList
    }
  },
  actions: {
    addAlbumACTION({commit}, data) {
      axios.post('user/album-photos/store', data)
        .then(() => commit('add_album'))
        .catch((error) => commit('errors_list', error.response.data.errors))
    },
    addPhotosACTION({commit}, data) {
      axios.post('user/photos/store', data)
        .then(() => commit('add_photos'))
        .catch((error) => commit('errors_list', error.response.data.errors))
    },
    photosListACTION({commit}, album_id) {
      axios.post(`user/photos/get/${album_id}`)
        .then((data) => commit('photos_list', data.data.data))
        .catch(() => {
        })
    },
    albumsListACTION({commit}, params) {
      axios.post(`user/album-photos?name=${params.name}&order_by=${params.order_by}`)
        .then((data) => commit('albums_list', data.data.data))
        .catch(() => {
        })
    },
    updateAlbumACTION({commit}, data) {
      axios.post(`user/album-photos/update/${data.id}`, data)
        .then(() => commit('update_album'))
        .catch(() => {
        })
    },
    removeAlbumACTION({commit}, id) {
      axios.post(`user/album-photos/remove/${id}`)
        .then(() => commit('remove_album'))
        .catch(() => {
        })
    },
    removePhotoACTION({commit}, id) {
      axios.post(`user/photos/remove/${id}`)
        .then(() => commit('remove_photo'))
        .catch(() => {
        })
    }
  },
  mutations: {
    errors_list(state, errorsList) {
      state.errorsList = errorsList
    },
    add_photos(state) {
      state.addPhotos = ++state.addPhotos
    },
    add_album(state) {
      state.addAlbum = ++state.addAlbum
    },
    photos_list(state, photosList) {
      state.photosList = photosList
    },
    albums_list(state, albumsList) {
      state.albumsList = albumsList
    },
    update_album(state) {
      state.updateAlbum = ++state.updateAlbum
    },
    remove_album(state) {
      state.removeAlbum = ++state.removeAlbum
    },
    remove_photo(state) {
      state.removePhoto = ++state.removePhoto
    }
  }
}
