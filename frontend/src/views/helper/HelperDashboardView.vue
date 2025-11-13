<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useTickets } from '@/composables/useTickets'

const t = useTickets()
const { notYetWorked, workingOn, awaiting, completed } = t
</script>

<template>
  <div class="dashboard">
    <section class="header">
      <h1>Helper Dashboard</h1>
      <p class="subtitle">Tickets grouped by status</p>
    </section>

    <section class="content">
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
          <!-- Not Yet Worked -->
          <tr v-for="it in notYetWorked" :key="it.id">
            <td>#{{ it.id }}</td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`">{{ it.title }}</RouterLink>
            </td>
            <td>{{ it.category }}</td>
            <td>{{ it.priority }}</td>
            <td>
              <span class="badge not-yet-worked">Not Yet Worked</span>
            </td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`" class="btn btn-detail">View Details</RouterLink>
            </td>
          </tr>

          <!-- Working on -->
          <tr v-for="it in workingOn" :key="it.id">
            <td>#{{ it.id }}</td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`">{{ it.title }}</RouterLink>
            </td>
            <td>{{ it.category }}</td>
            <td>{{ it.priority }}</td>
            <td>
              <span class="badge working-on">Working on</span>
            </td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`" class="btn btn-detail">View Details</RouterLink>
            </td>
          </tr>

          <!-- Awaiting User Confirmation -->
          <tr v-for="it in awaiting" :key="it.id">
            <td>#{{ it.id }}</td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`">{{ it.title }}</RouterLink>
            </td>
            <td>{{ it.category }}</td>
            <td>{{ it.priority }}</td>
            <td>
              <span class="badge awaiting">Awaiting User Confirmation</span>
            </td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`" class="btn btn-detail">View Details</RouterLink>
            </td>
          </tr>

          <!-- Completed -->
          <tr v-for="it in completed" :key="it.id">
            <td>#{{ it.id }}</td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`">{{ it.title }}</RouterLink>
            </td>
            <td>{{ it.category }}</td>
            <td>{{ it.priority }}</td>
            <td>
              <span class="badge completed">Completed</span>
            </td>
            <td>
              <RouterLink :to="`/helper/ticket/${it.id}`" class="btn btn-detail">View Details</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.ticket-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.ticket-table th, .ticket-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.ticket-table th {
  background-color: #f4f4f4;
}

.badge {
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
}

/* Status colors consistent with form */
.badge.not-yet-worked {
  background-color: #f59e0b; /* amber */
}
.badge.working-on {
  background-color: #3b82f6; /* blue */
}
.badge.awaiting {
  background-color: #fbbf24; /* yellow */
}
.badge.completed {
  background-color: #10b981; /* green */
}

.btn {
  background-color: #2563eb;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 5px;
}

.btn-detail:hover {
  background-color: #1e40af;
}
</style>
