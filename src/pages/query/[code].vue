<script setup lang="ts">
import { exportToPDF } from '#imports'

definePageMeta({
   middleware: 'complaint-password',
});

defineI18nRoute({
   paths: {
      en: '/query/[code]',
      es: '/consultar/[code]',
   },
});

import type { Complaint } from '@/types';

const { t } = useI18n();
const { readItem } = useDirectusItems();

const toast = useToast();
const localePath = useLocalePath();
const queryStore = useQueryStore();

const currentTab = ref(0);

const tabs = [
   {
      slot: 'info',
      label: t('tabs.info'),
   },
   {
      slot: 'complaint',
      label: t('tabs.complaint'),
   },
   {
      slot: 'resolution',
      label: t('tabs.resolution'),
   },
   {
      slot: 'record',
      label: t('tabs.record'),
   },
];

const { data: complaintQuery } = await useAsyncData(() =>
   readItem('complaints' as never, queryStore.getComplaintID!, {
      fields: ['*.*'],
      nuxtData: false,
   })
);

queryStore.setComplaint(complaintQuery.value);

const goQueryPage = () => {
   navigateTo(localePath('query'));
};

const closeComplaint = () => {
   queryStore.$reset();

   toast.add({
      title: 'Correcto',
      icon: 'i-heroicons-check-16-solid',
      description: 'Se ha cerrado su denuncia',
      color: 'green',
      timeout: 2000,
      callback: goQueryPage,
   });
};

onMounted(() => {
   if (!queryStore.getResult) goQueryPage();
});

function downloadPDF(){
   
}
</script>

<template>
   <Title>{{ t('meta.title') }}</Title>
   <section class="min-h-[calc(100vh-var(--header-height))] inline-flex w-full">
      <div class="max-w-screen-lg m-auto w-full py-8 md:px-12">
         <div class="text-center space-y-1 px-4 sm:px-0">
            <h1 class="text-2xl sm:text-3xl font-bold text-neutral-800">
               {{ t('texts.h1') }}
            </h1>
            <p class="text-md text-neutral-600 sm:text-lg">
               {{ t('texts.description') }}
            </p>
         </div>
         <div
            class="w-full my-2 sm:my-4 md:rounded-3xl md:shadow-lg px-6 md:px-10 flex flex-col md:border border-gray-200 bg-white/60 backdrop-blur-xl">
            <div class="pt-6 text-center space-y-4 mb-8">
               <h2 class="font-bold text-xl">
                  {{ queryStore.getComplaintCode }}
               </h2>
               <div class="space-x-2">
                  <UButton
                     icon="i-heroicons-document-arrow-down-solid"
                     color="black"
                     variant="solid"
                     size="xs">
                     {{ t('texts.download') }}
                  </UButton>
                  <UButton
                     @click="closeComplaint"
                     icon="i-heroicons-x-circle-16-solid"
                     color="primary"
                     variant="solid"
                     size="xs">
                     {{ t('texts.close_complaint') }}
                  </UButton>
               </div>
            </div>
            <div class="space-y-6 inline-flex flex-col pb-8">
               <UTabs
                  v-model="currentTab"
                  :items="tabs"
                  class="w-full space-y-3"
                  :ui="{
                     list: {
                        rounded: 'rounded-xl',
                        shadow: 'shadow',
                        marker: {
                           rounded: 'rounded-xl',
                        },
                     },
                  }">
                  <template #complaint>
                     <QueryTabsComplaint />
                  </template>
                  <template #info>
                     <QueryTabsInfo />
                  </template>
                  <template #record>
                     <QueryTabsRecord />
                  </template>
                  <template #resolution>
                     <QueryTabsResolution />
                  </template>
               </UTabs>
            </div>
         </div>
      </div>
   </section>
</template>

<i18n lang="json">
{
   "en": {
      "meta": {
         "title": "Query complaint"
      },
      "texts": {
         "h1": "Check complaint status",
         "description": "Fill out the form below to file a complaint.",
         "download":"Download",
         "close_complaint": "Close complaint"
      },
      "tabs": {
         "info": "Information",
         "complaint": "Complaint",
         "resolution": "Resolution",
         "record": "Record"
      }
   },

   "es": {
      "meta": {
         "title": "Consultar denuncia"
      },
      "texts": {
         "h1": "Comprobar estado de la denuncia",
         "description": "Aquí tiene la información que se ha recuperado.",
         "download":"Descargar",
         "close_complaint":"Cerrar denuncia"
      },
      "tabs": {
         "info": "Información",
         "complaint": "Denuncia",
         "resolution": "Resolución",
         "record": "Registro"
      }
   }
}
</i18n>
function createPDF() {
   throw new Error('Function not implemented.');
}

function streamReturnPDF(event: Event | undefined, pdf: any) {
   throw new Error('Function not implemented.');
}

function createPDF() {
   throw new Error('Function not implemented.');
}

function streamReturnPDF(event: Event | undefined, pdf: any) {
   throw new Error('Function not implemented.');
}

