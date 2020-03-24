<template>
  <v-row justify="center">
    <v-dialog
      v-model="modal_task"
      max-width="500px"
      transition="dialog-bottom-transition"
      hide-overlay
      persistent
    >
      <v-card>
        <v-overlay
          :absolute="true"
          :opacity="0.15"
          :value="loading_modal_task"
          :z-index="5"
        >
          <v-progress-circular
            indeterminate
            size="64"
            color="primary"
          />
        </v-overlay>
        <v-toolbar
          color="primary"
          dark
        >
          <v-toolbar-title class="float-left">
            <v-btn icon>
              <v-icon>mdi-file-tree</v-icon>
            </v-btn>{{ titleForm }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <custom-form-task />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <custom-action-modal
            :actions="actions"
            @save="saveTask"
            @showModal="showModal({ modal:'modal_task', status:false })"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import stageStore from 'stageModule/stores/stageStore'
  import CustomFormTask from 'stageModule/components/task/CustomFormTask'
  import CustomActionModal from 'globalStore/components/CustomActionModal'
  import { mapFields } from 'vuex-map-fields'
  import { mapActions, mapMutations } from 'vuex'

  export default {
    name: 'custom-modal-task',
    components: {
      CustomFormTask,
      CustomActionModal,
    },
    computed: {
      ...mapFields(stageStore.name, [
        'modal_task',
        'current_task_index',
        'loading_modal_task',
      ]),
      titleForm () {
        return (this.current_task_index === null) ? 'Agregar tarea' : 'Editar tarea'
      },
    },
    methods: {
      ...mapMutations(stageStore.name, [
        'showModal',
        'resetCurrentTask',
        'resetCurrentStage',
      ]),
      ...mapActions(stageStore.name, [
        'saveTask',
      ]),
    },
    data: () => ({
      actions: [
        {
          title: 'Cancelar',
          color: 'error',
          handler: 'showModal',
        },
        {
          title: 'Guardar',
          color: 'primary',
          handler: 'save',
        },
      ],
    }),
    watch: {
      modal_task (val) {
        !val && this.resetCurrentTask()
      },
    },
  }
</script>
<style scoped>

</style>
