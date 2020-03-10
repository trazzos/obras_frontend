<template>
  <div class="d-flex">
    <div class="d-inline-flex">
      <v-btn
        v-for="(action, i) in actions"
        :key="i"
        outlined
        :color="action.color"
        :title="action.title"
        :icon="action.isIcon"
        :fab="action.isFab"
        class="mx-1"
        @click="$emit(action.handler)"
      >
        {{ action.title }}
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomActionModal',
    props: {
      actions: {
        type: Array,
        default: function () {
          return []
        },
      },
    },
  }
</script>
