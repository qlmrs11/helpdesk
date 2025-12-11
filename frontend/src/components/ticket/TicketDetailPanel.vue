<template>
  <div>
    <h3>{{ ticket.title }}</h3>
    <p>{{ ticket.description }}</p>
    <p class="small">Category: {{ ticket.category }} • Priority: {{ ticket.priority }}</p>
    <div style="margin-top:12px">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: { ticket: { type: Object, required: true } }
}
</script>
