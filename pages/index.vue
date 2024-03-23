<script setup lang="ts">

import useSessions from '~/composables/sessions';
const { sessions } = useSessions();

</script>

<template>
  <div>
     <h1>WS DEMO</h1>
    <div v-if="sessions" v-for="(session, index) in sessions">
      {{ session }}
    </div>
  </div>
</template>
