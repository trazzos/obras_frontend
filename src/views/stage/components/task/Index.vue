<template>
  <v-container
    id="data-tables"
    tag="section"
  >
      <v-toolbar
        flat
        height="20"
      >
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="addTask"
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
        class="mx-0 my-4 elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <custom-action-row
            :row ="item"
            :actions="actions"
            @editItem="editTask"
            @deleteItem="deleteTask"
          />
        </template>
      </v-data-table>
  </v-container>
</template>

<script>

  import { mapState, mapActions } from 'vuex'
  import stageStore from 'stageModule/stores/stageStore'
  import CustomActionRow from 'globalModule/components/CustomActionRow'
  export default {
    name: 'DashboardDataTables',
    components: {
      CustomActionRow,
    },
    methods: {
      ...mapActions(stageStore.name, [
        'deleteTask',
        'editTask',
        'addTask',
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
      actions: [
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
  }
</script>
