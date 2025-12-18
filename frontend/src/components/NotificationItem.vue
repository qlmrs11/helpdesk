// src/components/NotificationItem.vue
<script setup lang="ts">
import { computed } from 'vue';
import type { Notification } from '@/store/notification.store';

interface Props {
  notification: Notification;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'click'): void;
}>();

const typeConfig = computed(() => {
  const configs: Record<string, { icon: string; color: string; bgColor: string }> = {
    TICKET_CREATED: { 
      icon: '🆕', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50' 
    },
    TICKET_ASSIGNED: { 
      icon: '👤', 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50' 
    },
    STATUS_UPDATED: { 
      icon: '📊', 
      color: 'text-green-600', 
      bgColor: 'bg-green-50' 
    },
    COMMENT_ADDED: { 
      icon: '💬', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50' 
    },
    TICKET_RESOLVED: { 
      icon: '🎉', 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50' 
    },
  };

  return configs[props.notification.type] || { 
    icon: '🔔', 
    color: 'text-gray-600', 
    bgColor: 'bg-gray-50' 
  };
});

const timeAgo = computed(() => {
  const date = new Date(props.notification.createdAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Baru saja';
  if (minutes < 60) return `${minutes} menit yang lalu`;
  if (hours < 24) return `${hours} jam yang lalu`;
  return `${days} hari yang lalu`;
});
</script>

<template>
  <div
    @click="emit('click')"
    :class="[
      'px-4 py-3 hover:bg-gray-50 cursor-pointer transition duration-200 border-b border-gray-100 last:border-b-0',
      !notification.isRead ? 'bg-blue-50' : ''
    ]"
  >
    <div class="flex items-start gap-3">
      <!-- Icon -->
      <div :class="['w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', typeConfig.bgColor]">
        <span class="text-xl">{{ typeConfig.icon }}</span>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <p :class="['text-sm font-semibold mb-1', !notification.isRead ? 'text-gray-900' : 'text-gray-700']">
          {{ notification.title }}
        </p>
        <p class="text-xs text-gray-600 line-clamp-2 mb-2">
          {{ notification.message }}
        </p>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-500">{{ timeAgo }}</span>
          <span v-if="!notification.isRead" class="w-2 h-2 bg-blue-600 rounded-full"></span>
        </div>
      </div>
    </div>
  </div>
</template>