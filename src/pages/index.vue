<script setup lang="ts">
const localePath = useLocalePath();

const { t } = useI18n();
</script>

<template>
   <Title>{{ t('meta.title') }}</Title>
   <section class="min-h-[calc(100vh-var(--header-height))] inline-flex w-full">
      <div class="max-w-screen-md m-auto w-full py-8 md:px-12">
         <div class="text-center space-y-1 px-4 sm:px-0">
            <h1 class="text-2xl sm:text-3xl font-bold">
               {{ t('texts.h1') }}
            </h1>
            <p class="text-md text-neutral-600 dark:text-neutral-400 sm:text-lg">
               {{ t('texts.description') }}
            </p>
         </div>
         <div class="w-full my-4 sm:my-6 flex flex-col">
            <div
               class="space-y-4 md:space-y-0 md:space-x-4 mx-auto inline-flex flex-col md:flex-row">
               <UButton
                  :to="localePath('report')"
                  icon="i-heroicons-arrow-down-tray-solid"
                  color="gray"
                  variant="outline"
                  size="xl">
                  {{ 'Presentar denuncia' }}
               </UButton>
               <UButton
                  :to="localePath('query')"
                  icon="i-heroicons-information-circle-solid"
                  color="primary"
                  variant="outline"
                  size="xl">
                  {{ 'Consultar estado denuncia' }}
               </UButton>
            </div>
         </div>
      </div>
   </section>
</template>

<i18n lang="json">
{
   "en": {
      "meta": {
         "title": "Home"
      },
      "texts": {
         "h1": "Welcome to the whistleblower channel",
         "description": "Here you can file a new complaint or check the status of an existing one."
      }
   },

   "es": {
      "meta": {
         "title": "Inicio"
      },
      "texts": {
         "h1": "Bienvenido al canal de denuncias",
         "description": "Aquí puede presentar una nueva denuncia o consultar el estado de una existente."
      }
   }
}
</i18n>
