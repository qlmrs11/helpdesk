// src/store/comment.store.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

export interface Comment {
  id: number;
  text: string;
  ticketId: number;
  userId: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export const useCommentStore = defineStore('comment', () => {
  const comments = ref<Comment[]>([]);
  const socket = ref<Socket | null>(null);
  const loading = ref(false);

  const API_URL = 'http://localhost:3000/api/comment';
  const SOCKET_URL = 'http://localhost:3000';

  function connectSocket() {
    if (!socket.value) {
      socket.value = io(SOCKET_URL);
      
      socket.value.on('connect', () => {
        console.log('✅ Socket connected:', socket.value?.id);
      });

      socket.value.on('disconnect', () => {
        console.log('❌ Socket disconnected');
      });
    }
  }

  function disconnectSocket() {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  }

  function joinTicketRoom(ticketId: number) {
    if (socket.value) {
      socket.value.emit('join_ticket', ticketId);
      console.log(`🔗 Joined room: ticket_${ticketId}`);
    }
  }

  function leaveTicketRoom(ticketId: number) {
    if (socket.value) {
      socket.value.emit('leave_ticket', ticketId);
      console.log(`🚪 Left room: ticket_${ticketId}`);
    }
  }

  function listenNewComment(callback: (comment: Comment) => void) {
    if (socket.value) {
      socket.value.on('new_comment', (data: Comment) => {
        comments.value.push(data);
        callback(data);
      });
    }
  }

  function removeCommentListener() {
    if (socket.value) {
      socket.value.off('new_comment');
    }
  }

  async function fetchComments(ticketId: number) {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/${ticketId}`);
      if (response.data.status === 'success') {
        comments.value = response.data.data;
      }
    } catch (error) {
      console.error('Fetch comments error:', error);
    } finally {
      loading.value = false;
    }
  }

  async function sendComment(ticketId: number, text: string) {
    try {
      const response = await axios.post(API_URL, {
        ticketId,
        text,
      });

      if (response.data.status === 'success') {
        return { success: true, data: response.data.data };
      }
      return { success: false };
    } catch (error: any) {
      console.error('Send comment error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Gagal kirim komentar' 
      };
    }
  }

  function clearComments() {
    comments.value = [];
  }

  return {
    comments,
    socket,
    loading,
    connectSocket,
    disconnectSocket,
    joinTicketRoom,
    leaveTicketRoom,
    listenNewComment,
    removeCommentListener,
    fetchComments,
    sendComment,
    clearComments,
  };
});