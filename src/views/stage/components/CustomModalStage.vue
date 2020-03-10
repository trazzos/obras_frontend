<template>
  <v-toolbar
    flat
  >
    <v-spacer />
    <v-dialog
      v-model="modal_stage"
      max-width="500px"
      hide-overlay
      persistent
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          class="mb-2"
          v-on="on"
        >
          Agregar
        </v-btn>
      </template>
      <v-card>
        <v-overlay
          :absolute="true"
          :opacity="0.15"
          :value="loading_modal_stage"
          :z-index="5"
        >
          <v-progress-circular
            indeterminate
            size="64"
            color="primary"
          />
        </v-overlay>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ titleForm }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <custom-form-stage />
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            outlined
            color="primary"
            class="v-btn--text white--text font-weight-bold"
            @click="showModal({ modal:'modal_stage', status: false})"
          >
            Cancelar
          </v-btn>
          <v-btn
            outlined
            color="primary"
            class="v-btn--text white--text font-weight-bold"
            @click="saveStage"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>
<script>
  import CustomFormStage from 'stageModule/components/CustomFormStage'
  import stageStore from 'stageModule/stores/stageStore'
  import { mapFields } from 'vuex-map-fields'
  import { mapActions, mapMutations } from 'vuex'
  export default {
    name: 'CustomModalStage',
    components: {
      CustomFormStage,
    },
    computed: {
      ...mapFields(stageStore.name, [
        'modal_stage',
        'current_stage_index',
        'loading_modal_stage',
      ]),
      titleForm () {
        return (this.current_stage_index === null) ? 'Agregar etapa' : 'Editar etapa'
      },
    },
    watch: {
      modal_stage (val) {
        !val && this.resetCurrentStage()
      },
    },
    methods: {
      ...mapActions(stageStore.name, ['saveStage']),
      ...mapMutations(stageStore.name, ['showModal', 'resetCurrentStage']),
    },
  }
</script>
