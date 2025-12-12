// src/views/dashboard/components/UserDashboard.vue
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTicketStore } from '@/store/ticket.store';
import TicketCard from '@/components/TicketCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const router = useRouter();
const ticketStore = useTicketStore();

const filterStatus = ref<string>('ALL');

const statusOptions = [
  { value: 'ALL', label: 'Semua Ticket', color: 'gray' },
  { value: 'PENDING', label: 'Pending', color: 'yellow' },
  { value: 'IN_PROGRESS', label: 'In Progress', color: 'blue' },
  { value: 'WAITING_USER', label: 'Waiting User', color: 'orange' },
  { value: 'DONE', label: 'Done', color: 'green' },
  { value: 'RESOLVED', label: 'Resolved', color: 'emerald' },
];

const filteredTickets = computed(() => {
  if (filterStatus.value === 'ALL') {
    return ticketStore.tickets;
  }
  return ticketStore.tickets.filter(t => t.status === filterStatus.value);
});

const ticketStats = computed(() => {
  const stats = {
    total: ticketStore.tickets.length,
    pending: 0,
    inProgress: 0,
    done: 0,
    resolved: 0,
  };

  ticketStore.tickets.forEach(ticket => {
    if (ticket.status === 'PENDING') stats.pending++;
    if (ticket.status === 'IN_PROGRESS') stats.inProgress++;
    if (ticket.status === 'DONE') stats.done++;
    if (ticket.status === 'RESOLVED') stats.resolved++;
  });

  return stats;
});

onMounted(() => {
  ticketStore.fetchUserTickets();
});

function goToCreateTicket() {
  router.push('/ticket/create');
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">Dashboard User</h1>
            <p class="text-blue-100">Kelola ticket helpdesk Anda</p>
          </div>
          <button
            @click="goToCreateTicket"
            class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-200 flex items-center gap-2 shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Buat Ticket Baru
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <!-- Total -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Total Ticket</p>
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

        <!-- Resolved -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Resolved</p>
              <p class="text-3xl font-bold text-green-600 mt-1">{{ ticketStats.resolved }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter & List -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <!-- Filter Tabs -->
        <div class="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <button
            v-for="option in statusOptions"
            :key="option.value"
            @click="filterStatus = option.value"
            :class="[
              'px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap',
              filterStatus === option.value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ option.label }}
            <span v-if="option.value === 'ALL'" class="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {{ ticketStats.total }}
            </span>
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
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Belum ada ticket</h3>
          <p class="text-gray-500 mb-6">Buat ticket pertama Anda untuk memulai</p>
          <button
            @click="goToCreateTicket"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Buat Ticket Sekarang
          </button>
        </div>

        <!-- Ticket List -->
        <div v-else class="grid grid-cols-1 gap-4">
          <TicketCard
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            :ticket="ticket"
            :show-helper="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>