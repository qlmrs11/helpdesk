<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <h1 class="brand">Web Hospital</h1>
    <nav class="nav">
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <main class="app-main">
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}
.brand { font-size: 1.25rem; margin: 0; }
.nav a {
  margin-left: 1rem;
  border-left: none;
}
.nav a.router-link-exact-active { color: var(--color-text); }
.app-main { margin-top: 1rem; }
</style>
