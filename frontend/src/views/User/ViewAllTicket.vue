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
  max-width: 950px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.header h1 {
  font-size: 1.8rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: #64748b;
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
  border: 1px solid #e2e8f0;
  padding: 10px 14px;
}

.ticket-table th {
  background: #0f172a;
  color: #f1f5f9;
}

.ticket-table tr:nth-child(even) {
  background: #f8fafc;
}

/* --- BADGE STATUS --- */
.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}

.badge.not-yet-worked {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

.badge.working-on {
  background: rgba(59, 130, 246, 0.12);
  color: #2563eb;
}

.badge.awaiting-user-confirmation {
  background: rgba(245, 158, 11, 0.12);
  color: #d97706;
}

.badge.completed {
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
}
</style>
