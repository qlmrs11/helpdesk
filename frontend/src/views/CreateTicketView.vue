<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  title: '',
  description: '',
  category: '',
  priority: ''
})

function submitTicket() {
  if (!form.value.title || !form.value.description) {
    alert('Lengkapi semua kolom!')
    return
  }

  // nanti ganti ke API POST backend
  console.log('Ticket submitted:', form.value)

  alert('Ticket berhasil dibuat!')
  router.push('/view-tickets')
}
</script>

<template>
  <div class="create-ticket">
    <h1>Create Ticket</h1>
    <p class="subtitle">Isi form berikut untuk membuat tiket baru</p>

    <form @submit.prevent="submitTicket" class="form">
      <label>Title</label>
      <input v-model="form.title" type="text" placeholder="Masukkan judul tiket" required />

      <label>Description</label>
      <textarea v-model="form.description" placeholder="Deskripsikan masalah" required></textarea>

      <label>Category</label>
      <select v-model="form.category" required>
        <option disabled value="">Pilih kategori</option>
        <option>IT</option>
        <option>HR</option>
        <option>Finance</option>
      </select>

      <label>Priority</label>
      <select v-model="form.priority" required>
        <option disabled value="">Pilih prioritas</option>
        <option>Low</option>
        <option>Normal</option>
        <option>High</option>
      </select>

      <div class="actions">
        <button type="submit" class="btn primary">Submit</button>
        <button type="button" @click="router.push('/')" class="btn secondary">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.create-ticket { max-width: 600px; margin: auto; display: grid; gap: 16px; }
.subtitle { color: var(--color-text-soft); margin-bottom: 12px; }
.form { display: grid; gap: 10px; }
input, textarea, select {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
}
.actions { display: flex; gap: 10px; margin-top: 10px; }
.btn { padding: 8px 16px; border-radius: 8px; cursor: pointer; border: none; font-weight: 500; }
.btn.primary { background: #2563eb; color: white; }
.btn.secondary { background: #f3f4f6; color: #111827; }
</style>
