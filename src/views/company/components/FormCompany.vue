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
        v-model="address"
        label="Direccion"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-text-field
        v-model="email"
        label="Email"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-text-field
        v-model="cp"
        label="Codigo Postal"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-text-field
        v-model="state"
        label="Estado"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-text-field
        v-model="phone"
        label="Telefono"
      />
    </v-col>
  </v-row>
</template>

<script>
  import companyStore from 'companyModule/stores/companyStore'
  import { mapFields } from 'vuex-map-fields'
  export default {
    name: 'FormCompany',
    computed: {
      ...mapFields(companyStore.name, [
        'current_item.name',
        'current_item.email',
        'current_item.address',
        'current_item.phone',
        'current_item.cp',
        'current_item.state',
      ]),
    },
  }
</script>
