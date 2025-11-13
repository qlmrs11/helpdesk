<template>
  <div class="admin-dashboard">
    <Navbar />

    <h2>Dashboard Admin</h2>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Judul</th>
          <th>Dibuat Oleh</th>
          <th>Kategori</th>
          <th>Prioritas</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.title }}</td>
          <td>{{ ticket.createdBy }}</td>
          <td>{{ ticket.category }}</td>
          <td>{{ ticket.priority }}</td>

          <!-- Bagian status -->
          <td>
            <span
              class="status-badge"
              :class="{
                'status-baru': ticket.status === 'Baru',
                'status-ditangani': ticket.status === 'Sedang Ditangani',
                'status-selesai': ticket.status === 'Selesai'
              }"
            >
              {{ ticket.status }}
            </span>
          </td>

          <td>
            <router-link :to="`/admin-detail/${ticket.id}`" class="btn">Lihat Detail</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/navbar.vue'

const tickets = [
  {
    id: 1,
    title: 'Laptop Error Tidak Bisa Booting',
    createdBy: 'Nadira',
    category: 'IT Support',
    priority: 'Tinggi',
    status: 'Baru',
  },
  {
    id: 2,
    title: 'Permohonan Cuti Tahunan',
    createdBy: 'Bima',
    category: 'HR/Kepegawaian',
    priority: 'Sedang',
    status: 'Sedang Ditangani',
  },
  {
    id: 3,
    title: 'Permintaan Reset Password Email',
    createdBy: 'Rara',
    category: 'IT Support',
    priority: 'Rendah',
    status: 'Selesai',
  },
]
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  color: #000000; /* Semua teks jadi hitam */
}

h2 {
  text-align: center;
  color: #000000;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  color: #000000; /* teks tabel hitam */
}

th {
  background-color: #0056b3;
  color: white;
}

/* === STATUS BADGE === */
.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
  text-align: center;
  color: #000000;
}

.status-baru {
  background-color: #ffe082; /* kuning lembut */
}

.status-ditangani {
  background-color: #b0bec5; /* abu-abu tua */
  color: white;
}

.status-selesai {
  background-color: #64b5f6; /* biru lembut */
  color: white;
}

/* === TOMBOL === */
.btn {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.2s;
}

.btn:hover {
  background-color: #004a9f;
}
</style>
