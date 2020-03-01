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
      />
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="12"
    >
      <v-textarea
        v-model="comment"
        label="Comentarios"
      />
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="12"
    >
      <v-simple-checkbox
        v-model="create_pdf"
        label=""
      />
    </v-col>
  </v-row>
</template>

<script>
  import stageStore from 'stageModule/stores/stageStore'
  import { mapFields } from 'vuex-map-fields'
  export default {
    name: 'c-stage-form',
    mounted () {
    },
    computed: {
      ...mapFields(stageStore.name, [
        'current_task.name',
        'current_task.comment',
        'current_task.legal_basis',
        'current_task.create_pdf',
      ]),
    },
    methods: {
    },
  }
</script>
