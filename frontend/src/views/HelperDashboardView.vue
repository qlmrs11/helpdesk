<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useTickets } from '@/composables/useTickets'

const t = useTickets()
const { notYetWorked, workingOn, awaiting, completed } = t
</script>

<template>
  <div class="dashboard">
    <section class="header">
      <h1>Helper Dashboard</h1>
      <p class="subtitle">Tickets grouped by status</p>
    </section>

    <section class="content">
      <!-- Tabel untuk menampilkan tiket -->
      <table class="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Judul</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <!-- Tampil kan Tiket yang Belum Dikerjakan -->
          <tr v-for="it in notYetWorked" :key="it.id">
            <td>#{{ it.id }}</td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`">{{ it.title }}</RouterLink>
            </td>
            <td>{{ it.category }}</td>
            <td>{{ it.priority }}</td>
            <td>
              <span class="badge new">Baru</span>
            </td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`" class="btn btn-detail">Lihat Detail</RouterLink>
            </td>
          </tr>

          <!-- Tampil kan Tiket yang Sedang Dikerjakan -->
          <tr v-for="it in workingOn" :key="it.id">
            <td>#{{ it.id }}</td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`">{{ it.title }}</RouterLink>
            </td>
            <td>{{ it.category }}</td>
            <td>{{ it.priority }}</td>
            <td>
              <span class="badge in-progress">Sedang Ditangani</span>
            </td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`" class="btn btn-detail">Lihat Detail</RouterLink>
            </td>
          </tr>

          <!-- Tampil kan Tiket yang Menunggu Konfirmasi Pengguna -->
          <tr v-for="it in awaiting" :key="it.id">
            <td>#{{ it.id }}</td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`">{{ it.title }}</RouterLink>
            </td>
            <td>{{ it.category }}</td>
            <td>{{ it.priority }}</td>
            <td>
              <span class="badge awaiting">Menunggu Konfirmasi</span>
            </td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`" class="btn btn-detail">Lihat Detail</RouterLink>
            </td>
          </tr>

          <!-- Tampil kan Tiket yang Sudah Selesai -->
          <tr v-for="it in completed" :key="it.id">
            <td>#{{ it.id }}</td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`">{{ it.title }}</RouterLink>
            </td>
            <td>{{ it.category }}</td>
            <td>{{ it.priority }}</td>
            <td>
              <span class="badge completed">Selesai</span>
            </td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`" class="btn btn-detail">Lihat Detail</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
/* Styling untuk tabel */
.ticket-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.ticket-table th, .ticket-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.ticket-table th {
  background-color: #f4f4f4;
}

.badge {
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
}

.new {
  background-color: #f39c12;
}

.in-progress {
  background-color: #3498db;
}

.awaiting {
  background-color: #95a5a6;
}

.completed {
  background-color: #2ecc71;
}

.btn {
  background-color: #2980b9;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 5px;
}

.btn-detail:hover {
  background-color: #1c5983;
}

</style>
