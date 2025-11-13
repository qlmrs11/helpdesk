<template>
  <nav class="navbar">
    <h1>Helpdesk IAE</h1>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0056b3;
  color: white;
  padding: 1rem 2rem;
}
ul {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
