<script setup lang="ts">
defineProps<{
  title: string
  value: number
  subtitle?: string
  accent?: string
}>()
</script>

<template>
  <div class="stat-card" :style="{ borderTopColor: accent || '#38bdf8' }">
    <h3 class="title">{{ title }}</h3>
    <p class="value">{{ value }}</p>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.stat-card {
  border-top: 4px solid #38bdf8;
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  text-align: center;
  font-family: 'Inter', sans-serif;
}

.title {
  font-size: 1rem;
  color: #334155;
  margin: 0;
}

.value {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 4px 0;
  color: #1e293b;
}

.subtitle {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
}
</style>
