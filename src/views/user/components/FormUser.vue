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
        :items="roles"
        label="Rol"
        item-text="role_value"
        item-value="role_value"
        dense
        outlined
      />
    </v-col>
  </v-row>
</template>

<script>
  import userStore from 'userModule/stores/userStore'
  import { mapFields } from 'vuex-map-fields'
  export default {
    name: 'FormUser',
    data: function () {
      return {
        roles: [{
          role_value: 'admin',
        }, {
          role_value: 'manager',
        }, {
          role_value: 'user',
        }],
      }
    },
    computed: {
      ...mapFields(userStore.name, [
        'current_item.name',
        'current_item.email',
        'current_item.password',
        'current_item.role',
      ]),
    },
  }
</script>
