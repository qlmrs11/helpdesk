// src/views/notification/NotificationListView.vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '@/store/notification.store';
import Navbar from '@/components/Navbar.vue';
import NotificationItem from '@/components/NotificationItem.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const router = useRouter();
const notificationStore = useNotificationStore();

onMounted(() => {
  notificationStore.fetchNotifications();
});

function handleNotificationClick(notification: any) {
  if (!notification.isRead) {
    notificationStore.markAsRead(notification.id);
  }
  
  if (notification.ticketId) {
    router.push(`/ticket/${notification.ticketId}`);
  }
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
      <div class="mb-6">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>
        
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Semua Notifikasi</h1>
            <p class="text-gray-600 mt-1">
              {{ notificationStore.unreadCount }} notifikasi belum dibaca
            </p>
          </div>
          
          <button
            v-if="notificationStore.unreadCount > 0"
            @click="notificationStore.markAllAsRead()"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Tandai Semua Dibaca
          </button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <!-- Loading -->
        <div v-if="notificationStore.loading" class="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>

        <!-- Empty State -->
        <div v-else-if="notificationStore.notifications.length === 0" class="text-center py-16">
          <svg class="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Belum ada notifikasi</h3>
          <p class="text-gray-500">Notifikasi akan muncul di sini</p>
        </div>

        <!-- Notification Items -->
        <div v-else>
          <NotificationItem
            v-for="notification in notificationStore.notifications"
            :key="notification.id"
            :notification="notification"
            @click="handleNotificationClick(notification)"
          />
        </div>
      </div>
    </div>
  </div>
</template>