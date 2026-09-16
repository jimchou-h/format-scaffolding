<script lang="ts">
import { defineComponent } from 'vue';
import HelloCard from './components/HelloCard.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloCard,
  },
});
</script>

<template>
  <main class="page">
    <h1>format-scaffolding 2.0 Vue demo</h1>
    <p>验证 ESLint 9 flat config、pnpm 直接依赖，以及 Vue 3 + TypeScript 能否被扫描。</p>
    <HelloCard title="可运行页面" />
  </main>
</template>
