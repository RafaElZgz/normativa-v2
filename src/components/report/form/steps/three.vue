<script setup lang="ts">
import type { FormError } from '#ui/types';

const { t } = useI18n();

const reportStore = useReportStore();

const { complaint } = storeToRefs(reportStore);

const state = ref({
   reported_facts: complaint.value.reported_facts,
});

const validate = (): FormError[] => {
   const errors: FormError[] = [];

   if (!state.value.reported_facts || state.value.reported_facts.length < 100) {
      errors.push({
         path: 'reported_facts',
         message: t('form.fields.reported_facts.error'),
      });
   }

   return errors;
};

async function onSubmit() {
   reportStore.setCurrentStepID(4);

   complaint.value.reported_facts = state.value.reported_facts;
}
</script>

<template>
   <div class="steps-card-wrapper">
      <div class="steps-card-header">
         <h2>
            {{ t('texts.h2') }}
         </h2>
         <p>
            {{ t('texts.description') }}
         </p>
      </div>

      <UForm
         :validate="validate"
         :state="state"
         @submit="onSubmit"
         class="steps-card-form">
         <div class="inline-flex">
            <UFormGroup class="m-auto w-full" name="reported_facts">
               <UTextarea
                  :rows="12"
                  autoresize
                  padded
                  v-model="state.reported_facts" />
            </UFormGroup>
         </div>

         <UButton id="submit-btn-step-3" type="submit" class="hidden" />
      </UForm>
   </div>
</template>

<i18n lang="json">
{
   "en": {
      "texts": {
         "h2": "Reported facts",
         "description": "Explain in detail the facts reported."
      },
      "form": {
         "fields": {
            "reported_facts": {
               "error": "The text must be, at least, 100 characters."
            }
         }
      }
   },

   "es": {
      "texts": {
         "h2": "Hechos denunciados",
         "description": "Explique con detalle los hechos denunciados."
      },
      "form": {
         "fields": {
            "reported_facts": {
               "error": "El texto debe tener, al menos, 100 caracteres."
            }
         }
      }
   }
}
</i18n>
