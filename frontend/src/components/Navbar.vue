<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const userName = computed(() => authStore.user?.name || 'User');
const userRole = computed(() => authStore.user?.role || 'USER');
const userDepartment = computed(() => authStore.user?.department);

const isHelper = computed(() => userRole.value === 'HELPER');

function handleLogout() {
  if (confirm('Yakin ingin logout?')) {
    authStore.logout();
  }
}
</script>

<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">Hospital Helpdesk</h1>
            <p class="text-xs text-gray-500">Ticket Management System</p>
          </div>
        </div>

        <!-- User Info & Logout -->
        <div class="flex items-center gap-4">
          <!-- User Badge -->
          <div class="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
            <div class="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span class="text-white font-semibold text-sm">
                {{ userName.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div class="text-left">
              <p class="text-sm font-semibold text-gray-800">{{ userName }}</p>
              <div class="flex items-center gap-2">
                <span 
                  :class="[
                    'text-xs font-medium px-2 py-0.5 rounded',
                    isHelper 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  ]"
                >
                  {{ userRole }}
                </span>
                <span 
                  v-if="userDepartment"
                  :class="[
                    'text-xs font-medium px-2 py-0.5 rounded',
                    userDepartment === 'IT' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  ]"
                >
                  {{ userDepartment }}
                </span>
              </div>
            </div>
          </div>

          <!-- Logout Button -->
          <button
            @click="handleLogout"
            class="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>