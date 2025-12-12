<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  status: 'PENDING' | 'IN_PROGRESS' | 'WAITING_USER' | 'DONE' | 'RESOLVED';
}

const props = defineProps<Props>();

const statusConfig = computed(() => {
  const configs = {
    PENDING: {
      label: 'Pending',
      classes: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      icon: '⏳'
    },
    IN_PROGRESS: {
      label: 'In Progress',
      classes: 'bg-blue-100 text-blue-700 border-blue-300',
      icon: '🔄'
    },
    WAITING_USER: {
      label: 'Waiting User',
      classes: 'bg-orange-100 text-orange-700 border-orange-300',
      icon: '⏸️'
    },
    DONE: {
      label: 'Done',
      classes: 'bg-green-100 text-green-700 border-green-300',
      icon: '✅'
    },
    RESOLVED: {
      label: 'Resolved',
      classes: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      icon: '🎉'
    }
  };
  
  return configs[props.status];
});
</script>

<template>
  <span 
    :class="[
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border',
      statusConfig.classes
    ]"
  >
    <span>{{ statusConfig.icon }}</span>
    <span>{{ statusConfig.label }}</span>
  </span>
</template>