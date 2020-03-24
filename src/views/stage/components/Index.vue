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
    <v-toolbar
      flat
    >
      <v-spacer />
      <v-btn
        small
        color="primary"
        dark
        class="mb-2"
        title="Agregar etapa"
        @click="addStage"
      >Agregar</v-btn>
    </v-toolbar>
    <v-treeview
      dense
      :load-children="loadChildren"
      :items="stages"
      return-object
      hoverable
      active.sync
      active.open
    >
      <template
        v-slot:prepend=""
      >
        <v-icon color="success">mdi-file</v-icon>
      </template>
      <template
        v-slot:label="{ item }"
      >
        <span class="text-left">{{ item.name }}
          <custom-action-treeview
            v-if = "item.name_children ==='task'"
            :row ="item"
            :actions="taskActions"
            @editItem="editTask"
            @deleteItem="deleteTask"
          />
           <custom-action-treeview
             v-else-if = "item.name_children ==='action' "
             :row ="item"
             :actions="actions"
             @editItem="editAction"
             @deleteItem="deleteAction"
           />
          <custom-action-treeview
            v-else-if = "item.name_children ==='stage' "
            :row ="item"
            :actions="stageActions"
            @editItem="editStage"
            @deleteItem="deleteStage"
            @addItem="addTask"
          />
        </span>
      </template>
    </v-treeview>
    </base-material-card>
    <custom-modal-stage></custom-modal-stage>
    <custom-modal-task-stage></custom-modal-task-stage>
    <custom-modal-task></custom-modal-task>
  </v-container>
</template>

<script>

  import { mapState, mapActions } from 'vuex'

  import stageStore from 'stageModule/stores/stageStore'
  import CustomModalStage from 'stageModule/components/CustomModalStage'
  import CustomModalTask from 'stageModule/components/task/CustomModalTask'
  import CustomModalTaskStage from 'stageModule/components/CustomModalTaskStage'
  import CustomActionTreeview from 'globalStore/components/CustomActionTreeview'
  export default {
    name: 'DashboardDataTables',
    components: {
      CustomModalStage,
      CustomActionTreeview,
      CustomModalTaskStage,
      CustomModalTask,
    },
    beforeCreate () {
      if (!this.$store.state.stageStore) {
        this.$store.registerModule(stageStore.name, stageStore)
      }
    },
    mounted () {
      this.stageGetApi()
    },
    methods: {
      ...mapActions(stageStore.name, [
        'stageGetApi',
        'deleteStage',
        'editStage',
        'editTask',
        'deleteTask',
        'viewListTask',
        'loadChildren',
        'editAction',
        'deleteAction',
        'addStage',
        'addTask',
      ]),
    },
    computed: {
      ...mapState(stageStore.name, [
        'loading',
        'headers',
        'stages',
      ]),
    },
    data: () => ({
      search: undefined,
      stageActions: [
        {
          icon: 'mdi-pencil',
          title: 'Editar etapa',
          color: 'primary',
          handler: 'editItem',
          isIcon: true,
          isFab: false,
        },
        {
          icon: 'mdi-delete',
          title: 'Eliminar etapa',
          color: 'error',
          handler: 'deleteItem',
          isIcon: true,
          isFab: false,
        },
        {
          icon: 'mdi-plus',
          title: 'Agregar tarea',
          color: 'success',
          handler: 'addItem',
          isIcon: true,
          isFab: false,
        },
      ],
      taskActions: [
        {
          icon: 'mdi-pencil',
          title: 'Editar tarea',
          color: 'primary',
          handler: 'editItem',
          isIcon: true,
          isFab: false,
        },
        {
          icon: 'mdi-delete',
          title: 'Eliminar tarea',
          color: 'error',
          handler: 'deleteItem',
          isIcon: true,
          isFab: false,
        },
      ],
      actions: [
        {
          icon: 'mdi-pencil',
          title: 'Editar accion',
          color: 'primary',
          handler: 'editItem',
          isIcon: true,
          isFab: false,
        },
        {
          icon: 'mdi-delete',
          title: 'Eliminar accion',
          color: 'error',
          handler: 'deleteItem',
          isIcon: true,
          isFab: false,
        },
      ],
    }),
  }
</script>
