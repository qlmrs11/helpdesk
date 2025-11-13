<script setup lang="ts">
import StatCard from '@/components/dashboard/StatCard.vue'
</script>

<template>
  <div class="dashboard">
    <section class="header">
      <h1>User Dashboard</h1>
      <p class="subtitle">Summary of today's internal support ticket activity</p>
    </section>

    <section class="stats">
      <StatCard title="New Tickets" :value="7" subtitle="Today" accent="green" />
      <StatCard title="In Progress" :value="12" subtitle="IT & HR" accent="blue" />
      <StatCard title="Awaiting Confirmation" :value="4" subtitle="User action" accent="orange" />
      <StatCard title="Completed" :value="32" subtitle="Last 7 days" accent="red" />
    </section>

    <section class="content">
      <div class="panel">
        <h3>Recent Activity</h3>
        <ul class="list">
          <li>
            <span>#312 Reset work email password</span>
            <span class="muted">Category: IT • Priority: Normal</span>
          </li>
          <li>
            <span>#311 Employee data change</span>
            <span class="muted">Category: HR • Priority: High</span>
          </li>
          <li>
            <span>#310 Laptop failed to boot</span>
            <span class="muted">Category: IT • Priority: High</span>
          </li>
        </ul>
      </div>
      <div class="panel">
        <h3>Latest Tickets</h3>
        <ul class="list">
          <li>
            <span>#309 VPN access</span>
            <span class="badge warn">Not Yet Worked</span>
          </li>
          <li>
            <span>#308 Access card replacement</span>
            <span class="badge ok">Completed</span>
          </li>
          <li>
            <span>#307 Software installation</span>
            <span class="badge info">Awaiting User Confirmation</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
