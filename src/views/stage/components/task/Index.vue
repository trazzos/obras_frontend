<template>
  <v-container
    id="data-tables"
    tag="section"
  >
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="showModalTask(true)"
        >Agregar</v-btn>
      </v-toolbar>
      <v-data-table
        :headers="headersTask"
        :items="tasks"
        :loading="loading"
        :search.sync="search"
        :sort-by="['name']"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-7"
      >
        <template v-slot:item.action="{ item }">
            <c-action-task
            @deleteItem="deleteTask"
            @editItem="editTask"
            :item="{ item }"
            />
        </template>
      </v-data-table>
    <c-modal-task></c-modal-task>
  </v-container>
</template>

<script>

  import { mapState, mapActions, mapMutations } from 'vuex'
  import stageStore from 'stageModule/stores/stageStore'
  import CActionTask from 'stageModule/components/task/CActionTask'
  import CModalTask from 'stageModule/components/task/CModalTask'
  export default {
    name: 'DashboardDataTables',
    components: {
      CActionTask,
      CModalTask,
    },
    mounted () {
    },
    methods: {
      ...mapActions(stageStore.name, [
        'deleteTask',
        'editTask',
        'showModalTask',
      ]),
      ...mapMutations(stageStore.name, [
        'showModalTask',
      ]),
    },
    computed: {
      ...mapState(stageStore.name, [
        'loading',
        'headersTask',
        'tasks',
      ]),
    },
    data: () => ({
      search: undefined,
    }),
  }
</script>
