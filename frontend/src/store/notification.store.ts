// src/store/notification.store.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from './auth.store';

export interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  message: string;
  ticketId: number | null;
  isRead: boolean;
  createdAt: string;
  ticket?: {
    id: number;
    title: string;
    status: string;
  };
}

export const useNotificationStore = defineStore('notification', () => {
  const authStore = useAuthStore();
  
  const notifications = ref<Notification[]>([]);
  const unreadCount = ref(0);
  const socket = ref<Socket | null>(null);
  const loading = ref(false);

  const API_URL = 'http://localhost:3000/api/notification';
  const SOCKET_URL = 'http://localhost:3000';

  const unreadNotifications = computed(() => {
    return notifications.value.filter(n => !n.isRead);
  });

  const recentNotifications = computed(() => {
    return notifications.value.slice(0, 5);
  });

  function connectSocket() {
    if (!socket.value && authStore.user) {
      socket.value = io(SOCKET_URL);
      
      socket.value.on('connect', () => {
        console.log('✅ Notification Socket connected:', socket.value?.id);
        
        // Register user untuk terima notifikasi
        if (authStore.user?.id) {
          socket.value?.emit('register_notification', authStore.user.id);
        }
      });

      socket.value.on('disconnect', () => {
        console.log('❌ Notification Socket disconnected');
      });

      // Listen new notification
      socket.value.on('new_notification', (data: Notification) => {
        console.log('🔔 New notification received:', data);
        
        // Tambah ke list
        notifications.value.unshift(data);
        
        // Update unread count
        if (!data.isRead) {
          unreadCount.value++;
        }

        // Show browser notification (optional)
        showBrowserNotification(data);
      });
    }
  }

  function disconnectSocket() {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  }

  async function fetchNotifications() {
    loading.value = true;
    try {
      const response = await axios.get(API_URL);
      if (response.data.status === 'success') {
        notifications.value = response.data.data;
      }
    } catch (error) {
      console.error('Fetch notifications error:', error);
    } finally {
      loading.value = false;
    }
  }

  async function fetchUnreadCount() {
    try {
      const response = await axios.get(`${API_URL}/unread-count`);
      if (response.data.status === 'success') {
        unreadCount.value = response.data.data.count;
      }
    } catch (error) {
      console.error('Fetch unread count error:', error);
    }
  }

  async function markAsRead(notificationId: number) {
    try {
      const response = await axios.patch(`${API_URL}/${notificationId}/read`);
      if (response.data.status === 'success') {
        // Update local state
        const notification = notifications.value.find(n => n.id === notificationId);
        if (notification && !notification.isRead) {
          notification.isRead = true;
          unreadCount.value = Math.max(0, unreadCount.value - 1);
        }
      }
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  }

  async function markAllAsRead() {
    try {
      const response = await axios.patch(`${API_URL}/read-all`);
      if (response.data.status === 'success') {
        // Update local state
        notifications.value.forEach(n => n.isRead = true);
        unreadCount.value = 0;
      }
    } catch (error) {
      console.error('Mark all as read error:', error);
    }
  }

  function showBrowserNotification(notification: Notification) {
    // Request permission jika belum
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: `notification-${notification.id}`
      });
    }
  }

  function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  function clearNotifications() {
    notifications.value = [];
    unreadCount.value = 0;
  }

  return {
    notifications,
    unreadCount,
    unreadNotifications,
    recentNotifications,
    loading,
    connectSocket,
    disconnectSocket,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    requestNotificationPermission,
    clearNotifications
  };
});