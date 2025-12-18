<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';

const router = useRouter();
const authStore = useAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');
const role = ref<'USER' | 'HELPER'>('USER');
const department = ref<'IT' | 'HR'>('IT');
const loading = ref(false);
const error = ref('');
const success = ref('');

async function handleRegister() {
  if (!name.value || !email.value || !password.value) {
    error.value = 'Semua field harus diisi';
    return;
  }

  loading.value = true;
  error.value = '';
  success.value = '';

  const data: any = {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value,
  };

  if (role.value === 'HELPER') {
    data.department = department.value;
  }

  const result = await authStore.register(data);
  
  if (result.success) {
    success.value = result.message || 'Register berhasil! Silakan login.';
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } else {
    error.value = result.message || 'Register gagal';
  }
  
  loading.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 flex items-center justify-center px-4 py-8">
    <div class="max-w-md w-full">
      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <!-- Header -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-full mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-800">Create Account</h1>
          <p class="text-gray-600 mt-2">Join Hospital Helpdesk</p>
        </div>

        <!-- Success Alert -->
        <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">{{ success }}</span>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">{{ error }}</span>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
            <input
              v-model="name"
              type="text"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="John Doe"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="nama@hospital.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="••••••••"
            />
          </div>

          <!-- Role -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="role = 'USER'"
                :class="[
                  'px-4 py-3 rounded-lg border-2 font-medium transition duration-200',
                  role === 'USER' 
                    ? 'border-green-600 bg-green-50 text-green-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-green-300'
                ]"
              >
                User
              </button>
              <button
                type="button"
                @click="role = 'HELPER'"
                :class="[
                  'px-4 py-3 rounded-lg border-2 font-medium transition duration-200',
                  role === 'HELPER' 
                    ? 'border-green-600 bg-green-50 text-green-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-green-300'
                ]"
              >
                Helper
              </button>
            </div>
          </div>

          <!-- Department (only for HELPER) -->
          <div v-if="role === 'HELPER'">
            <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="department = 'IT'"
                :class="[
                  'px-4 py-3 rounded-lg border-2 font-medium transition duration-200',
                  department === 'IT' 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                ]"
              >
                IT
              </button>
              <button
                type="button"
                @click="department = 'HR'"
                :class="[
                  'px-4 py-3 rounded-lg border-2 font-medium transition duration-200',
                  department === 'HR' 
                    ? 'border-purple-600 bg-purple-50 text-purple-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-purple-300'
                ]"
              >
                HR
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ loading ? 'Creating Account...' : 'Register' }}</span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="text-center pt-4 border-t border-gray-200">
          <p class="text-gray-600">
            Sudah punya akun?
            <router-link to="/login" class="text-green-600 hover:text-green-700 font-semibold ml-1">
              Login
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>