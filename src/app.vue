<script setup lang="ts">
const { mainColor } = useRuntimeConfig();
</script>

<template>
   <NuxtLoadingIndicator v-if="mainColor" :color="mainColor.toString()" />
   <NuxtLayout />
</template>
