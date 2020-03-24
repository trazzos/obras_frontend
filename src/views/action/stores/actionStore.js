import actionGetApi from 'actionModule/api/actionGetApi'
import actionCreateApi from 'actionModule/api/actionCreateApi'
import actionDeleteApi from 'actionModule/api/actionDeleteApi'
import actionPatchApi from 'actionModule/api/actionPatchApi'

import catalogueGetApi from 'globalStore/api/catalogueGetApi'
import paginationStore from 'globalStore/paginationStore'

import { getField, updateField } from 'vuex-map-fields'

function initAction () {
  return {
    id: null,
    name: null,
    accepted_extension: [],
  }
}
function initState () {
  return {
    loading: true,
    loading_modal_action: false,
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        sortable: true,
        value: 'name',
      },
      { text: 'Accciones', value: 'action', sortable: false, width: '5%' },
    ],
    items: [],
    current_action_index: null,
    current_action: initAction(),
    modal_action: false,
    extensions: null,
  }
}

const state = () => {
  return initState()
}

const mutations = {
  /* action mutations */
  setLoading (state, status) {
    state.loading = status
  },
  setItems (state, data) {
    state.items = data
  },
  resetCurrentAction (state) {
    state.current_action_index = null
    state.current_action = initAction()
  },
  setCurrentAction (state, item) {
    state.current_action_index = state.items.indexOf(item)
    state.current_action = Object.assign({}, item)
  },
  removeItemInItems (state, item) {
    const key = state.items.indexOf(item)
    state.items = state.items.filter(function (x, i) {
      return i !== key
    })
  },
  /* general mutations */
  showModal (state, payload) {
    if (payload.status === false) {
      switch (payload.modal) {
        case 'modal_action':
          state.current_action_index = null
          state.current_action = initAction()
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
}
const getters = {
   getField,
}

const actions = {
  async loadExtensions ({ commit }) {
    const response = await catalogueGetApi({ filters: ['file_extension'] })
    if ('payload' in response.data) {
      var extsLineal = []
      const exts = response.data.payload.file_extension
      exts.map(function (item, i) {
         if (item.extension.length) {
          const { extension, ...temp } = item
          extsLineal.push({ ...temp, header: item.name, divider: true })
          item.extension.forEach((it) => (extsLineal.push({ name: it, parent: item.name })))
         }
      })
      commit('setExtensions', extsLineal)
    }
  },
  /* action actions */
  addAction ({ commit }) {
    commit('resetCurrentAction')
    commit('showModal', { modal: 'modal_action', status: true })
  },
  editAction ({ commit }, item) {
    commit('setCurrentAction', item)
    commit('showModal', { modal: 'modal_action', status: true })
  },
  async actionGetApi ({ state, commit }, request) {
    commit('actionStore/paginationStore/setLoading', true, { root: true })
    const response = await actionGetApi(request)
    if ('payload' in response.data) {
      commit('actionStore/paginationStore/init', response.data.payload, { root: true })
    }
  },
  async deleteAction ({ commit }, item) {
    const response = await actionDeleteApi(item.id)
    if ('payload' in response.data) {
      response.data.payload && commit('removeItemInItems', item)
      commit('globalStore/errorSnackbar', response, { root: true })
    } else {
      commit('globalStore/errorSnackbar', response, { root: true })
    }
  },
  async saveAction ({ state, commit, dispatch }) {
    commit('setProgressLoading', { name: 'loading_modal_action', status: true })
    const response = state.current_action_index === null ? await actionCreateApi(state.current_action) : await actionPatchApi(state.current_action)
    if ('payload' in response.data) {
      commit('setProgressLoading', { name: 'loading_modal_action', status: false })
      commit('showModal', { modal: 'modal_action', status: false })
      commit('resetCurrentAction')
      dispatch('actionGetApi', state.paginationStore.pagination_request)
      commit('globalStore/errorSnackbar', response, { root: true })
    } else {
      commit('setProgressLoading', { name: 'loading_modal_action', status: false })
      commit('globalStore/errorSnackbar', response, { root: true })
    }
  },
  setSelectedItem ({ commit }, res) {
    console.log(res)
  },
}

const modules = {
  paginationStore,
}
export default {
  name: 'actionStore',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
}
