<script setup lang="ts">
import { computed } from 'vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import { useTickets } from '@/composables/useTickets'

const { all } = useTickets()

// Hitung total per status
const statusCounts = computed(() => {
  const counts = {
    'Not Yet Worked': 0,
    'Working on': 0,
    'Awaiting User Confirmation': 0,
    'Completed': 0,
  }
  all.value.forEach(ticket => {
    if (ticket.status in counts) counts[ticket.status as keyof typeof counts]++
  })
  return counts
})

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
  <section class="helper-dashboard">
    <h1>Helper Report</h1>
    <p class="subtitle">Summary of ticket progress</p>

    <!-- 🔹 Statistik -->
    <div class="stats">
      <StatCard title="New" :value="statusCounts['Not Yet Worked']" accent="#fbbf24" />
      <StatCard title="In Progress" :value="statusCounts['Working on']" accent="#3b82f6" />
      <StatCard title="Awaiting Confirmation" :value="statusCounts['Awaiting User Confirmation']" accent="#f87171" />
      <StatCard title="Completed" :value="statusCounts['Completed']" accent="#22c55e" />
    </div>

    <!-- 🔹 Laporan Tiket -->
    <h2 class="subheader">All Tickets</h2>
    <div class="table-wrap">
    <table class="detail-table">
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
        <tr v-for="ticket in all" :key="ticket.id">
          <td>#{{ ticket.id }}</td>
          <td>{{ ticket.title }}</td>
          <td>{{ ticket.category }}</td>
          <td>
            <span
              :class="['priority-badge', ticket.priority.toLowerCase()]"
            >
              {{ ticket.priority }}
            </span>
          </td>
          <td>
            <span
              :class="['badge', ticket.status.split(' ').join('-').toLowerCase()]"
            >
              {{ statusLabel(ticket.status) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </section>
</template>

<style scoped>
.helper-dashboard {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px 32px;
}

.subtitle {
  color: #64748b;
  margin-bottom: 1.5rem;
}

/* 🔹 Statistik */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 2rem;
}

/* 🔹 Tabel laporan tiket */
.detail-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.detail-table th,
.detail-table td {
  border: 1px solid #e2e8f0;
  padding: 10px 12px;
}

.detail-table th {
  background: linear-gradient(180deg, rgba(59,91,219,0.13) 0%, rgba(59,91,219,0.13) 100%);
  color: var(--color-heading);
  font-weight: 600;
}

.detail-table tr:nth-child(even) {
  background: #f8fafc;
}
/* Dark mode zebra: subtle gray (no pure black/white) */
:root[data-theme='dark'] .detail-table tr:nth-child(even) {
  background: var(--color-background-mute);
}
.subheader {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: var(--color-text-soft);
}

/* Bordered rounded container for table */
.table-wrap {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden; /* smooth rounded corners */
  background: var(--color-background);
}

/* Status badges consistent with other tables */
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
</style>

