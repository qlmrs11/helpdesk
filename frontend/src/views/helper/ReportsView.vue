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
</script>

<template>
  <section class="helper-dashboard">
    <h1>Helper Report</h1>
    <p class="subtitle">Summary of ticket progress</p>

    <!-- 🔹 Statistik -->
    <div class="stats">
      <StatCard title="Baru" :value="statusCounts['Not Yet Worked']" accent="#fbbf24" />
      <StatCard title="Sedang Ditangani" :value="statusCounts['Working on']" accent="#3b82f6" />
      <StatCard title="Menunggu Konfirmasi" :value="statusCounts['Awaiting User Confirmation']" accent="#f87171" />
      <StatCard title="Selesai" :value="statusCounts['Completed']" accent="#22c55e" />
    </div>

    <!-- 🔹 Laporan Tiket -->
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
.helper-dashboard {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
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
  background: #0f172a;
  color: #f8fafc;
}

.detail-table tr:nth-child(even) {
  background: #f8fafc;
}
.subheader {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #1e293b;
}
</style>
