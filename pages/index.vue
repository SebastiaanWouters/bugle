<script setup lang="ts">
onMounted(() => { const ws = new WebSocket('ws://localhost:3000/_ws'); setTimeout(() => { ws.send('test')}, 1000) });
</script>


<template>
  <div>
    <h1>WS DEMO</h1>
  </div>
</template>
