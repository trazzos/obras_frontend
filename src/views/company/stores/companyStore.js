import companyGetApi from "companyModule/api/companyGetApi";

function initState() {
  return {
    loading: true,
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      {text: 'RFC', value: 'taxpayer_id'},
    ],
    items: [],
  }
}

const state = () => {
  return initState();
};

const mutations = {
  setLoading(state, status) {
    state.loading = status;
  },
  setItems(state, data) {
    state.items = data;
  },
  destroy (state) {
    const init = initState();
    Object.keys(init).forEach(key => {
      state[key] = init[key]
    });
  },
};

const getters = {};

const actions = {
  async companyGetApi({state, commit}) {
    let response = await companyGetApi();
    commit('setItems', response.data.payload);
    commit('setLoading', false);
  },
};

export default {
  name: 'companyListStore',
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
