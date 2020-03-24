import stageGetApi from 'stageModule/api/stageGetApi'
import stageCreateApi from 'stageModule/api/stageCreateApi'
import stageDeleteApi from 'stageModule/api/stageDeleteApi'
import stagePatchApi from 'stageModule/api/stagePatchApi'

import taskCreateApi from 'stageModule/api/taskCreateApi'
import taskPatchApi from 'stageModule/api/taskPatchApi'
import taskDeleteApi from 'stageModule/api/taskDeleteApi'

import { getField, updateField } from 'vuex-map-fields'
function getParent (root, id) {
  var i, node
  for (i = 0; i < root.length; i++) {
    node = root[i]
    if (node.id === id || (node.children && (node = getParent(node.children, id)))) {
      return node
    }
  }
  return null
}

function initStage () {
  return {
    id: null,
    name: null,
  }
}
function initFilter () {
  return {
    page: 1,
    per_page: 10,
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
    filters: initFilter(),
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
  loadChildren (state, item) {
    var id
    switch (item.name_children) {
      case 'stage':
        id = state.stages.indexOf(item)
        state.current_stage_index = id
        var tasks = item.task.map((res) => {
          return { ...res, children: [], name_children: 'task' } // ('actions' in res) ? res.actions.length ? { ...res, children: [], name_children: 'task' } : res : res
        })
        state.stages[id].children = tasks
      break
      case 'task':
        var parentId = state.stages.indexOf(getParent(state.stages, item.stage_id))
        id = state.stages[parentId].children.indexOf(item)
        var ac = [{ name: 'acccion 1', id: 'seer', name_children: 'action' }, { name: 'acccion 2', id: 'seer3', name_children: 'action' }]
        state.stages[parentId].children[id].children = ac
      break
    }
  },
  setItemInTasks (state, payload) {
    if (state.current_task_index === null) {
        state.stages[state.current_stage_index] = !('children' in state.stages[state.current_stage_index]) ? { ...state.stages[state.current_stage_index], children: [] } : state.stages[state.current_stage_index]
        state.stages[state.current_stage_index].children.push({ ...payload, children: [], name_children: 'task' })
    } else {
      Object.assign(state.stages[state.current_stage_index].children[state.current_task_index], { ...payload })
    }
  },
  resetCurrentTask (state) {
    state.current_task_index = null
    state.current_task = initTask()
  },
  setCurrentTask (state, item) {
    state.current_task_index = state.stages[state.current_stage_index].children.indexOf(item)
    state.current_task = Object.assign({}, item)
  },
  removeItemInTasks (state, item) {
    var parentId = state.stages.indexOf(getParent(state.stages, item.stage_id))
    const key = state.stages[parentId].children.indexOf(item)
    state.stages[parentId].children = state.stages[parentId].children.filter(function (x, i) {
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
  addStage ({ commit }) {
    commit('resetCurrentStage')
    commit('showModal', { modal: 'modal_stage', status: true })
  },
  editStage ({ commit }, item) {
    commit('setCurrentStage', item)
    commit('showModal', { modal: 'modal_stage', status: true })
  },
  async stageGetApi ({ state, commit }) {
    const response = await stageGetApi(state.filters)
    if ('payload' in response.data) {
      var resp = response.data.payload.data.map((res) => {
         if (res.task.length) return { ...res, children: [], name_children: 'stage' }
         else return { ...res, name_children: 'stage' }
      })
      commit('setStages', resp)
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
  addTask ({ commit }, item) {
    commit('setCurrentStage', item)
    commit('setCurrentStageInTask')
    commit('showModal', { modal: 'modal_task', status: true })
  },
  editTask ({ state, commit }, item) {
    commit('setCurrentStage', getParent(state.stages, item.stage_id))
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
      commit('resetCurrentStage')
      commit('globalStore/errorSnackbar', response, { root: true })
    } else {
      commit('setProgressLoading', { name: 'loading_modal_task', status: false })
      commit('globalStore/errorSnackbar', response, { root: true })
    }
  },
  async deleteTask ({ state, commit }, item) {
    commit('setCurrentStage', getParent(state.stages, item.stage_id))
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
  loadChildren ({ commit }, item) {
    commit('loadChildren', item)
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
