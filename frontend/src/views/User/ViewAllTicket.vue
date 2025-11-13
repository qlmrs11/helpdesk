<script setup lang="ts">
import { useTickets } from '@/composables/useTickets'

const { all } = useTickets()
</script>

<template>
  <div class="view-tickets">
    <section class="header">
      <h1>All Tickets</h1>
      <p class="subtitle">Monitor ticket progress and current status</p>
    </section>

    <section class="content">
      <table class="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in all" :key="t.id">
            <td>#{{ t.id }}</td>
            <td>{{ t.title }}</td>
            <td>{{ t.category }}</td>
            <td>{{ t.priority }}</td>
            <td>
              <span
                :class="['badge', t.status.split(' ').join('-').toLowerCase()]"
              >
                {{ t.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.view-tickets {
  max-width: var(--layout-card-max-width);
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
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
  color: #ffffff;
}

.badge.not-yet-worked {
  /* Original base: #dc2626 (red-600) */
  background: linear-gradient(180deg, #fca5a5 0%, #ef4444 100%);
}

.badge.working-on {
  /* Original base: #2563eb (blue-600) */
  background: linear-gradient(180deg, #93c5fd 0%, #3b82f6 100%);
}

.badge.awaiting-user-confirmation {
  /* Original base: #d97706 (amber-600) */
  background: linear-gradient(180deg, #fcd34d 0%, #f59e0b 100%);
}

.badge.completed {
  /* Original base: #16a34a (green-600) */
  background: linear-gradient(180deg, #86efac 0%, #22c55e 100%);
}
</style>
