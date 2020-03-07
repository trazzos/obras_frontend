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
            <form-user />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="showModal(false)"
          >Cancel</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveUser"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>
<script>
  import formUser from 'userModule/components/FormUser'
  import userStore from 'userModule/stores/userStore'
  import { mapFields } from 'vuex-map-fields'
  import { mapActions, mapMutations } from 'vuex'
  export default {
    name: 'modalUser',
    components: {
      formUser,
    },
    computed: {
      ...mapFields(userStore.name, [
        'dialog',
        'current_index',
      ]),
      titleForm () {
        return (this.current_index === -1) ? 'Agregar usuario' : 'Editar usuario'
      },
    },
    methods: {
      ...mapActions(userStore.name, ['saveUser']),
      ...mapMutations(userStore.name, ['showModal']),
    },
  }
</script>
<style scoped>

</style>
