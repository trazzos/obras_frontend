<template>
  <v-row justify="center">
    <v-dialog
      v-model="modal_task"
      max-width="500px"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary
        >
          {{ titleForm }}
        </v-card-title>
        <v-card-text>
          <c-form-task></c-form-task>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import stageStore from 'stageModule/stores/stageStore'
  import CFormTask from 'stageModule/components/task/CFormTask'
  import { mapFields } from 'vuex-map-fields'
  import { mapMutations } from 'vuex'

  export default {
    name: 'c-modal-task',
    components: {
      CFormTask,
    },
    computed: {
      ...mapFields(stageStore.name, [
        'modal_task',
        'current_task_index',
      ]),
      titleForm () {
        return (this.current_task_index === -1) ? 'Agregar tarea' : 'Editar tarea'
      },
    },
    methods: {
      ...mapMutations(stageStore.name, ['showModalTask']),
    },
  }
</script>
<style scoped>

</style>
