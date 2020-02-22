<template>
  <v-container>
    <base-material-snackbar
      v-model="show"
      :right="true"
      :top="true"
      :type="type"
    >
      {{ text }}
    </base-material-snackbar>
  </v-container>
</template>

<script>
  import { mapFields } from 'vuex-map-fields'

  export default {
    name: 'GlobalSnackbar',
    computed: {
      ...mapFields('globalModule', [
        'snackbar.show',
        'snackbar.text',
        'snackbar.type',
      ]),
    },
  }
</script>
