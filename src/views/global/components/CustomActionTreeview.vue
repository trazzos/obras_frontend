<template>
  <span class="d-inline-flex">
      <v-icon
        v-for="(action, i) in actions"
        :color="action.color"
        :title="action.title"
        icon
        small
        @click="$emit(action.handler,row)"
        class="mx-1"
        :key="i"
        dark
      >
        {{ action.icon }}
      </v-icon>
  </span>
</template>

<script>
  export default {
    name: 'custom-action-row',
    props: {
      actions: Array,
      row: Object,
    },
  }
</script>

<style scoped>

</style>
