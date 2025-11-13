<template>
  <div class="home">
    <div class="content">
      <h1>Helpdesk Internal IAE</h1>
      <p>Sistem pengajuan tiket untuk kebutuhan dan kendala karyawan.</p>

      <div v-if="!isLoggedIn" class="buttons">
        <RouterLink to="/login" class="btn">Login</RouterLink>
        <RouterLink to="/register" class="btn outline">Register</RouterLink>
      </div>

      <div v-else class="buttons">
        <RouterLink to="/create-ticket" class="btn">Buat Tiket Baru</RouterLink>
        <RouterLink to="/history-ticket" class="btn outline">Lihat Tiket Saya</RouterLink>
        <button class="btn logout" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('isLoggedIn')
  isLoggedIn.value = stored === 'true'
})

// tombol logout
const logout = () => {
  localStorage.setItem('isLoggedIn', 'false')
  isLoggedIn.value = false
  alert('Berhasil logout!')
}
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3a7bd5, #3a6073);
  color: white;
  text-align: center;
}
.content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.btn {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  color: #3a6073;
  background-color: white;
  transition: 0.2s;
}
.btn:hover {
  background: #e4e4e4;
}
.btn.outline {
  background-color: transparent;
  border: 2px solid white;
  color: white;
}
.logout {
  background: crimson;
  color: white;
  border: none;
}
</style>
