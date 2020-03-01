import stageGetApi from 'stageModule/api/stageGetApi'
import stageCreateApi from 'stageModule/api/stageCreateApi'
import stageDeleteApi from 'stageModule/api/stageDeleteApi'
import stagePatchApi from 'stageModule/api/stagePatchApi'

import { getField, updateField } from 'vuex-map-fields'
function initStage () {
  return {
    id: null,
    name: null,
    award_type_id: null,
  }
}
function initTask () {
  return {
    id: null,
    name: null,
    stage_id: null,
    legal_basis: null,
    comment: null,
    create_pdf: null,
  }
}
function initState () {
  return {
    loading: true,
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        sortable: true,
        value: 'name',
      },
      { text: 'Accciones', value: 'action', sortable: false, width: '5%' },
    ],
    stages: [],
    tasks: [],
    current_task_index: -1,
    current_stage_index: -1,
    current_stage: initStage(),
    current_task: initTask(),
    dialog: false,
    modal_task_stage: false,
    modal_task: false,
    adwar_types: [],
    headersTask: [
      {
        text: 'Nombre',
        align: 'left',
        sortable: true,
        value: 'name',
      },
      {
        text: 'Bases legales',
        align: 'left',
        sortable: true,
        value: 'legal_basis',
      },
      {
        text: 'Comentarios',
        align: 'left',
        sortable: true,
        value: 'comment',
      },
      { text: 'Accciones', value: 'action', sortable: false, width: '5%' },
    ],
  }
}

const state = () => {
  return initState()
}

const mutations = {
  setLoading (state, status) {
    state.loading = status
  },
  setStages (state, data) {
    state.stages = data
  },
  resetCurrentStage (state, item) {
    state.current_stage_index = -1
    state.current_stage = Object.assign({}, item)
  },
  setCurrentStage (state, item) {
    state.current_stage_index = state.stages.indexOf(item)
    state.current_stage = Object.assign({}, item)
  },
  setTasks (state, data) {
    state.tasks = data
  },
  resetCurrentTask (state) {
    state.current_task_index = -1
    state.current_task = initTask()
  },
  setCurrentTask (state, item) {
    state.current_task_index = state.tasks.indexOf(item)
    state.current_task = Object.assign({}, item)
  },
  showModal (state, status) {
    if (status === false) {
      state.current_stage_index = -1
      state.current_stage_index = initStage()
      state.current_task_index = -1
      state.current_task_index = initTask()
    }
    state.dialog = status
  },
  showModalTaskStage (state, status) {
    state.modal_task_stage = status
  },
  showModalTask (state, status) {
    state.modal_task = status
  },
  updateField,
}
const getters = {
   getField,
}

const actions = {
  async stageGetApi ({ state, commit }) {
    const response = await stageGetApi()
    if ('payload' in response.data) {
      commit('setStages', response.data.payload)
    }
    commit('setLoading', false)
  },
  async deleteItem ({ commit }, item) {
    await stageDeleteApi(item.uuid)
    const response = await stageGetApi()
    commit('setStages', response.data.payload)
  },
  editStage ({ commit }, item) {
    commit('setCurrentStage', item)
    commit('showModal', true)
  },
  async saveStage ({ state, commit, dispatch }) {
    const response = state.current_stage_index >= 0 ? await stagePatchApi(state.current_stage) : await stageCreateApi(state.current_stage)
    if ('payload' in response.data) {
      commit('showModal', false)
      commit('resetCurrentStage')
      dispatch('stageGetApi')
    } else {
      commit('globalModule/errorSnackbar', response, { root: true })
    }
  },
  viewListTask ({ commit }, item) {
    commit('setTasks', item.task)
    commit('showModalTaskStage', true)
  },
}
export default {
  name: 'stageStore',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
