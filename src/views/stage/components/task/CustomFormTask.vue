<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="12"
    >
      <v-text-field
        v-model="name"
        label="Nombre"
        outlined
      />
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="12"
    >
      <v-textarea
        v-model="legal_basis"
        label="Bases legales"
        outlined
        rows="2"
      />
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="12"
    >
      <v-textarea
        v-model="comment"
        outlined
        label="Comentarios"
        rows="2"
      />
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="12"
    >
      <v-switch
        v-model="create_pdf"
        label="Crear pdf"
      />
    </v-col>
  </v-row>
</template>

<script>
  import stageStore from 'stageModule/stores/stageStore'
  import { mapFields } from 'vuex-map-fields'
  export default {
    name: 'CFormTask',
    computed: {
      ...mapFields(stageStore.name, [
        'current_task.name',
        'current_task.comment',
        'current_task.legal_basis',
        'current_task.create_pdf',
      ]),
    },
  }
</script>
