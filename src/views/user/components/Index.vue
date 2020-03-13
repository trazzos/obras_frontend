<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="indigo"
      title="Usuarios"
      inline
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="loading"
        :options.sync="datatable_options"
        :server-items-length="datatable_options.totalItems"
        :footer-props="{
          showFirstLastPage: true,
          itemsPerPageOptions: [datatable_options.itemsPerPage],
        }"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        multi-sort
      >
        <template v-slot:top>
          <modal-user />
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            color="success"
            title="Editar"
            fab
            x-small
            @click="editItem(item)"
          >
            <v-icon dark>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
            color="red"
            title="Eliminar"
            x-small
            fab
            @click="deleteItem(item)"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>

  import { mapState, mapActions } from 'vuex'
  import { mapFields } from 'vuex-map-fields'

  import userStore from 'userModule/stores/userStore'
  import modalUser from 'userModule/components/ModalUser'

  export default {
    name: 'DashboardDataTables',
    components: {
      modalUser,
    },
    data: () => ({
      search: undefined,
    }),
    computed: {
      ...mapState(userStore.name, [
        'loading',
        'headers',
        'items',
        'paginationModule/datatable_options',
      ]),
      ...mapFields('userStore/paginationStore', [
        'datatable_options',
      ]),
    },
    watch: {
      datatable_options: {
        handler () {
          this.userGetApi(this.datatable_options.page)
        },
        deep: true,
      },
    },
    beforeCreate () {
      if (!this.$store.state.userStore) {
        this.$store.registerModule(userStore.name, userStore)
      }
    },
    methods: {
      ...mapActions(userStore.name, [
        'userGetApi',
        'deleteItem',
        'editItem',
      ]),
    },
  }
</script>
