// src/views/ticket/TicketDetailView.vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTicketStore } from '@/store/ticket.store';
import Navbar from '@/components/Navbar.vue';
import TicketInfo from './components/TicketInfo.vue';
import TicketActions from './components/TicketActions.vue';
import CommentSection from './components/CommentSection.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const route = useRoute();
const router = useRouter();
const ticketStore = useTicketStore();

const loading = ref(true);
const error = ref('');

const ticketId = parseInt(route.params.id as string);

onMounted(async () => {
  await fetchTicket();
});

async function fetchTicket() {
  loading.value = true;
  error.value = '';
  
  const result = await ticketStore.fetchTicketById(ticketId);
  
  if (!result.success) {
    error.value = result.message || 'Ticket tidak ditemukan';
  }
  
  loading.value = false;
}

function goBack() {
  router.push('/home');
}

async function handleTicketUpdated() {
  await fetchTicket();
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Dashboard
      </button>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-xl shadow-md p-12 text-center">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Ticket Tidak Ditemukan</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button
          @click="goBack"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Kembali ke Dashboard
        </button>
      </div>

      <!-- Content -->
      <div v-else-if="ticketStore.currentTicket" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column: Info + Actions -->
        <div class="lg:col-span-1 space-y-6">
          <TicketInfo :ticket="ticketStore.currentTicket" />
          <TicketActions 
            :ticket="ticketStore.currentTicket" 
            @updated="handleTicketUpdated"
          />
        </div>

        <!-- Right Column: Comments -->
        <div class="lg:col-span-2">
          <CommentSection :ticket-id="ticketId" />
        </div>
      </div>
    </div>
  </div>
</template>