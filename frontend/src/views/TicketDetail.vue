<template>
  <div class="container">
    <div class="card" v-if="ticket">
      <TicketDetailPanel :ticket="ticket">
        <div style="margin-top:12px">
          <div v-if="isHelper && ticket.assignedToId !== user.id">
            <button class="btn" @click="assign">Ambil Tiket</button>
          </div>
          <div style="margin-top:8px">
            <select v-model="status" class="input">
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="WAITING_USER">WAITING_USER</option>
              <option value="DONE">DONE</option>
            </select>
            <button class="btn" @click="updateStatus">Update Status</button>
          </div>
        </div>
      </TicketDetailPanel>

      <hr />

      <div>
        <h4>Komentar</h4>
        <CommentList :comments="comments"/>
        <CommentForm @send="onSendComment"/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TicketDetailPanel from "../components/ticket/TicketDetailPanel.vue";
import CommentList from "../components/comment/CommentList.vue";
import CommentForm from "../components/comment/CommentForm.vue";
import { getTicket, assignTicket, updateStatus } from "../api/ticket";
import { useAuthStore } from "../stores/auth";
import { useSocket } from "../composables/useSocket";

export default {
  components: { TicketDetailPanel, CommentList, CommentForm },
  setup(props){
    const auth = useAuthStore();
    const user = auth.user || {};
    const ticket = ref(null);
    const comments = ref([]);
    const status = ref("");
    const socket = useSocket();

    const id = window.location.pathname.split("/ticket/")[1];

    async function load(){
      const res = await getTicket(id);
      ticket.value = res.data;
      comments.value = res.data.comments || [];
      status.value = ticket.value.status;
      // join room
      socket.joinTicket(id);
      socket.onNewComment((c) => {
        if (String(c.ticketId) === String(id)) comments.value.push(c);
      });
    }

    async function assign(){
      await assignTicket(id);
      await load();
    }

    async function updateStatus(){
      await updateStatus(id, status.value);
      await load();
    }

    async function onSendComment(content){
      socket.sendComment({ ticketId: Number(id), userId: user.id, content });
    }

    onMounted(load);

    return { ticket, comments, assign, updateStatus, status, onSendComment, isHelper: user.role === "HELPER", user };
  }
}
</script>
