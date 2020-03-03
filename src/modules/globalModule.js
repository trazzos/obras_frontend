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
    state.snackbar.type = response.type
    state.snackbar.text = response.data.message
    state.snackbar.show = true
  },
}

const getters = {
  getField,
}

const actions = { }

export default {
  name: 'globalModule',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
