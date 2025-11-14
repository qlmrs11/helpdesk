<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { useTickets, type TicketStatus } from '@/composables/useTickets'

const route = useRoute()
const router = useRouter()
const { byId, updateTicket, addComment } = useTickets()

const id = computed(() => String(route.params.id ?? ''))
const ticket = computed(() => byId(id.value))

const localStatus = ref<TicketStatus | ''>('')
const newComment = ref('')
const savingStatus = ref(false)
const postingComment = ref(false)

watch(
  ticket,
  current => {
    if (current) {
      localStatus.value = current.status
    }
  },
  { immediate: true }
)

async function saveStatus() {
  if (!ticket.value || !localStatus.value) return
  savingStatus.value = true
  try {
    await updateTicket(ticket.value.id, { status: localStatus.value })
    alert('Status updated')
  } catch (error) {
    console.error('Failed to update status', error)
    alert('Failed to update status. Please try again.')
  } finally {
    savingStatus.value = false
  }
}

async function submitComment() {
  if (!ticket.value || !newComment.value.trim()) return
  postingComment.value = true
  try {
    await addComment(ticket.value.id, { author: 'helper', text: newComment.value.trim() })
    newComment.value = ''
  } catch (error) {
    console.error('Failed to add comment', error)
    alert('Failed to add comment. Please try again.')
  } finally {
    postingComment.value = false
  }
}

function backToDashboard() {
  router.push('/helper')
}

function statusLabel(status: string) {
  switch (status) {
    case 'Working on':
      return '⏳ Working On'
    case 'Completed':
      return '✔️ Completed'
    case 'Awaiting User Confirmation':
      return '🔔 Awaiting User'
    case 'Not Yet Worked':
    default:
      return '🕓 Not Yet Worked'
  }
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
        <p>
          <strong>Priority:</strong>
          <span
            :class="['priority-badge', ticket.priority.toLowerCase()]"
          >
            {{ ticket.priority }}
          </span>
        </p>
        <p class="full">
          <strong>Status:</strong>
          <span
            :class="['status-badge', ticket.status.split(' ').join('-').toLowerCase()]"
          >
            {{ statusLabel(ticket.status) }}
          </span>
        </p>
        <p class="full"><strong>Description:</strong> {{ ticket.description }}</p> <!-- added -->
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
          <button class="btn-primary" :disabled="savingStatus" @click="saveStatus">Save Status</button>
          <button class="btn-secondary" @click="backToDashboard">Back</button>
        </div>
      </div>

      <div class="form-section">
        <label>Add Comment</label>
        <textarea v-model="newComment" class="input-textarea" rows="3" placeholder="Write a comment..."></textarea>
        <button class="btn-primary" :disabled="postingComment" @click="submitComment">Add Comment</button>
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
  color: var(--color-text);
  font-family: 'Inter', sans-serif;
  padding: 2rem;
  background: var(--color-background-soft);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 1.8rem;
  color: var(--color-heading);
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--color-text-soft);
  font-size: 0.95rem;
}

.ticket-card {
  background-color: var(--color-background);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px var(--color-border);
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
  color: var(--color-heading);
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.input-select {
  width: 100%;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.5rem;
  transition: border 0.2s, background 0.2s;
}

.input-select:focus {
  outline: none;
  border-color: var(--color-border-hover);
  background-color: var(--color-background);
}

.input-textarea {
  width: 100%;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.5rem;
  font-family: inherit;
  font-size: 0.95rem;
}

.input-textarea:focus {
  outline: none;
  border-color: var(--color-border-hover);
  background-color: var(--color-background);
}

.form-section {
  margin-bottom: 1.2rem;
}

.button-row {
  display: flex;
  gap: 12px;
  margin-top: 0.75rem;
}

/* Match helper dashboard primary (View details) */
.btn-primary {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 110px;
  height: 32px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: linear-gradient(180deg, #3b5bdb 0%, #274690 100%);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.05s ease;
}

.btn-primary:hover {
  background: linear-gradient(180deg, #4563e6 0%, #2c4fa3 100%);
}

/* Match helper dashboard light button (cancel/delete style) */
.btn-secondary {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 110px;
  height: 32px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.6);
  background: linear-gradient(180deg, #ffffff 0%, #e2e8f0 100%);
  box-shadow: 0 2px 6px rgba(148, 163, 184, 0.25);
  color: #1d4ed8;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.05s ease;
}

.btn-secondary:hover {
  background: linear-gradient(180deg, #f8fafc 0%, #cbd5f5 100%);
  color: #1d4ed8;
}

.comments {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 12px;
}

.comments .muted {
  color: var(--color-text-soft);
  font-size: 0.85rem;
  display: block;
}

.comments p {
  margin: 2px 0 0;
  color: var(--color-text);
}

/* Status badge in detail view: match table styles */
.status-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 160px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge.not-yet-worked {
  background-color: #f3f4f6; /* soft gray */
  color: #4b5563;
  border: 1px solid #d1d5db;
}

.status-badge.working-on {
  background-color: #eff6ff; /* light blue */
  color: #1d4ed8;
  border: 1px solid #60a5fa;
}

.status-badge.awaiting-user-confirmation {
  background-color: #f5f3ff; /* light purple */
  color: #6d28d9;
  border: 1px solid #a855f7;
}

.status-badge.completed {
  background-color: #dcfce7; /* green pastel */
  color: #15803d;
  border: 1px solid #4ade80;
}

/* Priority badges: red (High), green (Normal), yellow (Low) */
.priority-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 140px;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #ffffff;
  margin-left: 4px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.2);
}

.priority-badge.high {
  background: linear-gradient(180deg, #e66a74 0%, #9b2c37 100%);
}

.priority-badge.normal {
  background: linear-gradient(180deg, #f0cf80 0%, #b69139 100%);
}

.priority-badge.low {
  background: linear-gradient(180deg, #63c267 0%, #2e7d32 100%);
}

.not-found {
  text-align: center;
  color: var(--color-text-soft);
  margin-top: 3rem;
  display: grid;
  gap: 12px;
}
</style>
