<template>
  <layout-helper>
    <template #default>
      <h3>Tickets For My Department</h3>
      <div v-if="tickets.length===0" class="small">Tidak ada tiket</div>
      <TicketCard v-for="t in tickets" :key="t.id" :ticket="t" />
    </template>
  </layout-helper>
</template>

<script>
import { ref, onMounted } from "vue";
import LayoutHelper from "../layouts/HelperLayout.vue";
import TicketCard from "../components/ticket/TicketCard.vue";
import { getTickets } from "../api/ticket";

export default {
  components: { LayoutHelper, TicketCard },
  setup(){
    const tickets = ref([]);
    async function load(){ const res = await getTickets(); tickets.value = res.data; }
    onMounted(load);
    return { tickets };
  }
}
</script>
