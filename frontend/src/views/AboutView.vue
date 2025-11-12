<template>
  <section class="about">
    <div class="hero">
      <h1>About Web Hospital</h1>
      <p class="subtitle">A lightweight dashboard and support portal for hospital operations.</p>
    </div>

    <div class="grid">
      <div class="card">
        <h3>Mission</h3>
        <p>Provide a clear overview of daily activities, upcoming appointments, and support tickets in one place.</p>
      </div>
      <div class="card">
        <h3>Technology</h3>
        <p>Built with Vue 3 and Vite for fast development and a smooth user experience.</p>
      </div>
      <div class="card">
        <h3>Features</h3>
        <ul>
          <li>Dashboard stats</li>
          <li>Appointments list</li>
          <li>Support tickets</li>
          <li>Authentication pages</li>
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
