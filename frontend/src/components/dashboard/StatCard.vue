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
  background: var(--color-background-soft);
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  text-align: center;
}

.title {
  font-size: 1rem;
  color: var(--color-text-soft);
  margin: 0;
}

.value {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 4px 0;
  color: var(--color-heading);
}

.subtitle {
  font-size: 0.85rem;
  color: var(--color-text-soft);
  margin: 0;
}

/* Dark theme: soften shadow */
:root[data-theme='dark'] .stat-card {
  box-shadow: 0 3px 12px rgba(0,0,0,0.25);
}
</style>
