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
    <h1>format-scaffolding Vue demo</h1>
    <p>用来验证 pnpm 下 extends 包与引擎是否能被解析。</p>
    <HelloCard title="可运行页面" />
  </main>
</template>
