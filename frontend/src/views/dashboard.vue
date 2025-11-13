<template>
  <div class="dashboard">
    <Navbar />
    <div class="content">
      <h2>Dashboard</h2>

      <div v-if="!isLoggedIn">
        <p>Silakan login untuk melanjutkan.</p>
        <RouterLink to="/login" class="btn">Login</RouterLink>
        <RouterLink to="/register" class="btn outline">Register</RouterLink>
      </div>

      <div v-else>
        <p>Halo, {{ username }}! Kamu sudah login.</p>
        <RouterLink to="/" class="btn">Kembali ke Home</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '../components/navbar.vue'

const isLoggedIn = ref(false)
const username = ref('User A')

// cek login dari localStorage
onMounted(() => {
  const stored = localStorage.getItem('isLoggedIn')
  isLoggedIn.value = stored === 'true'
})
</script>

<style scoped>
.dashboard {
  text-align: center;
  padding: 2rem;
}
.btn {
  background: #0056b3;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 8px;
  text-decoration: none;
}
.btn.outline {
  background: transparent;
  border: 2px solid #0056b3;
  color: #0056b3;
}
</style>
