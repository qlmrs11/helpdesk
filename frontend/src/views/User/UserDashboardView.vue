<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="user">
    <div class="card">
      <h2 class="title">Welcome to InDesk</h2>
      <p class="subtitle">Manage your internal support tickets easily</p>

      <div class="actions">
        <RouterLink to="/ticket" class="btn primary">+ Create Ticket</RouterLink>
        <RouterLink to="/view-tickets" class="btn light">View All Tickets</RouterLink>
      </div>

      <div class="info">
        <p>
          You can create new tickets for IT or HR issues, and check the progress of your submitted tickets.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.user {
  position: relative;
  display: grid;
  place-items: start center;
  padding: 0 16px 32px;
}

.card {
  width: 100%;
  max-width: var(--layout-card-max-width);
  margin: 0 auto;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 28px 32px;
  background: var(--color-background-soft);
  box-shadow: 0 4px 24px rgba(0,0,0,.06);
}
.title { margin: 0; font-size: 2rem; font-weight: 600; line-height: 1.1; letter-spacing: -0.02em; color: var(--color-heading); }
.title::after { content: none; }
.subtitle { margin: 12px 0 16px; color: var(--color-text-soft); font-size: 1.02rem; line-height: 1.5; font-weight: 500; }

.actions { display: flex; gap: 12px; margin: 6px 0 14px; }
.btn { display: inline-flex; justify-content: center; padding: 8px 12px; border-radius: 12px; border: 1px solid var(--color-border); cursor: pointer; transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.05s ease; font-size: 0.95rem; text-decoration: none; color: var(--color-heading); background: var(--color-background); }
.btn.light { background: linear-gradient(180deg, #ffffff 0%, #e2e8f0 100%); border-color: rgba(148, 163, 184, 0.6); box-shadow: 0 2px 6px rgba(148, 163, 184, 0.25); color: #1d4ed8; font-weight: 600; }
.btn.light:hover { background: linear-gradient(180deg, #f8fafc 0%, #cbd5f5 100%); color: #1d4ed8; }
.btn.primary { background: linear-gradient(180deg, #3b5bdb 0%, #274690 100%); color: white; border-color: transparent; font-weight: 600; }
.btn.primary:hover { background: linear-gradient(180deg, #4563e6 0%, #2c4fa3 100%); }

.info { color: var(--color-text-soft); font-size: 0.95rem; }
</style>
