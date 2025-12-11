<template>
  <div style="margin-top:12px">
    <textarea v-model="text" class="input" rows="3" placeholder="Tulis komentar..."></textarea>
    <div style="margin-top:8px; text-align:right">
      <button class="btn" @click="send" :disabled="!text">Kirim</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["send"],
  setup(_, { emit }) {
    const text = ref("");
    function send(){ if (!text.value) return; emit("send", text.value); text.value = ""; }
    return { text, send };
  }
}
</script>
