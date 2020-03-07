<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="12"
    >
      <v-text-field
        v-model="name"
        label="Nombre"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="12"
    >
      <v-text-field
        v-model="email"
        label="E-mail"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="12"
    >
      <v-text-field
        v-model="password"
        label="Contraseña"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-select
        v-model="role"
        :items="states"
        label="Rol"
        item-text="nom_agee"
        item-value="cve_agee"
        dense
        outlined
        @change="loadMunicipio"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
  import userStore from 'userModule/stores/userStore'
  import { mapActions } from 'vuex'
  import { mapFields } from 'vuex-map-fields'
  export default {
    name: 'FormUser',
    mounted () {
      this.loadStates()
    },
    computed: {
      ...mapFields(userStore.name, [
        'current_item.name',
        'current_item.email',
        'current_item.password',
        'current_item.role',
        'states',
        'municipios',
      ]),
    },
    methods: {
      ...mapActions(userStore.name, [
        'loadStates',
        'loadMunicipio',
      ]),
    },
  }
</script>
