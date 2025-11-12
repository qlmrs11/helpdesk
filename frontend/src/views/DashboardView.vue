<script setup lang="ts">
import StatCard from '@/components/dashboard/StatCard.vue'
</script>

<template>
  <div class="dashboard">
    <section class="header">
      <h1>Dashboard</h1>
      <p class="subtitle">Overview of today's hospital activity</p>
    </section>

    <section class="stats">
      <StatCard title="Patients" :value="128" subtitle="+8 today" accent="blue" />
      <StatCard title="Appointments" :value="42" subtitle="12 upcoming" accent="green" />
      <StatCard title="Doctors On Duty" :value="18" subtitle="3 departments" accent="orange" />
      <StatCard title="Tickets Open" :value="5" subtitle="Need attention" accent="red" />
    </section>

    <section class="content">
      <div class="panel">
        <h3>Upcoming Appointments</h3>
        <ul class="list">
          <li>
            <span>09:00 — John Doe</span>
            <span class="muted">Cardiology</span>
          </li>
          <li>
            <span>10:30 — Jane Smith</span>
            <span class="muted">Pediatrics</span>
          </li>
          <li>
            <span>13:15 — Michael Chen</span>
            <span class="muted">Radiology</span>
          </li>
        </ul>
      </div>
      <div class="panel">
        <h3>Recent Support Tickets</h3>
        <ul class="list">
          <li>
            <span>#254 Medication query</span>
            <span class="badge warn">Open</span>
          </li>
          <li>
            <span>#253 Room cleanliness</span>
            <span class="badge ok">Resolved</span>
          </li>
          <li>
            <span>#252 Visitor pass</span>
            <span class="badge info">Pending</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  display: grid;
  gap: 20px;
}
.header h1 {
  font-size: 1.8rem;
  margin: 0;
}
.subtitle { color: var(--color-text-soft); margin-top: 4px; }

.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 16px;
}
.panel {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;
  background: var(--color-background);
}
.panel h3 { margin-top: 0; margin-bottom: 12px; }
.list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.list li { display: flex; align-items: center; justify-content: space-between; }
.muted { color: var(--color-text-soft); }
.badge { font-size: .75rem; padding: 2px 8px; border-radius: 999px; border: 1px solid var(--color-border); }
.badge.ok { background: rgba(34,197,94,.12); color: #16a34a; }
.badge.warn { background: rgba(239,68,68,.12); color: #dc2626; }
.badge.info { background: rgba(59,130,246,.12); color: #2563eb; }

@media (max-width: 1024px) {
  .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .content { grid-template-columns: 1fr; }
}
</style>
