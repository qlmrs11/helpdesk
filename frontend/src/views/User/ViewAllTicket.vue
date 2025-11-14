<script setup lang="ts">
import { useTickets } from '@/composables/useTickets'

const { all, removeTicket } = useTickets()

async function onDelete(id: string) {
  if (!confirm('Are you sure you want to delete this ticket?')) return
  try {
    await removeTicket(id)
  } catch (error) {
    console.error('Failed to delete ticket', error)
    alert('Failed to delete ticket. Please try again.')
  }
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
  <div class="view-tickets">
    <section class="header">
      <h1>All Tickets</h1>
      <p class="subtitle">Monitor ticket progress and current status</p>
    </section>

    <section class="content">
      <div class="table-wrap">
      <table class="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in all" :key="t.id">
            <td>#{{ t.id }}</td>
            <td>{{ t.title }}</td>
            <td>{{ t.category }}</td>
            <td>
              <span
                :class="['priority-badge', t.priority.toLowerCase()]"
              >
                {{ t.priority }}
              </span>
            </td>
            <td>
              <span
                :class="['badge', t.status.split(' ').join('-').toLowerCase()]"
              >
                {{ statusLabel(t.status) }}
              </span>
            </td>
            <td>
              <RouterLink :to="`/user/ticket/${t.id}`" class="btn primary">View details</RouterLink>
              <button class="btn danger" @click="onDelete(t.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.view-tickets {
  max-width: 1100px;
  margin: 24px auto 32px;
  padding: 28px 32px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
  color: var(--color-text);
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.header h1 {
  font-size: 1.8rem;
  margin-bottom: 0.25rem;
  color: var(--color-heading);
}

.subtitle {
  color: var(--color-text-soft);
  font-size: 0.95rem;
}

/* --- TABLE --- */
.ticket-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.ticket-table th,
.ticket-table td {
  border: 1px solid var(--color-border);
  padding: 10px 14px;
}

.ticket-table th {
  background: linear-gradient(180deg, rgba(59,91,219,0.13) 0%, rgba(59,91,219,0.13) 100%);
  color: var(--color-heading);
  font-weight: 600;
}

.ticket-table tr:nth-child(even) {
  background: #f8fafc;
}

/* Dark mode zebra: match helper view */
:root[data-theme='dark'] .ticket-table tr:nth-child(even) {
  background: var(--color-background-mute);
}

/* --- BADGE STATUS --- */
.badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 160px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}

.badge.not-yet-worked {
  background-color: #f3f4f6; /* soft gray */
  color: #4b5563;
  border: 1px solid #d1d5db;
}

.badge.working-on {
  background-color: #eff6ff; /* light blue */
  color: #1d4ed8;
  border: 1px solid #60a5fa; /* blue outline */
}

.badge.awaiting-user-confirmation {
  background-color: #f5f3ff; /* light purple */
  color: #6d28d9;
  border: 1px solid #a855f7;
}

.badge.completed {
  background-color: #dcfce7; /* green pastel */
  color: #15803d;
  border: 1px solid #4ade80;
}

/* Priority badges: red (High), green (Normal), yellow (Low) */
.priority-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 160px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
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

/* Match helper dashboard action buttons */
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 110px;
  height: 32px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.05s ease;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
}

.btn.primary {
  background: linear-gradient(180deg, #3b5bdb 0%, #274690 100%);
  color: white;
  border-color: transparent;
}

.btn.primary:hover {
  background: linear-gradient(180deg, #4563e6 0%, #2c4fa3 100%);
}

.btn.danger {
  color: #1d4ed8;
  font-weight: 600;
  background: linear-gradient(180deg, #ffffff 0%, #e2e8f0 100%);
  border-color: rgba(148, 163, 184, 0.6);
  box-shadow: 0 2px 6px rgba(148, 163, 184, 0.25);
  margin-left: 6px;
}

.btn.danger:hover {
  background: linear-gradient(180deg, #f8fafc 0%, #cbd5f5 100%);
}

/* Bordered rounded container for table, matching helper */
.table-wrap {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-background);
}
</style>
