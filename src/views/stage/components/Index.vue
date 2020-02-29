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
        :items="items"
        :loading="loading"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        multi-sort
      >
        <template v-slot:top>
          <modal-company />
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

  import companyStore from 'stageModule/stores/stageStore'
  import modalCompany from 'stageModule/components/ModalStage'
  export default {
    name: 'DashboardDataTables',
    components: {
      modalCompany,
    },
    data: () => ({
      search: undefined,
    }),
    computed: {
      ...mapState(companyStore.name, [
        'loading',
        'headers',
        'items',
      ]),
    },
    beforeCreate () {
      if (!this.$store.state.stageStore) {
        this.$store.registerModule(companyStore.name, companyStore)
      }
    },
    mounted () {
      this.companyGetApi()
    },
    methods: {
      ...mapActions(companyStore.name, [
        'companyGetApi',
        'deleteItem',
        'editItem',
      ]),
    },
  }
</script>
