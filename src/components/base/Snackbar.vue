<template>
  <v-container>
    <base-material-snackbar
      v-model="show"
      :right="true"
      :top="true"
      :type="type"
    >
      {{ text }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      />
    </base-material-snackbar>
  </v-container>
</template>

<script>
  import { mapFields } from 'vuex-map-fields'

  export default {
    name: 'GlobalSnackbar',
    computed: {
      ...mapFields('globalStore', [
        'snackbar.show',
        'snackbar.text',
        'snackbar.type',
      ]),
    },
  }
</script>
