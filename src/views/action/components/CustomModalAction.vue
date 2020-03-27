<template>
    <v-dialog
      v-model="modal_action"
      max-width="800px"
      hide-overlay
      persistent
    >
      <v-card>
        <v-toolbar
          dense
          max-height="60"
          color="primary"
        >
          <v-toolbar-title class="white--text font-weight-bold">{{ titleForm }}</v-toolbar-title>
        </v-toolbar>
        <v-overlay
          :absolute="true"
          :opacity="0.15"
          :value="loading_modal_action"
          :z-index="5"
        >
          <v-progress-circular
            indeterminate
            size="64"
            color="primary"
          />
        </v-overlay>
        <v-card-text>
          <v-container>
            <custom-form-action />
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            outlined
            color="primary"
            class="v-btn--text white--text font-weight-bold"
            @click="showModal({ modal:'modal_action', status: false})"
          >
            Cancelar
          </v-btn>
          <v-btn
            outlined
            color="primary"
            class="v-btn--text white--text font-weight-bold"
            @click="saveAction"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
  import CustomFormAction from 'actionModule/components/CustomFormAction'
  import actionStore from 'actionModule/stores/actionStore'
  import { mapFields } from 'vuex-map-fields'
  import { mapActions, mapMutations } from 'vuex'
  export default {
    name: 'CustomModalAction',
    components: {
      CustomFormAction,
    },
    mounted () {
      this.loadExtensions()
    },
    computed: {
      ...mapFields(actionStore.name, [
        'modal_action',
        'current_action_index',
        'loading_modal_action',
      ]),
      titleForm () {
        return (this.current_action_index === null) ? 'Agregar acción' : 'Editar acción'
      },
    },
    watch: {
      modal_action (val) {
        !val && this.resetCurrentAction()
      },
    },
    methods: {
      ...mapActions(actionStore.name, [
        'saveAction',
        'loadExtensions',
      ]),
      ...mapMutations(actionStore.name, [
        'showModal',
        'resetCurrentAction',
      ]),
    },
  }
</script>
