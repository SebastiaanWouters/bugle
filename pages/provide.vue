
<script setup lang="ts">

const { ws } = useProvider();

</script>


<template>
  <div>
    <h1>WS PROVIDER</h1>
    <button @click="ws.send(JSON.stringify({ type: 'provide-message', channel: 'bugle', message: 'new message at: ' + Date.now()})) ">Send message</button>
  </div>
</template>
