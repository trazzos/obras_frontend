<template>
  <div class="d-flex">
    <div class="d-inline-flex">
      <v-btn
        outlined
        v-for="(action, i) in actions"
        :color="action.color"
        :title="action.title"
        :icon ="action.isIcon"
        :fab ="action.isFab"
        @click="$emit(action.handler)"
        class="mx-1"
        :key="i"
      >{{ action.title }}</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'custom-action-modal',
    props: {
      actions: Array,
    },
  }
</script>
