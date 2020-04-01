<template>
    <v-dialog
      v-model="modal_announcement"
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
          :value="loading_modal_announcement"
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
            <custom-form-announcement />
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            outlined
            color="primary"
            class="v-btn--text white--text font-weight-bold"
            @click="showModal({ modal:'modal_announcement', status: false})"
          >
            Cancelar
          </v-btn>
          <v-btn
            outlined
            color="primary"
            class="v-btn--text white--text font-weight-bold"
            @click="saveAnnouncement"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
  import CustomFormAnnouncement from 'announcementModule/components/CustomFormAnnouncement'
  import announcementStore from 'announcementModule/stores/announcementStore'
  import { mapFields } from 'vuex-map-fields'
  import { mapActions, mapMutations } from 'vuex'
  export default {
    name: 'CustomModalAnnouncement',
    components: {
      CustomFormAnnouncement,
    },
    computed: {
      ...mapFields(announcementStore.name, [
        'modal_announcement',
        'current_announcement_index',
        'loading_modal_announcement',
      ]),
      titleForm () {
        return (this.current_announcement_index === null) ? 'Agregar Convocatoria' : 'Editar Convocatoria'
      },
    },
    watch: {
      modal_announcement (val) {
        !val && this.resetCurrentAnnouncement()
      },
    },
    methods: {
      ...mapActions(announcementStore.name, [
        'saveAnnouncement',
      ]),
      ...mapMutations(announcementStore.name, [
        'showModal',
        'resetCurrentAnnouncement',
      ]),
    },
  }
</script>
