<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="primary"
      title="Etapas"
      inline
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="stages"
        :loading="loading"
        :search.sync="search"
        :sort-by="['name']"
        :sort-desc="[false, true]"
        multi-sort
      >
        <template v-slot:top>
          <custom-modal-stage />
        </template>
        <template v-slot:item.action="{ item }">
          <custom-action-row
            :row="item"
            :actions="actions"
            @editItem="editStage"
            @viewListTask="viewListTask"
            @deleteItem="deleteStage"
          />
        </template>
      </v-data-table>
    </base-material-card>
    <custom-modal-task-stage />
    <custom-modal-task />
  </v-container>
</template>

<script>

  import { mapState, mapActions } from 'vuex'

  import stageStore from 'stageModule/stores/stageStore'
  import CustomModalStage from 'stageModule/components/CustomModalStage'
  import CustomModalTask from 'stageModule/components/task/CustomModalTask'
  import CustomModalTaskStage from 'stageModule/components/CustomModalTaskStage'
  import CustomActionRow from 'globalModule/components/CustomActionRow'
  export default {
    name: 'DashboardDataTables',
    components: {
      CustomModalStage,
      CustomActionRow,
      CustomModalTaskStage,
      CustomModalTask,
    },
    data: () => ({
      search: undefined,
      actions: [
        {
          icon: 'mdi-file-tree',
          title: 'Ver tareas',
          color: 'info',
          handler: 'viewListTask',
          isIcon: false,
          isFab: true,
        },
        {
          icon: 'mdi-pencil',
          title: 'Editar',
          color: 'primary',
          handler: 'editItem',
          isIcon: false,
          isFab: true,
        },
        {
          icon: 'mdi-delete',
          title: 'Eliminar',
          color: 'error',
          handler: 'deleteItem',
          isIcon: false,
          isFab: true,
        },
      ],
    }),
    computed: {
      ...mapState(stageStore.name, [
        'loading',
        'headers',
        'stages',
      ]),
    },
    mounted () {
      this.stageGetApi()
    },
    beforeCreate () {
      if (!this.$store.state.stageStore) {
        this.$store.registerModule(stageStore.name, stageStore)
      }
    },
    methods: {
      ...mapActions(stageStore.name, [
        'stageGetApi',
        'deleteStage',
        'editStage',
        'viewListTask',
      ]),
    },
  }
</script>
