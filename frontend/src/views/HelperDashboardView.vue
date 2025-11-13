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

    <section class="content grid">
      <div class="panel">
        <h3>Not Yet Worked</h3>
        <ul class="list">
          <li v-for="it in notYetWorked" :key="it.id">
            <RouterLink :to="`/helper/ticket/${it.id}`">#{{ it.id }} {{ it.title }}</RouterLink>
            <span class="muted">{{ it.category }} • {{ it.priority }}</span>
          </li>
        </ul>
      </div>
      <div class="panel">
        <h3>Working on</h3>
        <ul class="list">
          <li v-for="it in workingOn" :key="it.id">
            <RouterLink :to="`/helper/ticket/${it.id}`">#{{ it.id }} {{ it.title }}</RouterLink>
            <span class="muted">{{ it.category }} • {{ it.priority }}</span>
          </li>
        </ul>
      </div>
      <div class="panel">
        <h3>Awaiting User Confirmation</h3>
        <ul class="list">
          <li v-for="it in awaiting" :key="it.id">
            <RouterLink :to="`/helper/ticket/${it.id}`">#{{ it.id }} {{ it.title }}</RouterLink>
            <span class="muted">{{ it.category }} • {{ it.priority }}</span>
          </li>
        </ul>
      </div>
      <div class="panel">
        <h3>Completed</h3>
        <ul class="list">
          <li v-for="it in completed" :key="it.id">
            <RouterLink :to="`/helper/ticket/${it.id}`">#{{ it.id }} {{ it.title }}</RouterLink>
            <span class="muted">{{ it.category }} • {{ it.priority }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

