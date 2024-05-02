<script setup lang="ts">
import type { FormError } from '#ui/types';

const { t } = useI18n();

const reportStore = useReportStore();

const { complaint } = storeToRefs(reportStore);

// Import Vue FilePond
import vueFilePond from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Create component
const FilePond = vueFilePond(
   FilePondPluginFileValidateType,
   FilePondPluginImagePreview
);

const accepted_file_types =
   'image/jpeg, image/png, video/mp4, audio/mpeg, application/pdf, text/plain, application/msword';

const state = ref({
   documentation: complaint.value.documentation,
});

const validate = (): FormError[] => {
   const errors: FormError[] = [];
   return errors;
};

async function onSubmit() {
   reportStore.setCurrentStepID(5);
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
            <UFormGroup class="m-auto w-full" name="documentation">
               <ClientOnly>
                  <file-pond
                     :allow-multiple="true"
                     credits=""
                     maxFiles="3"
                     :label-idle="t('form.fields.documentation.label')"
                     :accepted-file-types="accepted_file_types"
                     :files="state.documentation" />
               </ClientOnly>
            </UFormGroup>
         </div>

         <UButton id="submit-btn-step-4" type="submit" class="hidden" />
      </UForm>
   </div>
</template>

<i18n lang="json">
{
   "en": {
      "texts": {
         "h2": "Attached documentation",
         "description": "You can attach up to 3 files that you consider relevant to your complaint."
      },
      "form": {
         "fields": {
            "documentation": {
               "label": "Drag and drop your files or explore"
            }
         }
      }
   },

   "es": {
      "texts": {
         "h2": "Documentación adjunta",
         "description": "Puede adjuntar hasta 3 archivos que considere relevantes para su denuncia."
      },
      "form": {
         "fields": {
            "documentation": {
               "label": "Arrastra y suelta tus archivos o explora"
            }
         }
      }
   }
}
</i18n>

<style>
.filepond--drop-label {
   @apply text-gray-900;
}

.filepond--label-action {
   @apply underline underline-offset-2;
}

.filepond--panel-root {
   @apply bg-gray-100 rounded-2xl border border-gray-300;
}
</style>
