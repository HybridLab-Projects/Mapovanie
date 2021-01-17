<template>
  <div id="container">
    <strong>{{ name }}</strong>
    <p>
      Explore <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://ionicframework.com/docs/components"
      >UI Components</a>
    </p>
  </div>
</template>

<script lang="ts">

export default {
  name: 'ExploreContainer',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>
