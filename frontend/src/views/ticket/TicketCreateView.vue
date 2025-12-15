// src/views/ticket/TicketCreateView.vue
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTicketStore } from '@/store/ticket.store';
import Navbar from '@/components/Navbar.vue';

const router = useRouter();
const ticketStore = useTicketStore();

const form = ref({
  title: '',
  description: '',
  category: 'IT' as 'IT' | 'HR',
  priority: 'NORMAL' as 'LOW' | 'NORMAL' | 'HIGH',
});

const loading = ref(false);
const error = ref('');

async function handleSubmit() {
  if (!form.value.title || !form.value.description) {
    error.value = 'Judul dan deskripsi harus diisi';
    return;
  }

  loading.value = true;
  error.value = '';

  const result = await ticketStore.createTicket(form.value);

  if (result.success) {
    // Redirect ke detail ticket yang baru dibuat
    router.push(`/ticket/${result.data.id}`);
  } else {
    error.value = result.message || 'Gagal membuat ticket';
  }

  loading.value = false;
}

function goBack() {
  router.push('/home');
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Dashboard
        </button>
        <h1 class="text-3xl font-bold text-gray-800">Buat Ticket Baru</h1>
        <p class="text-gray-600 mt-2">Isi form di bawah untuk membuat permintaan bantuan</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <!-- Error Alert -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-6">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <span>{{ error }}</span>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Title -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Judul Ticket <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              maxlength="100"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
              placeholder="Contoh: Laptop tidak bisa connect ke WiFi"
            />
            <p class="text-xs text-gray-500 mt-1">{{ form.title.length }}/100 karakter</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.description"
              required
              rows="6"
              maxlength="500"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none resize-none"
              placeholder="Jelaskan masalah Anda secara detail..."
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">{{ form.description.length }}/500 karakter</p>
          </div>

          <!-- Category & Priority -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Category -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Kategori <span class="text-red-500">*</span>
              </label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  @click="form.category = 'IT'"
                  :class="[
                    'p-4 rounded-lg border-2 font-medium transition-all',
                    form.category === 'IT'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                  ]"
                >
                  <div class="text-2xl mb-2">💻</div>
                  <div>IT Support</div>
                </button>
                <button
                  type="button"
                  @click="form.category = 'HR'"
                  :class="[
                    'p-4 rounded-lg border-2 font-medium transition-all',
                    form.category === 'HR'
                      ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-md'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-purple-300'
                  ]"
                >
                  <div class="text-2xl mb-2">👥</div>
                  <div>HR Support</div>
                </button>
              </div>
            </div>

            <!-- Priority -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Prioritas <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <button
                  type="button"
                  @click="form.priority = 'LOW'"
                  :class="[
                    'w-full p-3 rounded-lg border-2 font-medium transition-all flex items-center justify-between',
                    form.priority === 'LOW'
                      ? 'border-green-600 bg-green-50 text-green-700 shadow-md'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-green-300'
                  ]"
                >
                  <span>🟢 Low</span>
                  <span class="text-xs">Tidak mendesak</span>
                </button>
                <button
                  type="button"
                  @click="form.priority = 'NORMAL'"
                  :class="[
                    'w-full p-3 rounded-lg border-2 font-medium transition-all flex items-center justify-between',
                    form.priority === 'NORMAL'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                  ]"
                >
                  <span>🔵 Normal</span>
                  <span class="text-xs">Standar</span>
                </button>
                <button
                  type="button"
                  @click="form.priority = 'HIGH'"
                  :class="[
                    'w-full p-3 rounded-lg border-2 font-medium transition-all flex items-center justify-between',
                    form.priority === 'HIGH'
                      ? 'border-red-600 bg-red-50 text-red-700 shadow-md'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-red-300'
                  ]"
                >
                  <span>🔴 High</span>
                  <span class="text-xs">Mendesak</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex gap-4 pt-4">
            <button
              type="button"
              @click="goBack"
              class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ loading ? 'Membuat...' : 'Buat Ticket' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>