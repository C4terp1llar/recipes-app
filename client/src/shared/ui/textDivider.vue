<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="flex items-center gap-3">
    <hr class="w-full"/>
    <span>{{text}}</span>
    <hr class="w-full"/>
  </div>
</template>

<style scoped>

</style>