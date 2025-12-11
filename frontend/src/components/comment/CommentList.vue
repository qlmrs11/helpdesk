<template>
  <div>
    <div v-for="c in comments" :key="c.id" style="margin-bottom:8px">
      <div style="font-weight:600">{{ c.user?.name || "Unknown" }}</div>
      <div>{{ c.content }}</div>
      <div class="small">{{ formatDate(c.createdAt) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: { comments: { type: Array, default: () => [] } },
  methods: {
    formatDate(d){ return new Date(d).toLocaleString(); }
  }
}
</script>
