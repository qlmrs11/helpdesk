<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header v-if="!route.meta.hideHeader" class="app-header">
    <h1 class="brand">Web Hospital</h1>
    <nav class="nav">
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </nav>
  </header>

  <main class="app-main">
    <div v-if="!route.meta.hideHeader" class="container">
      <RouterView />
    </div>
    <template v-else>
      <RouterView />
    </template>
  </main>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 1rem;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}
.brand { font-size: 1.1rem; margin: 0; font-weight: 700; }
.nav { display: inline-flex; gap: 1rem; align-items: center; }
.nav a { padding: 6px 8px; border-radius: 8px; }
.nav a.router-link-exact-active { background: var(--color-background-soft); color: var(--color-text); }
.app-main { padding: 1.25rem 0; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
</style>
