<template>
<v-toolbar
    flat
  >
    <v-spacer />
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          class="mb-2"
          v-on="on"
        >Agregar</v-btn>
      </template>
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >{{ titleForm }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <c-form-stage />
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            outlined
            color="primary"
            class="v-btn--text white--text font-weight-bold"
            @click="showModal(false)"
          >Cancelar</v-btn>
          <v-btn
            outlined
            color="primary"
            class="v-btn--text white--text font-weight-bold"
            @click="saveStage"
          >Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>
<script>
  import CFormStage from 'stageModule/components/CFormStage'
  import stageStore from 'stageModule/stores/stageStore'
  import { mapFields } from 'vuex-map-fields'
  import { mapActions, mapMutations } from 'vuex'
  export default {
    name: 'c-modal-stage',
    components: {
      CFormStage,
    },
    computed: {
      ...mapFields(stageStore.name, [
        'dialog',
        'current_stage_index',
      ]),
      titleForm () {
        return (this.current_stage_index === -1) ? 'Agregar etapa' : 'Editar etapa'
      },
    },
    methods: {
      ...mapActions(stageStore.name, ['saveStage']),
      ...mapMutations(stageStore.name, ['showModal']),
    },
  }
</script>
<style scoped>

</style>
