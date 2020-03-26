import { getField, updateField } from 'vuex-map-fields'

function initState () {
  return {
    datatable_options: {
      descending: true,
      page: 1,
      itemsPerPage: 5,
      totalItems: 0,
      lastPage: 0,
      predicates: [],
      // sortBy: 'fat',
    },
    items: [],
    loading: true,
    pagination_request: {},

  }
}

const state = () => {
  return initState()
}

const mutations = {
  updateField,
  init (state, payload) {
    state.items = payload.data
    state.datatable_options.totalItems = payload.total
    state.loading = false
  },
  setLoading (state, status) {
    state.loading = status
  },
  setPaginationRequest (state) {
    state.pagination_request = {
      page: state.datatable_options.page,
      per_page: state.datatable_options.itemsPerPage,
      predicates: state.datatable_options.predicates,
    }
  },
  resetPages (state) {
    state.datatable_options = { ...state.datatable_options, page: 1, itemsPerPage: 5 }
  },
}

const getters = {
  getField,
}

const actions = {}

export default {
  name: 'paginationModule',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
