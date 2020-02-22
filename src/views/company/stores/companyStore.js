import companyGetApi from 'companyModule/api/companyGetApi'
import companyCreateApi from 'companyModule/api/companyCreateApi'
import companyDeleteApi from 'companyModule/api/companyDeleteApi'
import companyPatchApi from 'companyModule/api/companyPatchApi'

import { getField, updateField } from 'vuex-map-fields'
function initItem () {
  return {
    uuid: null,
    name: null,
    address: null,
    cp: null,
    state: null,
    phone: null,
    email: null,
  }
}
function initState () {
  return {
    loading: true,
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      { text: 'Direccion', value: 'address' },
      { text: 'Codigo postal', value: 'cp' },
      { text: 'Estad', value: 'state' },
      { text: 'Telefono', value: 'phone' },
      { text: 'Codigo postal', value: 'cp' },
      { text: 'Accciones', value: 'action' },
    ],
    items: [],
    current_index: -1,
    current_item: initItem(),
    dialog: false,
  }
}

const state = () => {
  return initState()
}

const mutations = {
  setLoading (state, status) {
    state.loading = status
  },
  setItems (state, data) {
    state.items = data
  },
  resetCurrentItem (state) {
    state.current_index = -1
    state.current_item = initItem()
  },
  setCurrentItem (state, item) {
    state.current_index = state.items.indexOf(item)
    state.current_item = Object.assign({}, item)
  },
  showModal (state, status) {
    if (status === false) {
      state.current_index = -1
      state.current_item = initItem()
    }
    state.dialog = status
  },
  updateField,
}
const getters = {
   getField,
}

const actions = {
  async companyGetApi ({ state, commit }) {
    const response = await companyGetApi()
    commit('setItems', response.data.payload)
    commit('setLoading', false)
  },
  async deleteItem ({ commit }, item) {
    await companyDeleteApi(item.uuid)
    const response = await companyGetApi()
    commit('setItems', response.data.payload)
  },
  editItem ({ commit }, item) {
    commit('setCurrentItem', item)
    commit('showModal', true)
  },
  async saveCompany ({ state, commit, dispatch }) {
    if (state.current_index >= 0) await companyPatchApi(state.current_item)
    else await companyCreateApi(state.current_item)
    commit('showModal', false)
    commit('resetCurrentItem')
    dispatch('companyGetApi')
  },
}

export default {
  name: 'companyStore',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
