<template>
  <div class="d-flex">
    <div class="d-inline-flex">
      <v-btn
        v-for="(action, i) in actions"
        :key="i"
        :color="action.color"
        :title="action.title"
        :icon="action.isIcon"
        :fab="action.isFab"
        x-small
        class="mx-1"
        @click="$emit(action.handler,row)"
      >
        <v-icon dark>
          {{ action.icon }}
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomActionRow',
    props: {
      firstName: {
        type: String,
        default: 'Unknown person',
      },
      actions: {
        type: Array,
        default: function () {
          return []
        },
      },
      row: {
        type: Object,
        default: function () {
          return {}
        },
      },
    },
  }
</script>

<style scoped>

</style>
