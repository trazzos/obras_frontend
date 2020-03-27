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
  setPredicate (state, payload) {
    switch (payload.type) {
      case 'update':
        if (payload.predicate.value !== '') {
          this._vm.$set(state.datatable_options.predicates, payload.key, payload.predicate)
        } else {
          state.datatable_options.predicates.splice(payload.key, 1)
        }
        break
      case 'add':
        if (payload.predicate.value) {
          state.datatable_options.predicates.push(payload.predicate)
        }
        break
    }
    state.datatable_options.page = 1
  },
}

const getters = {
  getField,
}

const actions = {
  async formPredicates ({ state, commit }, payload) {
    const predicate = {
      name: payload.target.id,
      comparison: payload.target.getAttribute('comparison'),
      attribute: payload.target.id.replace('_', '.'),
      value: payload.target.value,
    }
    const currentPredicates = state.datatable_options.predicates
    const key = await currentPredicates.map(e => { return e.name }).indexOf(predicate.name)
    if (key >= 0) {
      commit('setPredicate', { predicate, type: 'update', key })
    } else {
      commit('setPredicate', { predicate, type: 'add' })
    }
  },
}

export default {
  name: 'paginationModule',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
