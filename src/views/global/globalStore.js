import { getField, updateField } from 'vuex-map-fields'

function initState () {
  return {
    snackbar: {
      text: null,
      show: false,
      type: 'info',
    },
  }
}

const state = () => {
  return initState()
}

const mutations = {
  updateField,
  errorSnackbar (state, response) {
    const status = response.status
    state.snackbar.type = status >= 200 && status <= 300 ? 'success' : 'error'
    state.snackbar.text = response.data.message
    state.snackbar.show = true
  },
}

const getters = {
  getField,
}

const actions = { }

export default {
  name: 'globalStore',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
