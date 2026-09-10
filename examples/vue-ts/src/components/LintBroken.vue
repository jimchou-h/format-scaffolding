<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LintBroken',
  data() {
    return {
      ok: true,
      list: ['a', 'b'],
    };
  },
});
</script>

<template>
  <!-- 故意违规：v-for 没有 key，且和 v-if 写在一起，供 scan 验证 -->
  <div v-for="item in list" v-if="ok">{{ item }}</div>
</template>
