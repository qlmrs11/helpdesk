<script setup lang="ts">
 import { ref } from 'vue'
 import { useTickets, type TicketPriority, type TicketCategory } from '@/composables/useTickets'

 const t = useTickets()

 const title = ref('')
 const description = ref('')
 const category = ref<TicketCategory>('IT')
 const priority = ref<TicketPriority>('Normal')

 const submitting = ref(false)
 const submitted = ref(false)

 function resetForm() {
   title.value = ''
   description.value = ''
   category.value = 'IT'
   priority.value = 'Normal'
   submitted.value = false
 }

 function onSubmit() {
   if (!title.value.trim() || !description.value.trim()) return
   submitting.value = true
   const newTicket = {
     id: Math.floor(100000 + Math.random() * 900000).toString(),
     title: title.value.trim(),
     description: description.value.trim(),
     category: category.value,
     priority: priority.value,
     status: 'Not Yet Worked' as const,
     comments: [],
   }
   t.store.value.push(newTicket)
   submitting.value = false
   submitted.value = true
   resetForm()
 }

 function onCancel() {
   resetForm()
 }
</script>

<template>
  <section class="create-ticket">
    <div class="card">
      <h2 class="title">Create ticket</h2>
      <p class="subtitle">Submit a request to IT or HR</p>

      <form class="form" @submit.prevent="onSubmit">
        <label class="field" for="title">
          <span>Ticket title</span>
          <input id="title" type="text" v-model="title" placeholder="Enter a concise title" required />
        </label>

        <label class="field" for="description">
          <span>Problem description</span>
          <textarea id="description" v-model="description" rows="5" placeholder="Describe the issue" required></textarea>
        </label>

        <div class="row gap">
          <label class="field">
            <span>Service category</span>
            <select v-model="category">
              <option value="IT">IT support</option>
              <option value="HR">HR</option>
            </select>
          </label>
          <label class="field">
            <span>Priority</span>
            <select v-model="priority">
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>

        <button type="submit" class="btn primary" :disabled="submitting">Submit ticket</button>
        <button type="button" class="btn light" @click="onCancel">Cancel</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.create-ticket {
  display: grid;
  place-items: start center;
  padding: 0 16px 32px;
}
.card {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 28px 32px;
  background: var(--color-background-soft);
}
.title { margin: 0; font-size: 2rem; font-weight: 600; line-height: 1.1; letter-spacing: -0.02em; color: var(--color-heading); }
.subtitle { margin: 12px 0 16px; color: var(--color-text-soft); font-size: 1.02rem; line-height: 1.5; font-weight: 500; }
.form { display: grid; gap: 16px; }
.field { display: grid; gap: 6px; }
.field input, .field textarea, .field select {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 12px 14px;
  outline: none;
  background: var(--color-background);
  box-shadow: 0 1px 0 rgba(0,0,0,.02) inset;
  font-size: 0.95rem;
  font-family: inherit; /* use the same font as the site */
  color: var(--color-heading);
}
.field textarea { resize: vertical; min-height: 120px; }
.row { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 720px) { .row.gap { grid-template-columns: 1fr 1fr; } }
.btn {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.05s ease;
  font-size: 1.05rem;
}
.btn.primary { color: white; border-color: transparent; background: linear-gradient(180deg, #3b5bdb 0%, #274690 100%); height: 44px; font-weight: 600; }
.btn.primary:hover { background: linear-gradient(180deg, #4563e6 0%, #2c4fa3 100%); }
.btn.light {
  color: #1d4ed8;
  font-weight: 600;
  background: linear-gradient(180deg, #ffffff 0%, #e2e8f0 100%);
  border-color: rgba(148, 163, 184, 0.6);
  box-shadow: 0 2px 6px rgba(148, 163, 184, 0.25);
}
.btn.light:hover {
  background: linear-gradient(180deg, #f8fafc 0%, #cbd5f5 100%);
  color: #1d4ed8;
}
</style>
