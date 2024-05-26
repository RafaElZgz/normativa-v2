<script setup lang="ts">
const { t } = useI18n();

const queryStore = useQueryStore();

const complaint = queryStore.getComplaint;
</script>

<template>
   <main class="query-complaint-tab-wrapper"></main>
</template>
