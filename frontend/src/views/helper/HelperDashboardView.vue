<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useTickets } from '@/composables/useTickets'

const { notYetWorked, workingOn, awaiting, completed, removeTicket } = useTickets()

async function onDelete(id: string) {
  if (!confirm('Are you sure you want to delete this ticket?')) return
  try {
    await removeTicket(id)
  } catch (error) {
    console.error('Failed to delete ticket', error)
    alert('Failed to delete ticket. Please try again.')
  }
}
</script>

<template>
  <section class="helper">
    <div class="card">
      <h2 class="title">Helper Dashboard</h2>
      <p class="subtitle">Tickets grouped by status</p>

      <div class="table-wrap">
      <table class="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="it in notYetWorked" :key="it.id">
            <td>#{{ it.id }}</td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`">{{ it.title }}</RouterLink>
            </td>
            <td>{{ it.category }}</td>
            <td>
              <span
                :class="['priority-badge', it.priority.toLowerCase()]"
              >
                {{ it.priority }}
              </span>
            </td>
            <td>
              <span class="badge not-yet-worked">🕓 Not Yet Worked</span>
            </td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`" class="btn primary">View details</RouterLink>
              <button class="btn danger" @click="onDelete(it.id)">Delete</button>
            </td>
          </tr>

          <tr v-for="it in workingOn" :key="it.id">
            <td>#{{ it.id }}</td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`">{{ it.title }}</RouterLink>
            </td>
            <td>{{ it.category }}</td>
            <td>
              <span
                :class="['priority-badge', it.priority.toLowerCase()]"
              >
                {{ it.priority }}
              </span>
            </td>
            <td>
              <span class="badge working-on">⏳ Working On</span>
            </td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`" class="btn primary">View details</RouterLink>
              <button class="btn danger" @click="onDelete(it.id)">Delete</button>
            </td>
          </tr>

          <tr v-for="it in awaiting" :key="it.id">
            <td>#{{ it.id }}</td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`">{{ it.title }}</RouterLink>
            </td>
            <td>{{ it.category }}</td>
            <td>
              <span
                :class="['priority-badge', it.priority.toLowerCase()]"
              >
                {{ it.priority }}
              </span>
            </td>
            <td>
              <span class="badge awaiting-user-confirmation">🔔 Awaiting User</span>
            </td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`" class="btn primary">View details</RouterLink>
              <button class="btn danger" @click="onDelete(it.id)">Delete</button>
            </td>
          </tr>

          <tr v-for="it in completed" :key="it.id">
            <td>#{{ it.id }}</td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`">{{ it.title }}</RouterLink>
            </td>
            <td>{{ it.category }}</td>
            <td>
              <span
                :class="['priority-badge', it.priority.toLowerCase()]"
              >
                {{ it.priority }}
              </span>
            </td>
            <td>
              <span class="badge completed">✔️ Completed</span>
            </td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`" class="btn primary">View details</RouterLink>
              <button class="btn danger" @click="onDelete(it.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.helper {
  position: relative;
  display: grid;
  place-items: start center;
  padding: 0 16px 32px;
}

.card {
  width: 100%;
  max-width: 1100px;
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

.ticket-table {
  width: 100%;
  border-collapse: collapse;
}
.ticket-table thead th {
  background: linear-gradient(180deg, rgba(59,91,219,0.13) 0%, rgba(59,91,219,0.13) 100%);
  color: var(--color-heading);
  font-weight: 600;
}
.ticket-table th, .ticket-table td {
  padding: 12px 14px;
  text-align: left;
  border: 1px solid var(--color-border);
}
.ticket-table tr:nth-child(even) { background: #f8fafc; }

/* Dark mode zebra: use muted background for subtle contrast (no pure black/white) */
:root[data-theme='dark'] .ticket-table tr:nth-child(even) { background: var(--color-background-mute); }

.badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 160px;
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
  box-shadow: 0 1px 0 rgba(0,0,0,.04) inset;
}
.badge.not-yet-worked {
  background-color: #f3f4f6; /* soft gray */
  color: #4b5563;
  border: 1px solid #d1d5db;
}

.badge.working-on {
  background-color: #eff6ff; /* light blue */
  color: #1d4ed8;
  border: 1px solid #60a5fa; /* blue outline */
}

.badge.awaiting-user-confirmation {
  background-color: #f5f3ff; /* light purple */
  color: #6d28d9;
  border: 1px solid #a855f7;
}

.badge.completed {
  background-color: #dcfce7; /* green pastel */
  color: #15803d;
  border: 1px solid #4ade80;
}

/* Priority badges: red (High), green (Normal), yellow (Low) */
.priority-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 160px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.1);
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.2);
}

.priority-badge.high {
  background: linear-gradient(180deg, #e66a74 0%, #9b2c37 100%);
}

.priority-badge.normal {
  background: linear-gradient(180deg, #f0cf80 0%, #b69139 100%);
}

.priority-badge.low {
  background: linear-gradient(180deg, #63c267 0%, #2e7d32 100%);
}

.btn { display: inline-flex; justify-content: center; align-items: center; min-width: 110px; height: 32px; padding: 0 10px; border-radius: 10px; border: 1px solid var(--color-border); cursor: pointer; transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.05s ease; font-size: 0.9rem; text-decoration: none; }
.btn.primary { background: linear-gradient(180deg, #3b5bdb 0%, #274690 100%); color: white; border-color: transparent; font-weight: 600; }
.btn.primary:hover { background: linear-gradient(180deg, #4563e6 0%, #2c4fa3 100%); }

/* Delete button: match user cancel button look, same size as primary */
.btn.danger {
  color: #1d4ed8;
  font-weight: 600;
  background: linear-gradient(180deg, #ffffff 0%, #e2e8f0 100%);
  border-color: rgba(148, 163, 184, 0.6);
  box-shadow: 0 2px 6px rgba(148, 163, 184, 0.25);
  margin-left: 6px;
}

.btn.danger:hover {
  background: linear-gradient(180deg, #f8fafc 0%, #cbd5f5 100%);
  color: #1d4ed8;
}

/* Bordered rounded container for table */
.table-wrap {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden; /* round the table corners */
  background: var(--color-background);
}

@media (max-width: 1024px) {
  .helper { padding: 24px 12px; }
  .card { padding: 20px; }
}
</style>

