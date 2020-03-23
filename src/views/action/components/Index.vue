<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="primary"
      title="Acciones"
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
        title="Agregar acción"
        @click="addAction"
      >Agregar</v-btn>
    </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="loading"
        :search.sync="search"
        :sort-by="['name']"
        :sort-desc="[false, true]"
        multi-sort
      >
        <template v-slot:item.action="{ item }">
          <custom-action-row
            :row ="item"
            :actions="actions"
            @editItem="editAction"
            @deleteItem="deleteAction"
          />
        </template>
      </v-data-table>
    </base-material-card>
    <custom-modal-action></custom-modal-action>
  </v-container>
</template>

<script>

  import { mapState, mapActions } from 'vuex'

  import actionStore from 'actionModule/stores/actionStore'
  import CustomModalAction from 'actionModule/components/CustomModalAction'
  import CustomActionRow from 'globalModule/components/CustomActionRow'
  export default {
    name: 'DashboardDataTables',
    components: {
      CustomModalAction,
      CustomActionRow,
    },
    beforeCreate () {
      if (!this.$store.state.actionStore) {
        this.$store.registerModule(actionStore.name, actionStore)
      }
    },
    mounted () {
      this.actionGetApi()
    },
    methods: {
      ...mapActions(actionStore.name, [
        'actionGetApi',
        'deleteAction',
        'editAction',
        'addAction',
      ]),
    },
    computed: {
      ...mapState(actionStore.name, [
        'loading',
        'headers',
        'items',
      ]),
    },
    data: () => ({
      search: undefined,
      actions: [
        {
          icon: 'mdi-pencil',
          title: 'Editar acción',
          color: 'primary',
          handler: 'editItem',
          isIcon: false,
          isFab: true,
        },
        {
          icon: 'mdi-delete',
          title: 'Eliminar acción',
          color: 'error',
          handler: 'deleteItem',
          isIcon: false,
          isFab: true,
        },
      ],
    }),
  }
</script>
