<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloCard',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <section class="card">
    <h2>{{ title }}</h2>
    <p>打开本文件，ESLint / Prettier 应能在编辑器里工作。</p>
  </section>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}
</style>
