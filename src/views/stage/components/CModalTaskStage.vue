<template>
  <v-row justify="center">
    <v-dialog
      v-model="modal_task_stage"
      hide-overlay
      scrollable
      transition="dialog-bottom-transition"
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
           @click="showModalTaskStage(false)"
          >
          <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ titleForm }}</v-toolbar-title>
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
    name: 'c-modal-task-stage',
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
      ...mapMutations(stageStore.name, ['showModalTaskStage']),
    },
  }
</script>
<style scoped>

</style>
