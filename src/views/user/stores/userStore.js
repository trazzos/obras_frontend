import { getField, updateField } from 'vuex-map-fields'
function initCredentials () {
  return {
    email: null,
    password: null,
    button_loading: false,
  }
}

function initState () {
  return {
    loading: true,
    credentials: initCredentials(),
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
      console.log(response)
    }).catch(function (error) {
      commit('globalModule/errorSnackbar', error.response, { root: true })
    }).then(function () {
      commit('setButtonLoading', false)
    })
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
