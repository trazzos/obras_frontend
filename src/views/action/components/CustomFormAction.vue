<template>
  <v-row
  align-content="stretch"
  >
    <v-col
      cols="12"
      sm="6"
      md="8"
    >
      <v-text-field
        v-model="name"
        outlined
        label="Nombre"
        dense
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-select
        v-model="accepted_extension"
        :items="extensions"
        item-text="name"
        item-value="name"
        multiple
        dense
        outlined
        label="Archivos permitidos"
      >
        <template
         v-slot:prepend-item
        >
          <v-list-item
            ripple
            @click="toggle"
          >
            <v-list-item-action>
              <v-icon :color="accepted_extension.length > 0 ? 'primary darken-4':''">{{ icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Todos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mt-2"></v-divider>
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
  import actionStore from 'actionModule/stores/actionStore'
  import { mapActions } from 'vuex'
  import { mapFields } from 'vuex-map-fields'
  export default {
    name: 'CustomFormAction',
    computed: {
      ...mapFields(actionStore.name, [
        'current_action.name',
        'extensions',
        'current_action.accepted_extension',
      ]),
      allSelected () {
        return this.extensions.filter((ext) => !ext.header).length === this.accepted_extension.length
      },
      someSelected () {
        return this.accepted_extension.length > 0 && !this.allSelected
      },
      icon () {
        if (this.allSelected) return 'mdi-close-box'
        if (this.someSelected) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
    },
    methods: {
      ...mapActions(actionStore.name, [
        'setSelectedItem',
      ]),
      toggle () {
        this.$nextTick(() => {
          if (this.allSelected) {
            this.accepted_extension = []
          } else {
            this.accepted_extension = this.extensions.filter((ext) => !ext.header)
          }
        })
      },
    },
  }
</script>
