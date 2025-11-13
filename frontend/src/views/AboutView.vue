<template>
  <section class="about">
    <div class="hero">
      <h1>About InDesk (Internal Helpdesk)</h1>
      <p class="subtitle">An internal platform to manage employee support requests to IT Support and Human Resource
        in a structured, transparent, and efficient way.</p>
    </div>

    <div class="grid">
      <div class="card">
        <h3>Mission</h3>
        <p>Document every employee issue/request and enable IT/HR teams to handle, monitor status, and communicate effectively.</p>
      </div>
      <div class="card">
        <h3>Technology</h3>
        <p>Built with Vue 3 + Vite for a fast, modern development experience.</p>
      </div>
      <div class="card">
        <h3>Features</h3>
        <ul>
          <li>Ticket management (User & Helper)</li>
          <li>Comments and status history</li>
          <li>Role-based dashboards (User/Helper)</li>
          <li>Reports for Helpers (status filters)</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about { display: grid; gap: 24px; }
.hero h1 { margin: 0; font-size: 2rem; }
.hero .subtitle { color: var(--color-text-soft); margin-top: 6px; }

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.card {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;
  background: var(--color-background);
}
.card h3 { margin-top: 0; }
.card ul { margin: 0; padding-left: 1.1rem; }

@media (max-width: 1024px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
