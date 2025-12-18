<script setup lang="ts">
import { computed } from 'vue';
import type { Ticket } from '@/store/ticket.store';
import StatusBadge from '@/components/StatusBadge.vue';

interface Props {
  ticket: Ticket;
}

const props = defineProps<Props>();

const categoryIcon = computed(() => {
  return props.ticket.category === 'IT' ? '💻' : '👥';
});

const categoryColor = computed(() => {
  return props.ticket.category === 'IT' ? 'text-blue-600 bg-blue-50' : 'text-purple-600 bg-purple-50';
});

const priorityConfig = computed(() => {
  const configs = {
    LOW: { label: 'Low', color: 'text-green-600 bg-green-50', icon: '🟢' },
    NORMAL: { label: 'Normal', color: 'text-blue-600 bg-blue-50', icon: '🔵' },
    HIGH: { label: 'High', color: 'text-red-600 bg-red-50', icon: '🔴' },
  };
  return configs[props.ticket.priority];
});

const formattedCreatedAt = computed(() => {
  const date = new Date(props.ticket.createdAt);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

const formattedUpdatedAt = computed(() => {
  const date = new Date(props.ticket.updatedAt);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden">
    <!-- Header -->
    <div :class="['px-6 py-4 border-b border-gray-200', categoryColor]">
      <div class="flex items-center gap-3">
        <span class="text-3xl">{{ categoryIcon }}</span>
        <div>
          <h2 class="text-xl font-bold text-gray-800">{{ ticket.category }} Support</h2>
          <p class="text-sm text-gray-600">Ticket #{{ ticket.id }}</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 space-y-6">
      <!-- Title -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-2xl font-bold text-gray-800">{{ ticket.title }}</h3>
          <StatusBadge :status="ticket.status" />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">DESKRIPSI</label>
        <p class="text-gray-700 whitespace-pre-wrap">{{ ticket.description }}</p>
      </div>

      <!-- Priority & Category -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">PRIORITAS</label>
          <div :class="['inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold', priorityConfig.color]">
            <span>{{ priorityConfig.icon }}</span>
            <span>{{ priorityConfig.label }}</span>
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">KATEGORI</label>
          <div :class="['inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold', categoryColor]">
            <span>{{ categoryIcon }}</span>
            <span>{{ ticket.category }}</span>
          </div>
        </div>
      </div>

      <!-- Created By & Helper -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">DIBUAT OLEH</label>
          <div v-if="ticket.user" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-800">{{ ticket.user.name }}</p>
              <p class="text-xs text-gray-500">{{ ticket.user.email }}</p>
            </div>
          </div>
          <p v-else class="text-gray-400 italic p-3 bg-gray-50 rounded-lg">Tidak ada info</p>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">HELPER</label>
          <div v-if="ticket.assignedTo || ticket.helper" class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-800">{{ ticket.assignedTo?.name || ticket.helper?.name }}</p>
              <p class="text-xs text-gray-500">{{ ticket.assignedTo?.email || ticket.helper?.email }}</p>
            </div>
          </div>
          <p v-else class="text-gray-400 italic p-3 bg-gray-50 rounded-lg">Belum di-assign</p>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="pt-4 border-t border-gray-200">
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-gray-500 mb-1">Dibuat</p>
            <p class="font-medium text-gray-700">{{ formattedCreatedAt }}</p>
          </div>
          <div>
            <p class="text-gray-500 mb-1">Terakhir diupdate</p>
            <p class="font-medium text-gray-700">{{ formattedUpdatedAt }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>