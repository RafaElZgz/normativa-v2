<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';

const { t } = useI18n({
   useScope: 'local',
});
const { createItem, readItems } = useDirectusItems();

const localePath = useLocalePath();
const reportStore = useReportStore();
const toast = useToast();

const { complaint } = storeToRefs(reportStore);

const state = ref({
   agent: complaint.value.agent,
   terms: false,
});

useAsyncData('agents', () =>
   readItems('agents' as never, {
      fields: ['id', 'name', 'user_id'],
   })
);

const { data: available_agents } = useNuxtData('agents');

const tabs = [
   {
      slot: 'complainant_info',
      label: t('tabs.complainant_info'),
   },
   {
      slot: 'complaint_info',
      label: t('tabs.complaint_info'),
   },
   {
      slot: 'attached_docs',
      label: t('tabs.attached_docs'),
   },
   {
      slot: 'confirmation',
      label: t('tabs.confirmation'),
   },
];

const currentTab = ref(0);
const createdComplaintCode = ref('');
const createdComplaintModalOpen = ref(false);

const validate = (): FormError[] => {
   const errors: FormError[] = [];

   if (!state.value.terms) {
      errors.push({
         path: 'terms',
         message:
            '⚠️ Debe aceptar la política de privacidad para poder enviar la denuncia.',
      });
      currentTab.value = 3;
   }

   reportStore.setCurrentStepState(errors.length === 0);

   return errors;
};

const bool2text = (input: boolean): string => {
   return input === true ? 'Sí' : 'No';
};

async function onSubmit() {
   complaint.value.agent = state.value.agent;
   reportStore.setCurrentStepState(false);

   try {
      const result = await createItem('complaints', complaint.value);
      createdComplaintCode.value = result.code;
   } catch (error) {
      console.log(error);
      toast.add({
         title: 'No se ha podido enviar la denuncia',
         description: `${error}`,
         icon: 'i-heroicons-exclamation-triangle',
         color: 'red',
      });
      return;
   } finally {
      toast.add({
         title: 'Denuncia enviada correctamente',
         icon: 'i-heroicons-check-circle',
         color: 'green',
      });

      createdComplaintModalOpen.value = true;
   }
}

