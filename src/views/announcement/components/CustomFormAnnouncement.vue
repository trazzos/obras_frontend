<template>
  <v-row
    align-content="stretch"
  >
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-select
        v-model="announcement_type_id"
        :items="types"
        label="Tipo"
        item-text="name"
        item-value="id"
        dense
        outlined
      ></v-select>
    </v-col>
    <v-col
      cols="12"
      sm="4"
      md="4"
      >
        <v-menu
          ref="menu1"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Fecha"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
            ></v-date-picker>
        </v-menu>
      </v-col>
    <v-col
      cols="12"
      sm="12"
      md="12"
    >
      <v-text-field
        v-model="name"
        outlined
        label="Nombre"
        dense
      />
    </v-col>
  </v-row>
</template>

<script>
  import announcementStore from 'announcementModule/stores/announcementStore'
  import { mapActions } from 'vuex'
  import { mapFields } from 'vuex-map-fields'
  export default {
    name: 'CustomFormAnnouncement',
    data: vm => ({
      /* date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false, */
    }),
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      ...mapFields(announcementStore.name, [
        'current_announcement.name',
        'current_announcement.announcement_type_id',
        'current_announcement.date',
        'types',
      ]),
    },
    watch: {
      /* date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }, */
    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      ...mapActions(announcementStore.name, [
        'setSelectedItem',
        'loadTypes',
      ]),
    },
  }
</script>
