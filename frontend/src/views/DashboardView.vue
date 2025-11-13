<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="user-dashboard">
    <section class="header">
      <h1>Welcome to InDesk</h1>
      <p class="subtitle">Manage your internal support tickets easily</p>
    </section>

    <section class="actions">
      <!-- Tombol Buat Tiket -->
      <RouterLink to="/ticket">
        <button class="btn create">+ Create Ticket</button>
      </RouterLink>

      <!-- Tombol Lihat Semua Tiket -->
      <RouterLink to="/view-tickets">
        <button class="btn view">View All Tickets</button>
      </RouterLink>
    </section>

    <section class="info">
      <p>
        You can create new tickets for IT or HR issues, and check the progress of your submitted tickets.
      </p>
    </section>
  </div>
</template>

<style scoped>
.user-dashboard {
  display: grid;
  gap: 24px;
  padding: 24px;
}

.header h1 {
  font-size: 1.8rem;
  margin: 0;
}

.subtitle {
  color: var(--color-text-soft);
  margin-top: 4px;
}

.actions {
  display: flex;
  gap: 16px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn.create {
  background-color: #22c55e;
  color: white;
}

.btn.create:hover {
  background-color: #16a34a;
}

.btn.view {
  background-color: #3b82f6;
  color: white;
}

.btn.view:hover {
  background-color: #2563eb;
}

.info {
  color: var(--color-text-soft);
  font-size: 0.95rem;
}
</style>
