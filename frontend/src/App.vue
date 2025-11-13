<template>
  <!-- RouterView = menampilkan komponen sesuai route aktif -->
  <RouterView />
</template>

<script setup lang="ts">
</script>

<style>
/* Reset dasar biar tampilan antar browser konsisten */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Gaya umum aplikasi */
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f4f6f8;
  color: #000000; /* teks item default */
  line-height: 1.6;
}

/* Biar transisi antar halaman halus */
.page-enter-active, .page-leave-active {
  transition: opacity 0.3s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
}
</style>
