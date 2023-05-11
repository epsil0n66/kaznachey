<template>
  <v-app>
    <p>Product details for {{ $route.params.stock }}</p>
    <p>
      {{ stockData }}
    </p>
  </v-app>
</template>

<script setup lang="ts">
const route = useRoute()
const board = route.params.stock.slice(0, 4)
const sec = route.params.stock.slice(4, 8)
const stockData = await $fetch(`https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/${board}/securities/${sec}.json`)
</script>
