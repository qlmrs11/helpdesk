<template>
  <layout-user>
    <template #default>
      <h3>My Tickets</h3>
      <div v-if="tickets.length===0" class="small">Belum ada tiket</div>
      <TicketCard v-for="t in tickets" :key="t.id" :ticket="t" />
      <div style="margin-top:12px">
        <h4>Buat Tiket Baru</h4>
        <input v-model="title" class="input" placeholder="Judul"/>
        <textarea v-model="description" class="input" rows="3" placeholder="Deskripsi" style="margin-top:8px"></textarea>
        <select v-model="category" class="input" style="margin-top:8px">
          <option value="IT">IT</option>
          <option value="HR">HR</option>
        </select>
        <select v-model="priority" class="input" style="margin-top:8px">
          <option value="LOW">LOW</option>
          <option value="NORMAL">NORMAL</option>
          <option value="HIGH">HIGH</option>
        </select>
        <div style="margin-top:8px">
          <button class="btn" @click="create">Buat</button>
        </div>
      </div>
    </template>
  </layout-user>
</template>

<script>
import { ref, onMounted } from "vue";
import LayoutUser from "../layouts/UserLayout.vue";
import TicketCard from "../components/ticket/TicketCard.vue";
import { getTickets, createTicket } from "../api/ticket";

export default {
  components: { LayoutUser, TicketCard },
  setup(){
    const tickets = ref([]);
    const title = ref("");
    const description = ref("");
    const category = ref("IT");
    const priority = ref("NORMAL");

    async function load(){
      const res = await getTickets();
      tickets.value = res.data;
    }

    async function create(){
      await createTicket({ title: title.value, description: description.value, category: category.value, priority: priority.value });
      title.value = description.value = "";
      await load();
    }

    onMounted(load);
    return { tickets, title, description, category, priority, create };
  }
}
</script>
