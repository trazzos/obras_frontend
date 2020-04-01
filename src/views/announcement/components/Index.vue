<template>
  <v-container
    id="data-tables"
    tag="section"
  >
    <base-material-card
      color="primary"
      title="Convocatorias"
      inline
      class="px-5 py-3"
    >
    <v-toolbar
      flat
    >
      <v-spacer />
      <v-btn
        small
        color="primary"
        dark
        class="mb-2"
        title="Agregar acción"
        @click="addAnnouncement"
      >Agregar</v-btn>
    </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="items"
        :loading="loading"
        :options.sync="datatable_options"
        :server-items-length="datatable_options.totalItems"
        :footer-props="{
          showFirstLastPage: true,
          itemsPerPageOptions: [datatable_options.itemsPerPage],
          showCurrentPage: true,
        }"
        :sort-by="['name']"
        :sort-desc="[false, true]"
        multi-sort
      >
        <template
          v-slot:top
        >
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                id="announcement_name"
                :comparison="`contains`"
                @input.native="formPredicates($event)"
                outlined
                label="Buscar por nombre"
                dense
              />
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.action="{ item }">
          <custom-announcement-row
            :row ="item"
            :actions="actions"
            @editItem="editAnnouncement"
            @deleteItem="deleteAnnouncement"
          />
        </template>
      </v-data-table>
    </base-material-card>
    <custom-modal-announcement></custom-modal-announcement>
  </v-container>
</template>

<script>

  import { mapState, mapActions, mapMutations } from 'vuex'
  import { mapFields } from 'vuex-map-fields'

  import announcementStore from 'announcementModule/stores/announcementStore'
  import CustomModalAnnouncement from 'announcementModule/components/CustomModalAnnouncement'
  import CustomAnnouncementRow from 'globalModule/components/CustomActionRow'
  export default {
    name: 'DashboardDataTables',
    mounted () {
      this.loadTypes()
    },
    components: {
      CustomModalAnnouncement,
      CustomAnnouncementRow,
    },
    computed: {
      ...mapState(announcementStore.name, [
        'headers',
      ]),
      ...mapState('announcementStore/paginationStore', [
        'items',
        'loading',
        'pagination_request',
      ]),
      ...mapFields('announcementStore/paginationStore', [
        'datatable_options',
      ]),
    },
    watch: {
      datatable_options: {
        handler () {
          this.setPaginationRequest()
          this.announcementGetApi(this.pagination_request)
        },
        deep: true,
      },
    },
    beforeCreate () {
      if (!this.$store.state.announcementStore) {
        this.$store.registerModule(announcementStore.name, announcementStore)
      }
    },
    methods: {
      ...mapMutations('announcementStore/paginationStore', [
        'setPaginationRequest',
      ]),
      ...mapActions(announcementStore.name, [
        'announcementGetApi',
        'deleteAnnouncement',
        'editAnnouncement',
        'addAnnouncement',
        'loadTypes',
      ]),
      ...mapActions('announcementStore/paginationStore', [
        'formPredicates',
      ]),
    },
    data: () => ({
      search: undefined,
      actions: [
        {
          icon: 'mdi-pencil',
          title: 'Editar convocatoria',
          color: 'primary',
          handler: 'editItem',
          isIcon: false,
          isFab: true,
        },
        {
          icon: 'mdi-delete',
          title: 'Eliminar convocatoria',
          color: 'error',
          handler: 'deleteItem',
          isIcon: false,
          isFab: true,
        },
      ],
    }),
  }
</script>