const finish = async () => {
   createdComplaintModalOpen.value = false;
   reportStore.$reset();

   await navigateTo(localePath('query'));
};
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
            <template #complainant_info>
               <main class="report-resume-section">
                  <div class="space-x-1.5">
                     <span class="font-medium">
                        {{ 'Relación con la empresa:' }}
                     </span>
                     <span>
                        {{
                           $t(
                              `relationship_with_company.${complaint.relationship_with_company}`
                           )
                        }}
                     </span>
                  </div>
                  <div v-if="complaint.anon_complaint">
                     <span class="font-medium text-primary">
                        &#10070;&nbsp; {{ 'Denuncia anónima' }}
                     </span>
                  </div>
                  <div v-else class="space-y-4">
                     <div class="space-x-1.5">
                        <span class="font-medium">
                           {{ 'Nombre:' }}
                        </span>
                        <span>
                           {{ complaint.fullname }}
                        </span>
                     </div>
                     <div class="grid grid-cols-2">
                        <div class="space-x-1.5">
                           <span class="font-medium">
                              {{ 'Correo eléctronico:' }}
                           </span>
                           <span>
                              {{ complaint.email }}
                           </span>
                        </div>
                        <div class="space-x-1.5">
                           <span class="font-medium">
                              {{ 'Número de teléfono:' }}
                           </span>
                           <span>
                              {{ complaint.phone || 'No especificado' }}
                           </span>
                        </div>
                     </div>
                  </div>
               </main>
            </template>

            <template #complaint_info>
               <main class="report-resume-section">
                  <div class="grid grid-cols-2">
                     <div class="space-x-1.5">
                        <span class="font-medium">
                           {{ '¿Existen pruebas?' }}
                        </span>
                        <span>
                           {{ bool2text(complaint.evidence) }}
                        </span>
                     </div>
                     <div class="space-x-1.5">
                        <span class="font-medium">
                           {{ '¿Hay testigos?' }}
                        </span>
                        <span>
                           {{ bool2text(complaint.witnesses) }}
                        </span>
                     </div>
                  </div>
                  <div class="grid grid-cols-2">
                     <div class="space-x-1.5">
                        <span class="font-medium">
                           {{ 'Centro de trabajo:' }}
                        </span>
                        <span>
                           {{ complaint.workspace?.name || 'No seleccionado' }}
                        </span>
                     </div>
                     <div class="space-x-1.5">
                        <span class="font-medium">
                           {{ 'Departamento:' }}
                        </span>
                        <span>
                           {{ complaint.department?.name || 'No seleccionado' }}
                        </span>
                     </div>
                  </div>
                  <div class="space-x-1.5">
                     <span class="font-medium">
                        {{ 'Tipo de denuncia:' }}
                     </span>
                     <span>
                        {{ complaint.kind_of_abuse.name }}
                     </span>
                  </div>
                  <div class="space-y-1.5">
                     <span class="font-medium">
                        {{ 'Hechos denunciados:' }}
                     </span>
                     <UTextarea
                        resize
                        :rows="6"
                        name="reported_facts"
                        v-model="complaint.reported_facts"
                        disabled />
                  </div>
               </main>
            </template>

            <template #attached_docs>
               <main class="report-resume-section">
                  <span class="m-auto">
                     {{ 'No disponible por el momento' }}.
                  </span>
               </main>
            </template>

            <template #confirmation>
               <main class="report-resume-section">
                  <UFormGroup
                     :label="t('form.fields.agent.label')"
                     :description="t('form.fields.agent.description')"
                     name="agent">
                     <UInputMenu
                        v-model="state.agent"
                        :options="available_agents"
                        :placeholder="t('form.fields.agent.placeholder')"
                        option-attribute="name"
                        nullable
                        icon="i-heroicons-tag" />
                  </UFormGroup>
                  <UFormGroup name="terms">
                     <div
                        :class="useToggleBoxClass(state.terms)"
                        class="p-4 rounded-xl bg-white inline-flex flex-row space-x-4 w-full mb-1 border">
                        <UToggle v-model="state.terms" />
                        <p class="text-sm font-normal">
                           {{ '¿Acepta la' }}
                           <NuxtLink
                              class="text-primary underline underline-offset-2 font-medium"
                              :to="localePath('privacy-policy')">
                              {{ 'política de privacidad' }}
                           </NuxtLink>
                           ?
                        </p>
                     </div>
                  </UFormGroup>
               </main>
            </template>
         </UTabs>

         <UButton id="submit-btn-step-6" type="submit" class="hidden" />
      </UForm>

      <UModal v-model="createdComplaintModalOpen" fullscreen>
         <UCard class="m-auto">
            <template #header>
               <div class="flex items-center justify-between">
                  <h2
                     class="text-lg font-semibold inline-flex items-center text-center mx-auto">
                     <UIcon
                        name="i-heroicons-check-badge-solid"
                        class="mr-1.5 text-2xl text-green-400" />
                     {{ 'Denuncia creada correctamente' }}
                  </h2>
               </div>
            </template>

            <div>
               <p class="space-x-2 text-center">
                  <span>{{ 'Código de la denuncia:' }}</span>
                  <span class="font-bold">{{ createdComplaintCode }}</span>
               </p>
               <p class="text-xs mt-2 space-x-1">
                  <span class="text-red-500 font-medium">Atención:</span>
                  <span class="italic">
                     {{
                        'Asegurese de guardar este código para poder consultar el estado.'
                     }}
                  </span>
               </p>
            </div>

            <template #footer>
               <div class="flex items-center justify-between">
                  <UButton
                     @click="finish()"
                     label="Terminar"
                     class="m-auto"
                     trailing-icon="i-heroicons-arrow-right-end-on-rectangle" />
               </div>
            </template>
         </UCard>
      </UModal>
   </div>
</template>

<i18n lang="json">
{
   "en": {
      "texts": {
         "h2": "End complaint",
         "description": "Verify the details of your complaint before submit it."
      },
      "form": {
         "fields": {
            "agent": {
               "label": "Agent",
               "placeholder": "None selected",
               "description": "Do you want someone specific to handle your complaint?"
            }
         },
         "error": {
            "message": {
               "terms": "⚠️ You must accept the privacy policy in order to submit the complaint."
            }
         }
      },
      "tabs": {
         "complainant_info": "Complainant",
         "complaint_info": "Complaint",
         "attached_docs": "Documents",
         "confirmation": "Confirmation"
      }
   },

   "es": {
      "texts": {
         "h2": "Finalizar denuncia",
         "description": "Verifique los detalles de su denuncia antes de enviarla."
      },
      "form": {
         "fields": {
            "agent": {
               "label": "Agente",
               "placeholder": "Ninguno seleccionado",
               "description": "¿Quiere que alguien específico se encargue de su denuncia?"
            }
         },
         "error": {
            "message": {
               "terms": "⚠️ Debe aceptar la política de privacidad para poder enviar la denuncia."
            }
         }
      },
      "tabs": {
         "complainant_info": "Denunciante",
         "complaint_info": "Denuncia",
         "attached_docs": "Documentos",
         "confirmation": "Confirmación"
      }
   }
}
</i18n>

<style>
.report-resume-section {
   @apply bg-gray-100 p-4 rounded-xl shadow-md space-y-4 text-sm font-light;
}
</style>
