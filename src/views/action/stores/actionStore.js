import actionGetApi from 'actionModule/api/actionGetApi'
import actionCreateApi from 'actionModule/api/actionCreateApi'
import actionDeleteApi from 'actionModule/api/actionDeleteApi'
import actionPatchApi from 'actionModule/api/actionPatchApi'

import catalogueGetApi from 'globalModule/api/catalogueGetApi'
import paginationStore from 'globalModule/paginationStore'

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
  resetCurrentAction (state) {
    state.current_action_index = null
    state.current_action = initAction()
  },
  setCurrentAction (state, item) {
    state.current_action_index = state.items.indexOf(item)
    state.current_action = Object.assign({}, item)
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
  setPredicate (state, payload) {
    switch (payload.type) {
      case 'update':
        if (payload.predicate.value !== '') {
          state.paginationStore.datatable_options.predicates[payload.key] = payload.predicate
        } else {
          state.paginationStore.datatable_options.predicates.splice(payload.key, 1)
        }
      break
      case 'add':
        if (payload.predicate.value) {
          state.paginationStore.datatable_options.predicates.push(payload.predicate)
        }
      break
    }
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
  async deleteAction ({ state, commit, dispatch }, item) {
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
    const response = await actionDeleteApi(item.id)
    if ('payload' in response.data) {
      response.data.payload && dispatch('actionGetApi', state.paginationStore.pagination_request)
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
  formPredicates ({ state, commit }, res) {
    // esto creo se debe optimizar y refactorizar de momento como es un solo campo del filtro lo deje asi.
    const predicate = {
      name: 'action_name',
      comparison: 'contains',
      attribute: 'action.name',
      value: res,
    }
    const currentPredicates = state.paginationStore.datatable_options.predicates
    if (currentPredicates.length) {
      const key = currentPredicates.map(e => { return e.name }).indexOf(predicate.name)
      commit('setPredicate', { predicate, type: 'update', key })
    } else {
      commit('setPredicate', { predicate, type: 'add' })
    }
    // hice esta mutation por que modificar predicates dentro de  datatable_options con  la mutation setPredicate
    // no disparaba el watch , creo que option.sync de v-data-table solo mapea y observa sus atributos por default , entonces
    // los  adicionales no los  watchea :P
    commit('actionStore/paginationStore/resetPages', {}, { root: true })
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
