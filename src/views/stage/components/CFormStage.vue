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
        'current_stage.name',
      ]),
    },
    methods: {
    },
  }
</script>
