// src/views/ticket/components/CommentSection.vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import { useCommentStore, type Comment } from '@/store/comment.store';
import { useAuthStore } from '@/store/auth.store';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

interface Props {
  ticketId: number;
}

const props = defineProps<Props>();

const commentStore = useCommentStore();
const authStore = useAuthStore();

const newComment = ref('');
const sending = ref(false);
const chatContainer = ref<HTMLElement | null>(null);

const currentUserId = computed(() => authStore.user?.id);

onMounted(async () => {
  // Connect socket
  commentStore.connectSocket();
  
  // Join room ticket ini
  commentStore.joinTicketRoom(props.ticketId);
  
  // Fetch comments existing
  await commentStore.fetchComments(props.ticketId);
  
  // Listen new comment dari socket
  commentStore.listenNewComment((comment: Comment) => {
    console.log('💬 New comment received:', comment);
    scrollToBottom();
  });
  
  // Scroll ke bawah pas pertama load
  scrollToBottom();
});

onUnmounted(() => {
  // Leave room
  commentStore.leaveTicketRoom(props.ticketId);
  
  // Remove listener
  commentStore.removeCommentListener();
  
  // Clear comments
  commentStore.clearComments();
  
  // Disconnect socket
  commentStore.disconnectSocket();
});

async function sendComment() {
  if (!newComment.value.trim()) return;

  sending.value = true;
  
  const result = await commentStore.sendComment(props.ticketId, newComment.value.trim());
  
  if (result.success) {
    newComment.value = '';
    await nextTick();
    scrollToBottom();
  }
  
  sending.value = false;
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Hari ini';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Kemarin';
  } else {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
}

function isMyMessage(comment: Comment) {
  return comment.userId === currentUserId.value;
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[600px]">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-lg">Diskusi Ticket</h3>
          <p class="text-xs text-blue-100">
            <span v-if="commentStore.socket?.connected" class="inline-flex items-center gap-1">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Realtime
            </span>
            <span v-else class="inline-flex items-center gap-1">
              <span class="w-2 h-2 bg-red-400 rounded-full"></span>
              Offline
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Chat Messages -->
    <div
      ref="chatContainer"
      class="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
    >
      <!-- Loading -->
      <div v-if="commentStore.loading" class="flex justify-center py-8">
        <LoadingSpinner />
      </div>

      <!-- Empty State -->
      <div v-else-if="commentStore.comments.length === 0" class="flex flex-col items-center justify-center h-full text-gray-400">
        <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p class="text-sm">Belum ada komentar</p>
        <p class="text-xs">Mulai diskusi dengan mengirim pesan</p>
      </div>

      <!-- Messages -->
      <div v-else>
        <div
          v-for="(comment, index) in commentStore.comments"
          :key="comment.id"
        >
          <!-- Date Divider -->
          <div
            v-if="index === 0 || formatDate(comment.createdAt) !== formatDate(commentStore.comments[index - 1].createdAt)"
            class="flex items-center justify-center my-4"
          >
            <span class="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
              {{ formatDate(comment.createdAt) }}
            </span>
          </div>

          <!-- Message Bubble -->
          <div
            :class="[
              'flex mb-4',
              isMyMessage(comment) ? 'justify-end' : 'justify-start'
            ]"
          >
            <div
              :class="[
                'max-w-xs lg:max-w-md',
                isMyMessage(comment) ? 'order-2' : 'order-1'
              ]"
            >
              <!-- User Info -->
              <div
                :class="[
                  'flex items-center gap-2 mb-1 text-xs',
                  isMyMessage(comment) ? 'justify-end' : 'justify-start'
                ]"
              >
                <span class="font-semibold text-gray-700">
                  {{ isMyMessage(comment) ? 'Anda' : comment.user.name }}
                </span>
                <span
                  :class="[
                    'px-2 py-0.5 rounded text-xs font-medium',
                    comment.user.role === 'HELPER'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  ]"
                >
                  {{ comment.user.role }}
                </span>
              </div>

              <!-- Message Content -->
              <div
                :class="[
                  'rounded-2xl px-4 py-3 shadow-sm',
                  isMyMessage(comment)
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none'
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                ]"
              >
                <p class="text-sm whitespace-pre-wrap break-words">{{ comment.content }}</p>
                <p
                  :class="[
                    'text-xs mt-1',
                    isMyMessage(comment) ? 'text-blue-100' : 'text-gray-500'
                  ]"
                >
                  {{ formatTime(comment.createdAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="bg-white border-t border-gray-200 p-4">
      <form @submit.prevent="sendComment" class="flex gap-3">
        <textarea
          v-model="newComment"
          :disabled="sending"
          rows="2"
          placeholder="Ketik pesan..."
          class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none resize-none disabled:bg-gray-100"
          @keydown.enter.exact.prevent="sendComment"
        ></textarea>
        <button
          type="submit"
          :disabled="sending || !newComment.trim()"
          class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <svg v-if="sending" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
      <p class="text-xs text-gray-500 mt-2">Tekan Enter untuk kirim</p>
    </div>
  </div>
</template>