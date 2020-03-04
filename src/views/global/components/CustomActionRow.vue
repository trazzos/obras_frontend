<template>
  <div class="d-flex">
    <div class="d-inline-flex">
      <v-btn
        v-for="(action, i) in actions"
        :color="action.color"
        :title="action.title"
        :icon ="action.isIcon"
        :fab ="action.isFab"
        x-small
        @click="$emit(action.handler,row)"
        class="mx-1"
        :key="i"
      > <v-icon dark>
        {{ action.icon }}
      </v-icon>
      </v-btn>
    </div>
  </div>
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
