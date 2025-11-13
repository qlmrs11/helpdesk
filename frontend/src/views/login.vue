<template>
  <div class="login-page">
    <h2>Halaman Login</h2>
    <p>(Simulasi) Tekan tombol di bawah untuk login</p>
    <button class="btn" @click="loginUser">Login Sekarang</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const loginUser = () => {
  localStorage.setItem('isLoggedIn', 'true')
  alert('Login berhasil! Sekarang tombol di Home berubah.')
  router.push('/')
}
</script>

<style scoped>
.login-page {
  text-align: center;
  margin-top: 100px;
}
.btn {
  background: #0056b3;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
