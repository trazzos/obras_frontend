import announcementGetApi from 'announcementModule/api/announcementGetApi'
import announcementCreateApi from 'announcementModule/api/announcementCreateApi'
import announcementDeleteApi from 'announcementModule/api/announcementDeleteApi'
import announcementPatchApi from 'announcementModule/api/announcementPatchApi'
import announcementTypeGetApi from 'announcementModule/api/announcementTypeGetApi'

import paginationStore from 'globalModule/paginationStore'

import { getField, updateField } from 'vuex-map-fields'

function initAnnouncement () {
  return {
    id: null,
    name: null,
    date: new Date().toISOString().substr(0, 10),
    announcement_type_id: null,
  }
}
function initState () {
  return {
    loading_modal_announcement: false,
    headers: [
      { text: 'Tipo', align: 'left', sortable: true, value: 'announcement_type.name' },
      { text: 'Nombre', align: 'left', sortable: true, value: 'name' },
      { text: 'Fecha', align: 'left', sortable: true, value: 'date' },
      { text: 'Accciones', value: 'action', sortable: false, width: '5%' },
    ],
    items: [],
    current_announcement_index: null,
    current_announcement: initAnnouncement(),
    modal_announcement: false,
    types: [],
  }
}

const state = () => {
  return initState()
}

const mutations = {
  /* announcement mutations */
  resetCurrentAnnouncement (state) {
    state.current_announcement_index = null
    state.current_announcement = initAnnouncement()
  },
  setCurrentAnnouncement (state, item) {
    state.current_announcement_index = state.items.indexOf(item)
    state.current_announcement = Object.assign({}, item)
  },
  /* general mutations */
  showModal (state, payload) {
    if (payload.status === false) {
      switch (payload.modal) {
        case 'modal_announcement':
          state.current_announcement_index = null
          state.current_announcement = initAnnouncement()
        break
      }
    }
    state[payload.modal] = payload.status
  },
  setProgressLoading (state, payload) {
    state[payload.name] = payload.status
  },
  setExtensions (state, payload) {
    state.extensions = payload
  },
  updateField,
  loadTypes (state, payload) {
    state.types = payload
   },
}
const getters = {
   getField,
}
const actions = {
  /* announcement actions */
  addAnnouncement ({ commit }) {
    commit('resetCurrentAnnouncement')
    commit('showModal', { modal: 'modal_announcement', status: true })
  },
  editAnnouncement ({ commit }, item) {
    commit('setCurrentAnnouncement', item)
    commit('showModal', { modal: 'modal_announcement', status: true })
  },
  async announcementGetApi ({ state, commit }, request) {
    commit('announcementStore/paginationStore/setLoading', true, { root: true })
    const response = await announcementGetApi(request)
    if ('payload' in response.data) {
      commit('announcementStore/paginationStore/init', response.data.payload, { root: true })
    }
  },
  async deleteAnnouncement ({ state, commit, dispatch }, item) {
    const res = await this._vm.$confirm('¿ Esta seguro de realizar esta acción ?', {
      title: 'Confirmar',
      color: 'error',
      buttonFalseText: 'Cancelar',
      buttonTrueText: 'Aceptar',
      buttonTrueColor: 'error',
      buttonFalseColor: 'info',
      icon: 'mdi-alert-octagon',
    })
    if (!res) return
    const response = await announcementDeleteApi(item.id)
    if ('payload' in response.data) {
      response.data.payload && dispatch('announcementGetApi', state.paginationStore.pagination_request)
      commit('globalStore/errorSnackbar', response, { root: true })
    } else {
      commit('globalStore/errorSnackbar', response, { root: true })
    }
  },
  async saveAnnouncement ({ state, commit, dispatch }) {
    commit('setProgressLoading', { name: 'loading_modal_announcement', status: true })
    const response = state.current_announcement_index === null ? await announcementCreateApi(state.current_announcement) : await announcementPatchApi(state.current_announcement)
    if ('payload' in response.data) {
      commit('setProgressLoading', { name: 'loading_modal_announcement', status: false })
      commit('showModal', { modal: 'modal_announcement', status: false })
      commit('resetCurrentAnnouncement')
      dispatch('announcementGetApi', state.paginationStore.pagination_request)
      commit('globalStore/errorSnackbar', response, { root: true })
    } else {
      commit('setProgressLoading', { name: 'loading_modal_announcement', status: false })
      commit('globalStore/errorSnackbar', response, { root: true })
    }
  },
  async loadTypes ({ state, commit }) {
    const response = await announcementTypeGetApi()
    commit('loadTypes', response.data.payload)
  },
}

const modules = {
  paginationStore,
}
export default {
  name: 'announcementStore',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
}
