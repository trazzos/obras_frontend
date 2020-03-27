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
        :options.sync="datatable_options"
        :server-items-length="datatable_options.totalItems"
        :footer-props="{
          showFirstLastPage: true,
          itemsPerPageOptions: [datatable_options.itemsPerPage],
          showCurrentPage: true,
        }"
        :sort-by="['name']"
        :sort-desc="[false, true]"
        multi-sort
      >
        <template
          v-slot:top
        >
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                id="action_name"
                :comparison="`contains`"
                @input.native="formPredicates($event)"
                outlined
                label="Buscar por nombre"
                dense
              />
            </v-col>
          </v-row>
        </template>
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

  import { mapState, mapActions, mapMutations } from 'vuex'
  import { mapFields } from 'vuex-map-fields'

  import actionStore from 'actionModule/stores/actionStore'
  import CustomModalAction from 'actionModule/components/CustomModalAction'
  import CustomActionRow from 'globalModule/components/CustomActionRow'
  export default {
    name: 'DashboardDataTables',
    components: {
      CustomModalAction,
      CustomActionRow,
    },
    computed: {
      ...mapState(actionStore.name, [
        'headers',
      ]),
      ...mapState('actionStore/paginationStore', [
        'items',
        'loading',
        'pagination_request',
      ]),
      ...mapFields('actionStore/paginationStore', [
        'datatable_options',
      ]),
    },
    watch: {
      datatable_options: {
        handler () {
          this.setPaginationRequest()
          this.actionGetApi(this.pagination_request)
        },
        deep: true,
      },
    },
    beforeCreate () {
      if (!this.$store.state.actionStore) {
        this.$store.registerModule(actionStore.name, actionStore)
      }
    },
    methods: {
      ...mapMutations('actionStore/paginationStore', [
        'setPaginationRequest',
      ]),
      ...mapActions(actionStore.name, [
        'actionGetApi',
        'deleteAction',
        'editAction',
        'addAction',
      ]),
      ...mapActions('actionStore/paginationStore', [
        'formPredicates',
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
