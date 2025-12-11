<template>
  <div class="card" style="margin-bottom:12px">
    <div class="space-between">
      <div>
        <div><strong>{{ ticket.title }}</strong></div>
        <div class="small">{{ ticket.description }}</div>
      </div>
      <div>
        <small class="small">Status: {{ ticket.status }}</small>
      </div>
    </div>
    <div style="margin-top:8px">
      <router-link :to="`/ticket/${ticket.id}`" class="btn">Detail</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketCard",
  props: { ticket: { type: Object, required: true } }
}
</script>
