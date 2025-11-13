<script setup lang="ts">
import { computed } from 'vue'
import { useTickets } from '@/composables/useTickets'

// Ambil data tiket dari composable
const { all } = useTickets()

// Hitung total berdasarkan status (semua tetap di frontend)
const statusCounts = computed(() => {
  const counts = {
    'Not Yet Worked': 0,
    'Working on': 0,
    'Awaiting User Confirmation': 0,
    'Completed': 0,
  }

  all.value.forEach(ticket => {
    if (ticket.status in counts) {
      counts[ticket.status as keyof typeof counts]++
    }
  })

  return counts
})
</script>

<template>
  <section class="reports">
    <h1>Reports</h1>
    <p class="subtitle">Summary of helper ticket progress</p>

    <!-- 🔹 Ringkasan tiket -->
    <table class="summary-table">
      <thead>
        <tr>
          <th>Status</th>
          <th>Total Tickets</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Not Yet Worked</td>
          <td>{{ statusCounts['Not Yet Worked'] }}</td>
        </tr>
        <tr>
          <td>Working on</td>
          <td>{{ statusCounts['Working on'] }}</td>
        </tr>
        <tr>
          <td>Awaiting User Confirmation</td>
          <td>{{ statusCounts['Awaiting User Confirmation'] }}</td>
        </tr>
        <tr>
          <td>Completed</td>
          <td>{{ statusCounts['Completed'] }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 🔹 Daftar detail tiket -->
    <h2 class="subheader">All Tickets</h2>
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
          <td>{{ ticket.priority }}</td>
          <td>{{ ticket.status }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.reports {
  max-width: 950px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 0.25rem;
  color: #1e293b;
}

.subtitle {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.subheader {
  margin-top: 2rem;
  font-size: 1.3rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

/* 🔹 Tabel ringkasan */
.summary-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  text-align: left;
}

.summary-table th,
.summary-table td {
  border: 1px solid #e2e8f0;
  padding: 12px 14px;
}

.summary-table th {
  background: #38bdf8;
  color: #fff;
}

.summary-table tr:nth-child(even) {
  background: #f8fafc;
}

/* 🔹 Tabel detail tiket */
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
  background: #0f172a;
  color: #f8fafc;
}

.detail-table tr:nth-child(even) {
  background: #f8fafc;
}
</style>
