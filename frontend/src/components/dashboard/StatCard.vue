<script setup lang="ts">
const props = defineProps<{
  title: string
  value: string | number
  subtitle?: string
  accent?: 'green' | 'blue' | 'orange' | 'red'
}>()
</script>

<template>
  <div class="card" :class="`accent-${props.accent ?? 'blue'}`">
    <div class="title">{{ props.title }}</div>
    <div class="value">{{ props.value }}</div>
    <div v-if="props.subtitle" class="subtitle">{{ props.subtitle }}</div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;
  background: var(--color-background-soft);
}
.title {
  font-size: 0.85rem;
  color: var(--color-text-soft);
}
.value {
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 6px;
}
.subtitle {
  margin-top: 6px;
  font-size: 0.8rem;
  color: var(--color-text-soft);
}
.accent-blue { box-shadow: 0 0 0 2px rgba(99, 102, 241, .15) inset; }
.accent-green { box-shadow: 0 0 0 2px rgba(34, 197, 94, .15) inset; }
.accent-orange { box-shadow: 0 0 0 2px rgba(249, 115, 22, .15) inset; }
.accent-red { box-shadow: 0 0 0 2px rgba(239, 68, 68, .15) inset; }
</style>
