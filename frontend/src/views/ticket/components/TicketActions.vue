<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTicketStore, type Ticket, type TicketStatus } from '@/store/ticket.store';
import { useAuthStore } from '@/store/auth.store';

interface Props {
  ticket: Ticket;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'updated'): void;
}>();

const ticketStore = useTicketStore();
const authStore = useAuthStore();

const loading = ref(false);
const showStatusMenu = ref(false);

const isUser = computed(() => authStore.user?.role === 'USER');
const isHelper = computed(() => authStore.user?.role === 'HELPER');
const isAssignedHelper = computed(() => {
  // FIX: pakai assignedToId
  return isHelper.value && props.ticket.assignedToId === authStore.user?.id;
});

const canAssign = computed(() => {
  // FIX: pakai assignedToId
  return isHelper.value && !props.ticket.assignedToId && props.ticket.status === 'PENDING';
});

const canUpdateStatus = computed(() => {
  return isAssignedHelper.value && props.ticket.status !== 'RESOLVED';
});

const canConfirmResolved = computed(() => {
  // FIX: User confirm di WAITING_USER
  return isUser.value && props.ticket.status === 'WAITING_USER';
});

// Status options berdasarkan status saat ini
const statusOptions = computed(() => {
  const options: { value: TicketStatus; label: string; color: string; icon: string }[] = [];
  
  // IN_PROGRESS -> DONE
  if (props.ticket.status === 'IN_PROGRESS') {
    options.push({ value: 'DONE', label: 'Done', color: 'green', icon: '✓' });
  }
  
  // DONE -> WAITING_USER atau rollback IN_PROGRESS
  if (props.ticket.status === 'DONE') {
    options.push({ value: 'WAITING_USER', label: 'Waiting User', color: 'orange', icon: '⏸' });
    options.push({ value: 'IN_PROGRESS', label: 'In Progress (Rollback)', color: 'blue', icon: '←' });
  }

  // WAITING_USER -> rollback IN_PROGRESS
  if (props.ticket.status === 'WAITING_USER') {
    options.push({ value: 'IN_PROGRESS', label: 'In Progress (Rollback)', color: 'blue', icon: '←' });
  }

  return options;
});

async function handleAssign() {
  if (!confirm('Assign ticket ini ke diri Anda?')) return;

  loading.value = true;
  const result = await ticketStore.assignTicket(props.ticket.id);
  
  if (result.success) {
    alert('Ticket berhasil di-assign');
    emit('updated');
  } else {
    alert('Error: ' + result.message);
  }
  
  loading.value = false;
}

async function handleUpdateStatus(status: TicketStatus) {
  loading.value = true;
  showStatusMenu.value = false;
  
  const result = await ticketStore.updateTicketStatus(props.ticket.id, status);
  
  if (result.success) {
    alert('Status berhasil diupdate');
    emit('updated');
  } else {
    alert('Error: ' + result.message);
  }
  
  loading.value = false;
}

async function handleConfirmResolved() {
  if (!confirm('Konfirmasi bahwa masalah sudah terselesaikan?')) return;

  loading.value = true;
  const result = await ticketStore.confirmResolved(props.ticket.id);
  
  if (result.success) {
    alert('Ticket berhasil di-resolve');
    emit('updated');
  } else {
    alert('Error: ' + result.message);
  }
  
  loading.value = false;
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      Actions
    </h3>

    <div class="space-y-3">
      <!-- HELPER: Assign Button -->
      <button
        v-if="canAssign"
        @click="handleAssign"
        :disabled="loading"
        class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Assign ke Saya</span>
      </button>

      <!-- HELPER: Update Status -->
      <div v-if="canUpdateStatus" class="relative">
        <button
          @click="showStatusMenu = !showStatusMenu"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Update Status</span>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="showStatusMenu && statusOptions.length > 0"
          class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10"
        >
          <button
            v-for="option in statusOptions"
            :key="option.value"
            @click="handleUpdateStatus(option.value)"
            class="w-full px-4 py-3 text-left hover:bg-gray-50 transition flex items-center gap-3 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-xl">{{ option.icon }}</span>
            <div>
              <p class="font-semibold text-gray-800">{{ option.label }}</p>
              <p class="text-xs text-gray-500">Update status ke {{ option.label }}</p>
            </div>
          </button>
        </div>
      </div>

      <!-- USER: Confirm Resolved -->
      <button
        v-if="canConfirmResolved"
        @click="handleConfirmResolved"
        :disabled="loading"
        class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Konfirmasi Selesai</span>
      </button>

      <!-- Info Text -->
      <div v-if="!canAssign && !canUpdateStatus && !canConfirmResolved" class="text-center py-4">
        <svg class="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm text-gray-500">
          <span v-if="ticket.status === 'RESOLVED'">Ticket sudah resolved</span>
          <span v-else-if="isHelper && !isAssignedHelper">Ticket di-assign ke helper lain</span>
          <span v-else-if="isUser && ticket.status !== 'WAITING_USER'">Menunggu helper menyelesaikan</span>
          <span v-else>Tidak ada action tersedia</span>
        </p>
      </div>
    </div>
  </div>
</template>