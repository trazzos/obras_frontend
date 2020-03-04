<template>
<v-toolbar
    flat
  >
    <v-spacer />
    <v-dialog
      v-model="dialog"
      max-width="800px"
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
            <form-company />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="showModal(false)"
          >Cancel</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveCompany"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>
<script>
  import formCompany from 'companyModule/components/FormCompany'
  import companyStore from 'companyModule/stores/companyStore'
  import { mapFields } from 'vuex-map-fields'
  import { mapActions, mapMutations } from 'vuex'
  export default {
    name: 'modalCompany',
    components: {
      formCompany,
    },
    computed: {
      ...mapFields(companyStore.name, [
        'dialog',
        'current_index',
      ]),
      titleForm () {
        return (this.current_index === -1) ? 'Agregar empresa' : 'Editar empresa'
      },
    },
    methods: {
      ...mapActions(companyStore.name, ['saveCompany']),
      ...mapMutations(companyStore.name, ['showModal']),
    },
  }
</script>
<style scoped>

</style>
