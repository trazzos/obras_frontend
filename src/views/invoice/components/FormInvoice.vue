<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
    >
      <v-select
        v-model="company_id"
        :items="companys"
        label="Empresas"
        item-text="name"
        item-value="id"
        dense
        outlined
      ></v-select>
    </v-col>
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
      md="6"
    >
      <v-text-field
        v-model="start"
        label="Inicio"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="6"
    >
      <v-text-field
        v-model="end"
        label="Fin"
      />
    </v-col>
    <v-col
      cols="12"
      sm="12"
    >
      <v-text-field
        v-model="file_name_header"
        label="Encabezado"
      />
    </v-col>
    <v-col
      cols="12"
      sm="12"
    >
      <v-text-field
        v-model="file_name_footer"
        label="Pie de Página"
      />
    </v-col>
    <v-col
      cols="12"
      sm="12"
    >
      <v-text-field
        v-model="file_name_watermark"
        label="Marca de Agua"
      />
    </v-col>
  </v-row>
</template>

<script>
  import invoiceStore from 'invoiceModule/stores/invoiceStore'
  import { mapActions } from 'vuex'
  import { mapFields } from 'vuex-map-fields'
  export default {
    name: 'Forminvoice',
    mounted () {
      this.loadCompanys()
    },
    computed: {
      ...mapFields(invoiceStore.name, [
        'current_item.company_id',
        'current_item.name',
        'current_item.start',
        'current_item.end',
        'current_item.file_name_header',
        'current_item.file_name_footer',
        'current_item.file_name_watermark',
        'companys',
      ]),
    },
    methods: {
      ...mapActions(invoiceStore.name, [
        'loadCompanys',
      ]),
    },
  }
</script>
