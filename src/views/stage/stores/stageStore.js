import stageGetApi from 'stageModule/api/stageGetApi'
import stageCreateApi from 'stageModule/api/stageCreateApi'
import stageDeleteApi from 'stageModule/api/stageDeleteApi'
import stagePatchApi from 'stageModule/api/stagePatchApi'

import taskCreateApi from 'stageModule/api/taskCreateApi'
import taskPatchApi from 'stageModule/api/taskPatchApi'
import taskDeleteApi from 'stageModule/api/taskDeleteApi'

import { getField, updateField } from 'vuex-map-fields'
function initStage () {
  return {
    id: null,
    name: null,
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
    loading_modal_stage: false,
    loading_modal_task: false,
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
    current_task_index: null,
    current_stage_index: null,
    current_stage: initStage(),
    current_task: initTask(),
    modal_stage: false,
    modal_task_stage: false,
    modal_task: false,
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
  /* stage mutations */
  setLoading (state, status) {
    state.loading = status
  },
  setStages (state, data) {
    state.stages = data
  },
  resetCurrentStage (state) {
    state.current_stage_index = null
    state.current_stage = initStage()
  },
  setCurrentStage (state, item) {
    state.current_stage_index = state.stages.indexOf(item)
    state.current_stage = Object.assign({}, item)
  },
  removeItemInStages (state, item) {
    const key = state.stages.indexOf(item)
    state.stages = state.stages.filter(function (x, i) {
      return i !== key
    })
  },
  /* cross mutations */
  setCurrentStageInTask (state) {
    state.current_task = { ...state.current_task, stage_id: state.current_stage.id }
  },
  setTasks (state, payload) {
    state.tasks = payload
  },
  /* task mutations */
  setItemInTasks (state, payload) {
    if (state.current_task_index === null) {
        state.tasks.push(payload)
    } else {
      Object.assign(state.tasks[state.current_task_index], { ...payload })
    }
  },
  resetCurrentTask (state) {
    state.current_task_index = null
    state.current_task = initTask()
  },
  setCurrentTask (state, item) {
    state.current_task_index = state.tasks.indexOf(item)
    state.current_task = Object.assign({}, item)
  },
  removeItemInTasks (state, item) {
    const key = state.tasks.indexOf(item)
    state.tasks = state.tasks.filter(function (x, i) {
      return i !== key
    })
  },
  /* general mutations */
  showModal (state, payload) {
    if (payload.status === false) {
      switch (payload.modal) {
        case 'modal_stage':
          state.current_stage_index = null
          state.current_stage = initStage()
        break
        case 'modal_task':
          state.current_task_index = null
          state.current_task = initTask()
        break
      }
    }
    state[payload.modal] = payload.status
  },
  setProgressLoading (state, payload) {
    state[payload.name] = payload.status
  },
  updateField,
}
const getters = {
   getField,
}

const actions = {
  /* stage actions */
  editStage ({ commit }, item) {
    commit('setCurrentStage', item)
    commit('showModal', { modal: 'modal_stage', status: true })
  },
  async stageGetApi ({ state, commit }) {
    const response = await stageGetApi()
    if ('payload' in response.data) {
      commit('setStages', response.data.payload)
    }
    commit('setLoading', false)
  },
  async deleteStage ({ commit }, item) {
    const response = await stageDeleteApi(item.id)
    if ('payload' in response.data) {
      response.data.payload && commit('removeItemInStages', item)
      commit('resetCurrentTask')
      commit('globalStore/errorSnackbar', response, { root: true })
    } else {
      commit('globalStore/errorSnackbar', response, { root: true })
    }
  },
  async saveStage ({ state, commit, dispatch }) {
    commit('setProgressLoading', { name: 'loading_modal_stage', status: true })
    const response = state.current_stage_index === null ? await stageCreateApi(state.current_stage) : await stagePatchApi(state.current_stage)
    if ('payload' in response.data) {
      commit('setProgressLoading', { name: 'loading_modal_stage', status: false })
      commit('showModal', { modal: 'modal_stage', status: false })
      commit('resetCurrentTask')
      dispatch('stageGetApi')
      commit('globalStore/errorSnackbar', response, { root: true })
    } else {
      commit('setProgressLoading', { name: 'loading_modal_stage', status: false })
      commit('globalStore/errorSnackbar', response, { root: true })
    }
  },
  /*  task actions */
  addTask ({ commit }) {
    commit('setCurrentStageInTask')
    commit('showModal', { modal: 'modal_task', status: true })
  },
  editTask ({ commit }, item) {
    commit('setCurrentTask', item)
    commit('showModal', { modal: 'modal_task', status: true })
  },
  async saveTask ({ state, commit }) {
    commit('setProgressLoading', { name: 'loading_modal_task', status: true })
    const response = state.current_task_index === null ? await taskCreateApi(state.current_task) : await taskPatchApi(state.current_task)
    if ('payload' in response.data) {
      commit('setItemInTasks', response.data.payload)
      commit('setProgressLoading', { name: 'loading_modal_task', status: false })
      commit('showModal', { modal: 'modal_task', status: false })
      commit('resetCurrentTask')
      commit('globalStore/errorSnackbar', response, { root: true })
    } else {
      commit('setProgressLoading', { name: 'loading_modal_task', status: false })
      commit('globalStore/errorSnackbar', response, { root: true })
    }
  },
  async deleteTask ({ commit }, item) {
    const response = await taskDeleteApi(item.id)
    if ('payload' in response.data) {
      response.data.payload && commit('removeItemInTasks', item)
      commit('globalStore/errorSnackbar', response, { root: true })
    } else {
      commit('globalStore/errorSnackbar', response, { root: true })
    }
  },
  /* cross actions */
  viewListTask ({ commit }, item) {
    commit('setCurrentStage', item)
    commit('setTasks', item.task)
    commit('showModal', { modal: 'modal_task_stage', status: true })
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
