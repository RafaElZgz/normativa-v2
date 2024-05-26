<script setup lang="ts">
defineI18nRoute({
   paths: {
      en: '/query',
      es: '/consultar',
   },
});

import type { FormError, FormSubmitEvent } from '#ui/types';

const { t } = useI18n();

const toast = useToast();
const localePath = useLocalePath();
const queryStore = useQueryStore();

const state = ref({
   code: '',
   password: '',
});

const uppercaseCode = () => {
   state.value.code = state.value.code.toUpperCase();
};

const validate = (): FormError[] => {
   const errors: FormError[] = [];

   const codePattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
   const isValidCode = codePattern.test(state.value.code);

   if (!state.value.code) {
      errors.push({
         path: 'code',
         message: 'Debes introducir el código de la denuncia',
      });
   } else if (!isValidCode) {
      errors.push({
         path: 'code',
         message: 'El código de la denuncia no es valido',
      });
   } else if (!state.value.password) {
      errors.push({
         path: 'password',
         message: 'Debes introducir la contraseña de la denuncia',
      });
   }

   return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
   const validation = await $fetch('/api/complaint/checkPassword', {
      method: 'POST',
      body: {
         code: state.value.code!,
         password: state.value.password!,
      },
   });

   if (validation.result) {
      queryStore.setComplaintID(validation.complaint_id);
      queryStore.setResult(validation.result);
      queryStore.setComplaintCode(state.value.code!);

      toast.add({
         title: 'Correcto',
         icon: 'i-heroicons-check-16-solid',
         description: validation.message,
         color: 'green',
         timeout: 2000,
         callback: goToComplaint,
      });
   } else {
      toast.add({
         title: 'Error',
         icon: 'i-heroicons-x-mark-16-solid',
         description: validation.message,
         color: 'red',
         timeout: 10000,
      });
   }
}

const goToComplaint = () => {
   navigateTo(localePath('query') + `/${state.value.code}`);
};
</script>

<template>
   <Title>{{ t('meta.title') }}</Title>
   <section class="min-h-[calc(100vh-var(--header-height))] inline-flex w-full">
      <div class="max-w-screen-md m-auto w-full py-8 md:px-12">
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
            <div class="steps-card-header py-6">
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
               class="pb-6 space-y-6 inline-flex flex-col">
               <div class="space-y-6">
                  <UFormGroup
                     :label="t('form.fields.code.label')"
                     name="code"
                     required>
                     <UInput
                        @change="uppercaseCode()"
                        v-model="state.code"
                        icon="i-heroicons-key"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        v-maska
                        data-maska="XXXX-XXXX-XXXX-XXXX"
                        data-maska-tokens="{ 'X': { 'pattern': '[a-zA-Z0-9]' }}" />
                  </UFormGroup>

                  <UFormGroup
                     :label="t('form.fields.password.label')"
                     name="password"
                     required>
                     <UInput
                        v-model="state.password"
                        icon="i-heroicons-lock-closed"
                        placeholder="••••••••"
                        type="password" />
                  </UFormGroup>
               </div>

               <UButton
                  type="submit"
                  :label="'Consultar'"
                  trailing-icon="i-heroicons-arrow-right-circle-16-solid"
                  size="xl"
                  :ui="{ rounded: 'rounded-2xl' }"
                  class="mx-auto" />
            </UForm>
         </div>
      </div>
   </section>
</template>

<i18n lang="json">
{
   "en": {
      "meta": {
         "title": "Query"
      },
      "texts": {
         "h1": "Check complaint status",
         "description": "Fill out the form below to file a complaint.",
         "h2": "Complaint follow-up"
      },
      "form": {
         "buttons": {
            "submit": "Submit"
         },
         "fields": {
            "code": {
               "label": "Code"
            },
            "password": {
               "label": "Password"
            }
         }
      }
   },

   "es": {
      "meta": {
         "title": "Consultar"
      },
      "texts": {
         "h1": "Consultar estado denuncia",
         "description": "Rellene el formulario inferior para consultar el estado de una denuncia.",
         "h2": "Seguimiento de la denuncia"
      },
      "form": {
         "buttons": {
            "submit": "Enviar"
         },
         "fields": {
            "code": {
               "label": "Código"
            },
            "password": {
               "label": "Contraseña"
            }
         }
      }
   }
}
</i18n>
