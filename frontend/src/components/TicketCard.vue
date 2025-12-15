<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import StatusBadge from './StatusBadge.vue';

interface Ticket {
  id: number;
  title: string;
  description: string;
  category: 'IT' | 'HR';
  priority: 'LOW' | 'NORMAL' | 'HIGH';
  status: 'PENDING' | 'IN_PROGRESS' | 'WAITING_USER' | 'DONE' | 'RESOLVED';
  createdAt: string;
  assignedToId: number | null;
  user?: {
    name: string;
    email: string;
  };
  helper?: {
    name: string;
    email: string;
  };
  assignedTo?: {
    name: string;
    email: string;
  };
}

interface Props {
  ticket: Ticket;
  showHelper?: boolean;
  showUser?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showHelper: false,
  showUser: false,
});

const router = useRouter();

const priorityColor = computed(() => {
  const colors = {
    LOW: 'text-green-600 bg-green-50',
    NORMAL: 'text-blue-600 bg-blue-50',
    HIGH: 'text-red-600 bg-red-50'
  };
  return colors[props.ticket.priority];
});

const categoryIcon = computed(() => {
  return props.ticket.category === 'IT' ? '💻' : '👥';
});

const formattedDate = computed(() => {
  const date = new Date(props.ticket.createdAt);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

function goToDetail() {
  router.push(`/ticket/${props.ticket.id}`);
}
</script>

<template>
  <div 
    @click="goToDetail"
    class="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">{{ categoryIcon }}</span>
          <span class="text-sm font-semibold text-gray-500">{{ ticket.category }}</span>
          <span 
            :class="[
              'text-xs font-bold px-2 py-0.5 rounded',
              priorityColor
            ]"
          >
            {{ ticket.priority }}
          </span>
        </div>
        <h3 class="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
          {{ ticket.title }}
        </h3>
      </div>
      <StatusBadge :status="ticket.status" />
    </div>

    <!-- Description -->
    <p class="text-sm text-gray-600 mb-4 line-clamp-2">
      {{ ticket.description }}
    </p>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-3 border-t border-gray-100">
      <div class="flex items-center gap-4 text-xs text-gray-500">
        <!-- Created Date -->
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ formattedDate }}</span>
        </div>

        <!-- User Info (for Helper) -->
        <div v-if="showUser && ticket.user" class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{{ ticket.user.name }}</span>
        </div>

        <!-- Helper Info (for User) - FIX: pakai assignedTo -->
        <div v-if="showHelper && (ticket.helper || ticket.assignedTo)" class="flex items-center gap-1">
          <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span class="text-purple-600 font-medium">{{ ticket.assignedTo?.name || ticket.helper?.name }}</span>
        </div>
        <div v-else-if="showHelper && !ticket.assignedTo && !ticket.helper" class="flex items-center gap-1">
          <span class="text-gray-400 italic">Belum di-assign</span>
        </div>
      </div>

      <!-- Arrow Icon -->
      <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
</template>