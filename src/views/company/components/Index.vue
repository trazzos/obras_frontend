<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="indigo"
      title="Empresas"
      inline
      class="px-5 py-3"
    >

<!--
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Search"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />
-->

      <v-data-table
        :headers="headers"
        :items="items"
        :loading="loading"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        multi-sort
      />
    </base-material-card>
  </v-container>
</template>

<script>

  import { mapState, mapActions } from 'vuex'

  import companyStore from 'companyModule/stores/companyStore'

  export default {
    name: 'DashboardDataTables',
    beforeCreate () {
      if (!this.$store.state.companyStore) {
        this.$store.registerModule(companyStore.name, companyStore)
      }
    },
    mounted () {
      this.companyGetApi()
    },
    methods: {
      ...mapActions(companyStore.name, [
        'companyGetApi',
      ]),
    },
    computed: {
      ...mapState(companyStore.name, [
        'loading',
        'headers',
        'items',
      ]),
    },
    data: () => ({
      search: undefined,
    }),
  }
</script>
