<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { useTickets, type TicketStatus } from '@/composables/useTickets'

const route = useRoute()
const router = useRouter()
const t = useTickets()

const id = computed(() => String(route.params.id ?? ''))
const ticket = computed(() => t.byId(id.value))

const localStatus = ref<TicketStatus | ''>('')
const newComment = ref('')

const init = () => {
  if (ticket.value) {
    localStatus.value = ticket.value.status
  }
}

init()

function saveStatus() {
  if (!ticket.value || !localStatus.value) return
  t.setStatus(ticket.value.id, localStatus.value)
  alert('Status updated')
}

function addComment() {
  if (!ticket.value || !newComment.value.trim()) return
  t.addComment(ticket.value.id, 'helper', newComment.value.trim())
  newComment.value = ''
}

function backToDashboard() {
  router.push('/helper')
}
</script>

<template>
  <div class="admin-detail">
    <section class="header">
      <h1>Ticket Detail</h1>
      <p class="subtitle">Manage ticket status and comments</p>
    </section>

    <div v-if="ticket" class="ticket-card">
      <div class="info-grid">
        <p><strong>ID:</strong> #{{ ticket.id }}</p>
        <p><strong>Title:</strong> {{ ticket.title }}</p>
        <p><strong>Category:</strong> {{ ticket.category }}</p>
        <p><strong>Priority:</strong> {{ ticket.priority }}</p>
        <p><strong>Description:</strong> {{ ticket.description }}</p> <!-- added -->
      </div>

      <div class="form-section">
        <label>Status</label>
        <select v-model="localStatus" class="input-select">
          <option value="Not Yet Worked">Not Yet Worked</option>
          <option value="Working on">Working on</option>
          <option value="Awaiting User Confirmation">Awaiting User Confirmation</option>
          <option value="Completed">Completed</option>
        </select>
        <div class="button-row">
          <button class="btn-primary" @click="saveStatus">Save Status</button>
          <button class="btn-secondary" @click="backToDashboard">Back</button>
        </div>
      </div>

      <div class="form-section">
        <label>Add Comment</label>
        <textarea v-model="newComment" class="input-textarea" rows="3" placeholder="Write a comment..."></textarea>
        <button class="btn-primary" @click="addComment">Add Comment</button>
      </div>

      <div class="form-section">
        <label>Comments</label>
        <ul class="comments">
          <li v-for="c in ticket.comments" :key="c.id">
            <span class="muted">{{ new Date(c.at).toLocaleString() }} — {{ c.author }}</span>
            <p>{{ c.text }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="not-found">
      <p>Ticket not found.</p>
      <RouterLink to="/helper" class="btn-secondary">Back to Dashboard</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.admin-detail {
  max-width: 800px;
  margin: 2rem auto;
  color: #1e293b;
  font-family: 'Inter', sans-serif;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 1.8rem;
  color: #0ea5e9;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: #64748b;
  font-size: 0.95rem;
}

.ticket-card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px #e2e8f0;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1.5rem;
  margin-bottom: 1.5rem;
}

.info-grid p strong {
  width: 120px;
  display: inline-block;
}

label {
  color: #334155;
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.input-select {
  width: 100%;
  background-color: #f1f5f9;
  color: #1e293b;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.5rem;
  transition: border 0.2s, background 0.2s;
}

.input-select:focus {
  outline: none;
  border-color: #0ea5e9;
  background-color: #e0f2fe;
}

.input-textarea {
  width: 100%;
  background-color: #f1f5f9;
  color: #1e293b;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.5rem;
}

.input-textarea:focus {
  outline: none;
  border-color: #0ea5e9;
  background-color: #e0f2fe;
}

.form-section {
  margin-bottom: 1.2rem;
}

.button-row {
  display: flex;
  gap: 12px;
  margin-top: 0.75rem;
}

.btn-primary {
  background-color: #0ea5e9;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background-color: #0284c7;
}

.btn-secondary {
  display: inline-block;
  background-color: #e2e8f0;
  color: #1e293b;
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background-color: #cbd5e1;
}

.comments {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 12px;
}

.comments .muted {
  color: #64748b;
  font-size: 0.85rem;
  display: block;
}

.comments p {
  margin: 2px 0 0;
  color: #1e293b;
}

.not-found {
  text-align: center;
  color: #64748b;
  margin-top: 3rem;
  display: grid;
  gap: 12px;
}
</style>
