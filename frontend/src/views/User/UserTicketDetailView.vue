<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { useTickets } from '@/composables/useTickets'

const route = useRoute()
const router = useRouter()
const { byId, updateTicket } = useTickets()

const id = computed(() => String(route.params.id ?? ''))
const ticket = computed(() => byId(id.value))

const canConfirm = computed(
  () => ticket.value && ticket.value.status === 'Awaiting User Confirmation',
)

async function confirmFromUser() {
  if (!ticket.value) return
  try {
    await updateTicket(ticket.value.id, { status: 'Completed' })
    alert('Thank you! Your confirmation has been recorded.')
  } catch (error) {
    console.error('Failed to confirm ticket', error)
    alert('Failed to confirm ticket. Please try again.')
  }
}

function backToList() {
  router.push('/view-tickets')
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
  <section class="user-ticket-detail">
    <div class="card" v-if="ticket">
      <header class="header">
        <h1>Ticket detail</h1>
        <p class="subtitle">Review helper updates and comments</p>
      </header>

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
        <p class="full"><strong>Problem description:</strong> {{ ticket.description }}</p>
      </div>

      <section class="comments-section">
        <h2>Helper comments</h2>
        <p v-if="!ticket.comments.length" class="empty">No comments from helper yet.</p>
        <ul v-else class="comments">
          <li v-for="c in ticket.comments" :key="c.id">
            <span class="meta">{{ new Date(c.at).toLocaleString() }} — {{ c.author }}</span>
            <p class="text">{{ c.text }}</p>
          </li>
        </ul>
      </section>

      <div class="actions">
        <button class="btn secondary" @click="backToList">Back to tickets</button>
        <button
          v-if="canConfirm"
          class="btn primary"
          @click="confirmFromUser"
        >
          Done
        </button>
      </div>
    </div>

    <div v-else class="not-found">
      <p>Ticket not found.</p>
      <RouterLink to="/view-tickets" class="link">Back to All Tickets</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.user-ticket-detail {
  max-width: 900px;
  margin: 24px auto 32px;
  padding: 0 16px;
}

.card {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px 28px;
  background: var(--color-background-soft);
  box-shadow: 0 4px 16px rgba(0,0,0,.06);
}

.header h1 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-heading);
}

.subtitle {
  margin: 6px 0 16px;
  color: var(--color-text-soft);
  font-size: 0.95rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
  margin-bottom: 20px;
}

.info-grid p {
  margin: 0;
}

.info-grid .full {
  grid-column: 1 / -1;
}

.comments-section {
  margin-top: 12px;
}

.comments-section h2 {
  margin: 0 0 8px;
  font-size: 1.1rem;
  color: var(--color-heading);
}

.comments {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 10px;
}

.comments .meta {
  display: block;
  font-size: 0.82rem;
  color: var(--color-text-soft);
}

.comments .text {
  margin: 2px 0 0;
}

.empty {
  font-size: 0.9rem;
  color: var(--color-text-soft);
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 140px;
  height: 36px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.05s ease;
}

.btn.primary {
  background: linear-gradient(180deg, #3b5bdb 0%, #274690 100%);
  color: #ffffff;
  border-color: transparent;
}

.btn.primary:hover {
  background: linear-gradient(180deg, #4563e6 0%, #2c4fa3 100%);
}

.btn.secondary {
  background: linear-gradient(180deg, #ffffff 0%, #e2e8f0 100%);
  color: #1d4ed8;
  border-color: rgba(148, 163, 184, 0.6);
  box-shadow: 0 2px 6px rgba(148, 163, 184, 0.25);
}

.btn.secondary:hover {
  background: linear-gradient(180deg, #f8fafc 0%, #cbd5f5 100%);
}

.not-found {
  text-align: center;
  padding: 32px 16px;
  color: var(--color-text-soft);
}

.link {
  color: #1d4ed8;
  font-weight: 600;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
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
</style>
