import { getField, updateField } from 'vuex-map-fields'

function initState () {
  return {
    datatable_options: {
      descending: true,
      page: 1,
      itemsPerPage: 0,
      totalItems: 0,
      // sortBy: 'fat',
    },
  }
}

const state = () => {
  return initState()
}

const mutations = {
  updateField,
  setTotalItems (state, total) {
    state.datatable_options.totalItems = total
  },
}

const getters = {
  getField,
}

const actions = { }

export default {
  name: 'paginationModule',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
