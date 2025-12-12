// src/views/dashboard/components/HelperDashboard.vue
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useTicketStore } from '@/store/ticket.store';
import { useAuthStore } from '@/store/auth.store';
import TicketCard from '@/components/TicketCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const ticketStore = useTicketStore();
const authStore = useAuthStore();

const filterStatus = ref<string>('ALL');
const showAssignedOnly = ref(false);

const statusOptions = [
  { value: 'ALL', label: 'Semua Ticket', color: 'gray' },
  { value: 'PENDING', label: 'Pending', color: 'yellow' },
  { value: 'IN_PROGRESS', label: 'In Progress', color: 'blue' },
  { value: 'WAITING_USER', label: 'Waiting User', color: 'orange' },
  { value: 'DONE', label: 'Done', color: 'green' },
];

const filteredTickets = computed(() => {
  let tickets = ticketStore.tickets;

  // Filter by assigned
  if (showAssignedOnly.value) {
    tickets = tickets.filter(t => t.helperId === authStore.user?.id);
  }

  // Filter by status
  if (filterStatus.value !== 'ALL') {
    tickets = tickets.filter(t => t.status === filterStatus.value);
  }

  return tickets;
});

const ticketStats = computed(() => {
  const stats = {
    total: ticketStore.tickets.length,
    myTickets: ticketStore.tickets.filter(t => t.helperId === authStore.user?.id).length,
    pending: 0,
    inProgress: 0,
    done: 0,
  };

  ticketStore.tickets.forEach(ticket => {
    if (ticket.status === 'PENDING') stats.pending++;
    if (ticket.status === 'IN_PROGRESS') stats.inProgress++;
    if (ticket.status === 'DONE') stats.done++;
  });

  return stats;
});

const departmentIcon = computed(() => {
  return authStore.user?.department === 'IT' ? '💻' : '👥';
});

const departmentColor = computed(() => {
  return authStore.user?.department === 'IT' ? 'from-blue-600 to-cyan-600' : 'from-purple-600 to-pink-600';
});

onMounted(() => {
  ticketStore.fetchHelperTickets();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div :class="['bg-gradient-to-r text-white py-12', departmentColor]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="text-4xl">{{ departmentIcon }}</span>
              <h1 class="text-3xl font-bold">Dashboard Helper</h1>
            </div>
            <p class="text-white/90">Department: {{ authStore.user?.department }}</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p class="text-white/80 text-sm mb-1">Ticket Saya</p>
            <p class="text-4xl font-bold">{{ ticketStats.myTickets }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <!-- Total Department -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Total Department</p>
              <p class="text-3xl font-bold text-gray-800 mt-1">{{ ticketStats.total }}</p>
            </div>
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">📋</span>
            </div>
          </div>
        </div>

        <!-- Pending -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Pending</p>
              <p class="text-3xl font-bold text-yellow-600 mt-1">{{ ticketStats.pending }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <!-- In Progress -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">In Progress</p>
              <p class="text-3xl font-bold text-blue-600 mt-1">{{ ticketStats.inProgress }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">🔄</span>
            </div>
          </div>
        </div>

        <!-- Done -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Done</p>
              <p class="text-3xl font-bold text-green-600 mt-1">{{ ticketStats.done }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter & List -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <!-- Filter Controls -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <!-- Status Filter -->
          <div class="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              v-for="option in statusOptions"
              :key="option.value"
              @click="filterStatus = option.value"
              :class="[
                'px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap',
                filterStatus === option.value
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ option.label }}
            </button>
          </div>

          <!-- My Tickets Toggle -->
          <button
            @click="showAssignedOnly = !showAssignedOnly"
            :class="[
              'px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap',
              showAssignedOnly
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Ticket Saya Saja
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="ticketStore.loading" class="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredTickets.length === 0" class="text-center py-12">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-4xl">📭</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Tidak ada ticket</h3>
          <p class="text-gray-500">
            {{ showAssignedOnly ? 'Anda belum memiliki ticket yang di-assign' : 'Belum ada ticket masuk untuk department ini' }}
          </p>
        </div>

        <!-- Ticket List -->
        <div v-else class="grid grid-cols-1 gap-4">
          <TicketCard
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            :ticket="ticket"
            :show-user="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>