<template>
  <div class="d-flex">
    <div class="d-inline-flex">
      <v-btn
        color="info"
        title="Ver tareas"
        fab
        x-small
        @click="$emit('viewListTask',item)"
        class="mx-1"
      > <v-icon dark>
        mdi-file-tree
      </v-icon>
      </v-btn>
      <v-btn
        color="success"
        title="Editar"
        fab
        x-small
        @click="$emit('editItem',item)"
        class="mx-1"
      > <v-icon dark>
        mdi-pencil
      </v-icon>
      </v-btn>
      <v-btn
        color="error"
        title="Editar"
        fab
        x-small
        @click="$emit('deleteItem',item)"
        class="mx-1"
      > <v-icon dark>
        mdi-delete
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'c-action-stage',
    props: {
      item: Object,
    },
  }
</script>

<style scoped>

</style>
