<template>
  <div class="create-ticket">
    <Navbar />

    <form @submit.prevent="submitTicket">
      <input
        v-model="form.title"
        type="text"
        placeholder="Judul Tiket"
        required
      />

      <textarea
        v-model="form.description"
        placeholder="Deskripsi Masalah"
        required
      ></textarea>

      <select v-model="form.category" required>
        <option disabled value="">Pilih Kategori Layanan</option>
        <option>IT Support</option>
        <option>HR/Kepegawaian</option>
      </select>

      <select v-model="form.priority" required>
        <option disabled value="">Pilih Prioritas</option>
        <option>Rendah</option>
        <option>Sedang</option>
        <option>Tinggi</option>
      </select>

      <div class="buttons">
        <button type="submit" class="btn kirim">Kirim Tiket</button>
        <button type="button" class="btn batal" @click="resetForm">
          Batal
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '../components/navbar.vue'

const form = ref({
  title: '',
  description: '',
  category: '',
  priority: '',
})

const submitTicket = () => {
  if (
    !form.value.title ||
    !form.value.description ||
    !form.value.category ||
    !form.value.priority
  ) {
    alert('Harap lengkapi semua field terlebih dahulu!')
    return
  }

  alert(`Tiket "${form.value.title}" berhasil dikirim!`)
  resetForm()
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    category: '',
    priority: '',
  }
}
</script>

<style scoped>
.create-ticket {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h2 {
  margin-bottom: 1.5rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input,
textarea,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
textarea {
  resize: none;
  min-height: 100px;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}
.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: 0.2s;
}
.kirim {
  background: #0056b3;
  color: white;
}
.kirim:hover {
  background: #003f80;
}
.batal {
  background: #ccc;
  color: #333;
}
.batal:hover {
  background: #aaa;
}
</style>
