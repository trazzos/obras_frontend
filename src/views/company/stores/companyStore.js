import companyGetApi from 'companyModule/api/companyGetApi'
import companyCreateApi from 'companyModule/api/companyCreateApi'
import companyDeleteApi from 'companyModule/api/companyDeleteApi'
import companyPatchApi from 'companyModule/api/companyPatchApi'
import catStateInegiApi from 'companyModule/api/catStateInegiApi'
import catMunicipioInegiApi from 'companyModule/api/catMunicipioInegiApi'
import catLocationInegiApi from 'companyModule/api/catLocationInegiApi'

import { getField, updateField } from 'vuex-map-fields'
function initItem () {
  return {
    id: null,
    name: null,
    ftr: null,
    email: null,
    phone: null,
    mobile: null,
    postal_code: null,
    address: null,
    exterior_number: null,
    interior_number: null,
    suburb: null,
    location_id: null,
    municipio_id: null,
    state_id: null,
    country_id: null,
    observation: null,
  }
}
function initState () {
  return {
    loading: true,
    headers: [
      { text: 'Razón Social', align: 'left', sortable: false, value: 'name', width: '35%' },
      { text: 'RFC', value: 'ftr', width: '15%' },
      { text: 'Domicilio', value: 'address', width: '35%' },
      { text: '', value: 'action', width: '15 %' },
    ],
    items: [],
    current_index: -1,
    current_item: initItem(),
    dialog: false,
    states: [],
    municipios: [],
    locations: [],
    cveAgee: null,
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
  loadStates (state, payload) {
   state.states = payload
  },
  loadMunicipios (state, payload) {
    state.municipios = payload
  },
  loadLocations (state, payload) {
    state.locations = payload
  },
  setStateID (state, id) {
    state.cveAgee = id
   },
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
    await companyDeleteApi(item.id)
    const response = await companyGetApi()
    commit('setItems', response.data.payload)
  },
  editItem ({ commit }, item) {
    /* dispatch('loadMunicipio', item.state_id) */
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
  async loadStates ({ state, commit }) {
    const response = await catStateInegiApi()
    commit('loadStates', response.data.datos)
  },
  async loadMunicipio ({ state, commit }, cveAgee) {
    const response = await catMunicipioInegiApi(cveAgee)
    console.log(response)
    commit('setStateID', cveAgee)
    commit('loadMunicipios', response.data.datos)
  },
  async loadLocations ({ state, commit }, cveAgem) {
    const response = await catLocationInegiApi(state.cveAgee, cveAgem)
    console.log(response)
    commit('loadLocations', response.data.datos)
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
