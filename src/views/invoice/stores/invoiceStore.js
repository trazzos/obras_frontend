import invoiceGetApi from 'invoiceModule/api/invoiceGetApi'
import invoiceCreateApi from 'invoiceModule/api/invoiceCreateApi'
import invoiceDeleteApi from 'invoiceModule/api/invoiceDeleteApi'
import invoicePatchApi from 'invoiceModule/api/invoicePatchApi'
import catCompanysApi from 'invoiceModule/api/catCompanysApi'

import { getField, updateField } from 'vuex-map-fields'
function initItem () {
  return {
    id: null,
    company_id: null,
    name: null,
    start: null,
    end: null,
    file_name_header: null,
    file_name_footer: null,
    file_name_watermark: null,
  }
}
function initState () {
  return {
    loading: true,
    headers: [
      { text: 'Empresa', align: 'left', sortable: false, value: 'company_id' },
      { text: 'Nombre', align: 'left', sortable: false, value: 'name' },
      { text: 'Inicio', value: 'start' },
      { text: 'Final', value: 'end' },
      { text: 'Accciones', value: 'action' },
    ],
    items: [],
    current_index: -1,
    current_item: initItem(),
    dialog: false,
    companys: [],
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
  loadCompanys (state, payload) {
   state.companys = payload
  },
}
const getters = {
   getField,
}

const actions = {
  async invoiceGetApi ({ state, commit }) {
    const response = await invoiceGetApi()
    commit('setItems', response.data.payload)
    commit('setLoading', false)
  },
  async deleteItem ({ commit }, item) {
    await invoiceDeleteApi(item.id)
    const response = await invoiceGetApi()
    commit('setItems', response.data.payload)
  },
  editItem ({ commit }, item) {
    commit('setCurrentItem', item)
    commit('showModal', true)
  },
  async saveInvoice ({ state, commit, dispatch }) {
    if (state.current_index >= 0) await invoicePatchApi(state.current_item)
    else await invoiceCreateApi(state.current_item)
    commit('showModal', false)
    commit('resetCurrentItem')
    dispatch('invoiceGetApi')
  },
  async loadCompanys ({ state, commit }) {
    const response = await catCompanysApi()
    commit('loadCompanys', response.data.payload)
  },
}

export default {
  name: 'invoiceStore',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
