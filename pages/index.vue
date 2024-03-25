<script setup lang="ts">
import useSessions from "~/composables/sessions";

const { sessions } = useSessions();
const { data: serverSessions } = await useFetch("/api/sessions");
</script>

<template>
  <div>
    <h1>WS DEMO</h1>
    <div v-for="(session, index) in serverSessions">
      {{ session }}
    </div>
  </div>
</template>
