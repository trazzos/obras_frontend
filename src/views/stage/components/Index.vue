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
          <c-modal-stage />
        </template>
        <template v-slot:item.action="{ item }">
          <c-action-stage
            :item ="item"
            @editItem="editStage"
            @viewListTask="viewListTask"
          />
        </template>
      </v-data-table>
    </base-material-card>
    <c-modal-task-stage></c-modal-task-stage>
  </v-container>
</template>

<script>

  import { mapState, mapActions } from 'vuex'

  import stageStore from 'stageModule/stores/stageStore'
  import CModalStage from 'stageModule/components/CModalStage'
  import CModalTaskStage from 'stageModule/components/CModalTaskStage'
  import CActionStage from 'stageModule/components/CActionStage'
  export default {
    name: 'DashboardDataTables',
    components: {
      CModalStage,
      CActionStage,
      CModalTaskStage,
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
        'deleteItem',
        'editStage',
        'viewListTask',
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
    }),
  }
</script>
