<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/store/auth.store';
import { useNotificationStore } from '@/store/notification.store';

const authStore = useAuthStore();
const notificationStore = useNotificationStore();

onMounted(() => {
  // Jika user sudah login, connect notification socket
  if (authStore.isAuthenticated && authStore.user) {
    notificationStore.connectSocket();
    notificationStore.fetchUnreadCount();
    notificationStore.requestNotificationPermission();
  }
});

onUnmounted(() => {
  // Disconnect socket saat app unmount
  notificationStore.disconnectSocket();
});
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>