// src/components/NotificationBell.vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '@/store/notification.store';
import NotificationItem from './NotificationItem.vue';

const router = useRouter();
const notificationStore = useNotificationStore();

const showDropdown = ref(false);

onMounted(() => {
  notificationStore.fetchUnreadCount();
});

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
  
  if (showDropdown.value && notificationStore.recentNotifications.length === 0) {
    notificationStore.fetchNotifications();
  }
}

function closeDropdown() {
  showDropdown.value = false;
}

function handleNotificationClick(notification: any) {
  // Mark as read
  if (!notification.isRead) {
    notificationStore.markAsRead(notification.id);
  }
  
  // Redirect ke ticket detail jika ada ticketId
  if (notification.ticketId) {
    router.push(`/ticket/${notification.ticketId}`);
  }
  
  closeDropdown();
}

function viewAllNotifications() {
  router.push('/notifications');
  closeDropdown();
}

async function markAllAsRead() {
  await notificationStore.markAllAsRead();
}

// Close dropdown saat klik di luar
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.notification-bell-container')) {
    closeDropdown();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="notification-bell-container relative">
    <!-- Bell Icon -->
    <button
      @click="toggleDropdown"
      class="relative p-2 rounded-lg hover:bg-gray-100 transition duration-200"
      :class="{ 'bg-gray-100': showDropdown }"
    >
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      
      <!-- Badge Unread Count -->
      <span
        v-if="notificationStore.unreadCount > 0"
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse"
      >
        {{ notificationStore.unreadCount > 9 ? '9+' : notificationStore.unreadCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="showDropdown"
        class="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h3 class="text-lg font-bold text-gray-800">Notifikasi</h3>
          <button
            v-if="notificationStore.unreadCount > 0"
            @click="markAllAsRead"
            class="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Tandai Semua Dibaca
          </button>
        </div>

        <!-- Notifications List -->
        <div class="max-h-96 overflow-y-auto">
          <!-- Loading -->
          <div v-if="notificationStore.loading" class="flex justify-center py-8">
            <div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>

          <!-- Empty State -->
          <div v-else-if="notificationStore.recentNotifications.length === 0" class="text-center py-12">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p class="text-gray-500 text-sm">Belum ada notifikasi</p>
          </div>

          <!-- Notification Items -->
          <div v-else>
            <NotificationItem
              v-for="notification in notificationStore.recentNotifications"
              :key="notification.id"
              :notification="notification"
              @click="handleNotificationClick(notification)"
            />
          </div>
        </div>

        <!-- Footer -->
        <div class="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            @click="viewAllNotifications"
            class="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Lihat Semua Notifikasi
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.notification-bell-container {
  display: inline-block;
}
</style>