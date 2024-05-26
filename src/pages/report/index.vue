<script setup lang="ts">
defineI18nRoute({
   paths: {
      en: '/report',
      es: '/denunciar',
   },
});

const { t } = useI18n();

const reportStore = useReportStore();

const { currentStep } = storeToRefs(reportStore);

const colorNextStep = computed(() =>
   currentStep.value.valid ? 'primary' : 'red'
);

const toNextStep = async () => {
   document.getElementById(`submit-btn-step-${currentStep.value.id}`)?.click();
};

const toPrevStep = async () => {
   reportStore.setCurrentStepID(currentStep.value.id - 1);
};

const steps = [
   { id: 1, component: resolveComponent('report-form-steps-one') },
   { id: 2, component: resolveComponent('report-form-steps-two') },
   { id: 3, component: resolveComponent('report-form-steps-three') },
   { id: 4, component: resolveComponent('report-form-steps-four') },
   { id: 5, component: resolveComponent('report-form-steps-five') },
   { id: 6, component: resolveComponent('report-form-steps-six') },
];

const currentStepComponent = computed(() => {
   const step = steps.find((step) => step.id === currentStep.value.id);
   return step?.component;
});

const onSubmit = async () => {
   document.getElementById(`submit-btn-step-${currentStep.value.id}`)?.click();
};
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
         <div
            class="w-full my-2 sm:my-4 md:rounded-3xl md:shadow-lg px-6 md:px-10 flex flex-col md:border backdrop-blur-xl border-neutral-200 bg-white/60 dark:border-neutral-700 dark:bg-neutral-900/90">
            <ReportFormStepper />
            <UDivider size="xs" class="px-4" />
            <Transition name="step-transition" mode="out-in">
               <component :is="currentStepComponent" />
            </Transition>
         </div>
         <div class="w-full px-4">
            <UButton
               @click="onSubmit()"
               v-if="currentStep.id === steps.length"
               type="button"
               size="lg"
               trailing-icon="i-mdi-send"
               :ui="{ rounded: 'rounded-3xl' }"
               variant="outline"
               :disabled="!currentStep.valid"
               class="float-right">
               {{ t('form.submit') }}
            </UButton>
            <UButton
               @click="toNextStep()"
               v-if="currentStep.id < steps.length"
               type="button"
               size="lg"
               trailing-icon="i-mdi-arrow-right"
               :ui="{ rounded: 'rounded-3xl' }"
               :color="colorNextStep"
               :disabled="!currentStep.valid"
               class="float-right">
               {{ t('form.next') }}
            </UButton>
            <UButton
               @click="toPrevStep()"
               v-if="currentStep.id > 1"
               type="button"
               size="lg"
               color="white"
               icon="i-mdi-arrow-left"
               :ui="{ rounded: 'rounded-3xl' }"
               class="float-right mr-3">
               {{ t('form.prev') }}
            </UButton>
         </div>
      </div>
   </section>
</template>

<i18n lang="json">
{
   "en": {
      "meta": {
         "title": "Report"
      },
      "texts": {
         "h1": "File a complaint",
         "description": "Fill out the form below to file a complaint."
      },
      "form": {
         "prev": "Previous",
         "next": "Next",
         "submit": "Submit"
      }
   },

   "es": {
      "meta": {
         "title": "Denunciar"
      },
      "texts": {
         "h1": "Presentar una denuncia",
         "description": "Rellene el formulario inferior para presentar una denuncia."
      },
      "form": {
         "prev": "Anterior",
         "next": "Siguiente",
         "submit": "Enviar"
      }
   }
}
</i18n>
