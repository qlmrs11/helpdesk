<template>
  <section class="about">
    <div class="about-inner">
    <div class="hero">
      <h1>About InDesk (Internal Helpdesk)</h1>
      <p class="subtitle">An internal platform to manage employee support requests to IT Support and Human Resource
        in a structured, transparent, and efficient way.</p>
    </div>

    <div class="grid">
      <div class="card">
        <h3>System Overview</h3>
        <p>A lightweight platform for employees to submit IT/HR requests with clear, transparent tracking.</p>
      </div>

      <div class="card">
        <h3>Roles & Access Rights</h3>
        <ul>
          <li><strong>User</strong>: create tickets, track status, comment, confirm.</li>
          <li><strong>Helper</strong>: triage and resolve tickets; update status.</li>
        </ul>
      </div>

      <div class="card">
        <h3>Ticket Workflow</h3>
        <ol>
          <li>New → Not Yet Worked</li>
          <li>In progress → Working on</li>
          <li>Review → Awaiting User Confirmation</li>
          <li>Done → Completed</li>
        </ol>
      </div>
    </div>
    </div>
  </section>
</template>

<style scoped>
.about { display: grid; gap: 24px; }
.about-inner { max-width: 900px; margin: 0 auto; padding: 0 1rem; }
.hero { display: grid; gap: 12px; margin-bottom: 12px; }
.hero h1 { margin: 0; font-size: 2rem; }
.hero .subtitle { color: var(--color-text-soft); margin: 0; }

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.card {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 20px;
  background: var(--color-background);
}
.card h3 { margin: 0 0 8px; font-weight: 600; color: var(--color-heading); }
.card p { margin: 0; }
.card ul { margin: 0; padding-left: 1.1rem; }
.card ol { margin: 0; padding-left: 1.1rem; }
/* Consistent spacing between elements inside cards */
.card > * + * { margin-top: 8px; }

@media (max-width: 1024px) { .grid { grid-template-columns: 1fr; gap: 16px; } }
</style>
