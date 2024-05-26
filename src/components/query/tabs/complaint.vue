<script setup lang="ts">
const { t } = useI18n();

const queryStore = useQueryStore();

const complaint = queryStore.getComplaint;
</script>

<template>
   <main class="query-complaint-tab-wrapper">
      <UTextarea
         resize
         :rows="8"
         name="reported_facts"
         v-model="complaint.reported_facts"
         disabled />
   </main>
</template>
