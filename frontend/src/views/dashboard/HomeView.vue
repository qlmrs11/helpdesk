// src/views/dashboard/HomeView.vue
<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/store/auth.store';
import Navbar from '@/components/Navbar.vue';
import UserDashboard from './components/UserDashboard.vue';
import HelperDashboard from './components/HelperDashboard.vue';

const authStore = useAuthStore();

const isUser = computed(() => authStore.user?.role === 'USER');
const isHelper = computed(() => authStore.user?.role === 'HELPER');
</script>

<template>
  <div>
    <Navbar />
    
    <!-- User Dashboard -->
    <UserDashboard v-if="isUser" />
    
    <!-- Helper Dashboard -->
    <HelperDashboard v-else-if="isHelper" />
    
    <!-- Fallback -->
    <div v-else class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-4xl">⚠️</span>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Role tidak dikenali</h2>
        <p class="text-gray-600">Silakan login kembali</p>
      </div>
    </div>
  </div>
</template>