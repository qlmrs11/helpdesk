<template>
  <div class="admin-detail">
    <Navbar />

    <h2>Detail Tiket</h2>

    <div v-if="ticket">
      <p><strong>ID:</strong> {{ ticket.id }}</p>
      <p><strong>Judul:</strong> {{ ticket.title }}</p>
      <p><strong>Dibuat Oleh:</strong> {{ ticket.createdBy }}</p>
      <p><strong>Kategori:</strong> {{ ticket.category }}</p>
      <p><strong>Prioritas:</strong> {{ ticket.priority }}</p>
      <p><strong>Dibuat Pada:</strong> {{ ticket.createdAt }}</p>

      <div class="form-section">
        <label>Status:</label>
        <select v-model="ticket.status">
          <option>Baru</option>
          <option>Sedang Ditangani</option>
          <option>Selesai</option>
        </select>
      </div>

      <div class="form-section">
        <label>Tugaskan ke:</label>
        <select v-model="ticket.assignedTo">
          <option disabled value="">Pilih Penanggung Jawab</option>
          <option>Nadira (HR)</option>
          <option>Bima (IT Support)</option>
          <option>Rara (HR)</option>
        </select>
      </div>

      <div class="buttons">
        <button @click="updateTicket">Simpan Perubahan</button>
        <router-link to="/admin-dashboard" class="btn-back">Kembali</router-link>
      </div>
    </div>

    <div v-else>
      <p>Tiket tidak ditemukan.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/navbar.vue'

const route = useRoute()
const ticket = ref<any>(null)

const dummyTickets = [
  {
    id: 1,
    title: 'Laptop Error Tidak Bisa Booting',
    createdBy: 'Nadira',
    category: 'IT Support',
    priority: 'Tinggi',
    status: 'Baru',
    assignedTo: '',
    createdAt: '2025-11-12',
  },
  {
    id: 2,
    title: 'Permohonan Cuti Tahunan',
    createdBy: 'Bima',
    category: 'HR/Kepegawaian',
    priority: 'Sedang',
    status: 'Sedang Ditangani',
    assignedTo: 'Rara (HR)',
    createdAt: '2025-11-10',
  },
]

ticket.value = dummyTickets.find((t) => t.id === parseInt(route.params.id as string))

const updateTicket = () => {
  alert(`Tiket ID ${ticket.value.id} berhasil diperbarui!
Status: ${ticket.value.status}
Ditugaskan ke: ${ticket.value.assignedTo || 'Belum Ditugaskan'}`)
}
</script>

<style scoped>
.admin-detail {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #000000; /* Semua teks jadi hitam */
}

h2 {
  margin-bottom: 1rem;
  text-align: center;
  color: #000000; /* Judul hitam juga */
}

p {
  margin: 0.5rem 0;
  color: #000000; /* Teks paragraf hitam */
}

label {
  color: #000000; /* Label form juga hitam */
  font-weight: bold;
}

select {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: #000000;
  background-color: #f9f9f9;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background-color: #0056b3;
}

.btn-back {
  background-color: #ccc;
  color: #333;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 6px;
  transition: 0.2s;
}

.btn-back:hover {
  background-color: #aaa;
}
</style>
