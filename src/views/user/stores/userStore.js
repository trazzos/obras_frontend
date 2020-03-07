import userGetApi from 'userModule/api/userGetApi'
import userCreateApi from 'userModule/api/userCreateApi'
import userDeleteApi from 'userModule/api/userDeleteApi'
import userPatchApi from 'userModule/api/userPatchApi'

import { getField, updateField } from 'vuex-map-fields'
function initCredentials () {
  return {
    email: null,
    password: null,
    button_loading: false,
  }
}

function initItem () {
  return {
    id: null,
    name: null,
    email: null,
    email_verified_at: null,
    password: null,
  }
}
function initState () {
  return {
    loading: true,
    credentials: initCredentials(),
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      { text: 'Email', value: 'email' },
      { text: 'Verificacion', value: 'email_verified_at' },
      { text: 'Accciones', value: 'action' },
    ],
    items: [],
    current_index: -1,
    current_item: initItem(),
    dialog: false,
    states: [],
  }
}

const state = () => {
  return initState()
}

const mutations = {
  setLoading (state, status) {
    state.loading = status
  },
  setButtonLoading (state, status) {
    state.credentials.button_loading = status
  },
  setItems (state, data) {
    state.items = data
  },
  resetCurrentItem (state) {
    state.current_index = -1
    state.current_item = initItem()
  },
  setCurrentItem (state, item) {
    state.current_index = state.items.data.indexOf(item)
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
  async userLogin ({ state, commit }, authObject) {
    commit('setButtonLoading', true)

    authObject.login({
      params: {
        email: state.credentials.email,
        password: state.credentials.password,
      },
      rememberMe: true,
      redirect: '/',
      fetchUser: true,
    }).then(function (response) {
    }).catch(function (error) {
      commit('globalModule/errorSnackbar', error.response, { root: true })
    }).then(function () {
      commit('setButtonLoading', false)
    })
  },
  async userGetApi ({ state, commit }) {
    const response = await userGetApi()
    commit('setItems', response.data.payload)
    commit('setLoading', false)
  },
  async deleteItem ({ commit }, item) {
    await userDeleteApi(item.id)
    const response = await userGetApi()
    commit('setItems', response.data.payload)
  },
  editItem ({ commit }, item) {
    commit('setCurrentItem', item)
    commit('showModal', true)
  },
  async saveUser ({ state, commit, dispatch }) {
    if (state.current_index >= 0) await userPatchApi(state.current_item)
    else await userCreateApi(state.current_item)
    commit('showModal', false)
    commit('resetCurrentItem')
    dispatch('userGetApi')
  },
}

export default {
  name: 'userStore',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
