<template>
  <v-row justify="center">
    <v-dialog
      v-model="modal_task_stage"
      scrollable
      transition="dialog-bottom-transition"
      hide-overlay
      max-width="700"
      persistent
      no-click-animation
    >
      <v-card>
        <v-toolbar
          dense
          max-height="60"
          color="primary"
        >
          <v-btn
           icon
           dark
           @click="showModal({ modal:'modal_task_stage', status:false })"
          >
          <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text font-weight-bold">{{ titleForm }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <task></task>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import stageStore from 'stageModule/stores/stageStore'
  import task from 'stageModule/components/task/Index'
  import { mapFields } from 'vuex-map-fields'
  import { mapMutations } from 'vuex'

  export default {
    name: 'custom-modal-task-stage',
    components: {
      task,
    },
    computed: {
      ...mapFields(stageStore.name, [
        'modal_task_stage',
        'current_stage_index',
      ]),
      titleForm () {
        return 'Lista de tareas'
      },
    },
    methods: {
      ...mapMutations(stageStore.name, [
        'showModal',
        'resetCurrentStage',
        'setTasks']),
    },
    watch: {
      modal_task_stage (val) {
        !val && this.resetCurrentStage()
        !val && this.setTasks([])
      },
    },
  }
</script>
