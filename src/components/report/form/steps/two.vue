<script setup lang="ts">
import type { FormError } from '#ui/types';

const { t } = useI18n();
const { readItems } = useDirectusItems();

const reportStore = useReportStore();

const { complaint } = storeToRefs(reportStore);

const state = ref({
   witnesses: complaint.value.witnesses,
   evidence: complaint.value.evidence,
   kind_of_abuse: complaint.value.kind_of_abuse,
   workspace: complaint.value.workspace,
   department: complaint.value.department,
});

useAsyncData('compliant_categories', () =>
   readItems('compliant_categories' as never, {
      fields: ['id', 'name'],
   })
);

useAsyncData('compliant_workplaces', () =>
   readItems('compliant_workplaces' as never, {
      fields: ['id', 'name'],
   })
);

useAsyncData('compliant_departments', () =>
   readItems('compliant_departments' as never, {
      fields: ['id', 'name'],
   })
);

const { data: available_kinds_of_abuse } = useNuxtData('compliant_categories');
const { data: available_workspaces } = useNuxtData('compliant_workplaces');
const { data: available_departments } = useNuxtData('compliant_departments');

const validate = (): FormError[] => {
   const errors: FormError[] = [];

   if (!state.value.kind_of_abuse) {
      errors.push({
         path: 'kind_of_abuse',
         message: t('form.fields.kind_of_abuse.error'),
      });
   }

   reportStore.setCurrentStepState(errors.length === 0);

   return errors;
};

async function onSubmit() {
   reportStore.setCurrentStepID(3);

   complaint.value.witnesses = state.value.witnesses;
   complaint.value.evidence = state.value.evidence;
   complaint.value.kind_of_abuse = state.value.kind_of_abuse;
   complaint.value.workspace = state.value.workspace;
   complaint.value.department = state.value.department;
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
         <div class="steps-grid-cols-2">
            <div
               class="border rounded-2xl px-4 py-2 dark:border-neutral-500"
               :class="useToggleBoxClass(state.witnesses)">
               <UFormGroup
                  :label="t('form.fields.witnesses.label')"
                  :description="t('form.fields.witnesses.description')">
                  <UToggle v-model="state.witnesses" />
               </UFormGroup>
            </div>
            <div
               class="border rounded-2xl px-4 py-2 dark:border-neutral-500"
               :class="useToggleBoxClass(state.evidence)">
               <UFormGroup
                  :label="t('form.fields.evidence.label')"
                  :description="t('form.fields.evidence.description')">
                  <UToggle v-model="state.evidence" />
               </UFormGroup>
            </div>
         </div>

         <UFormGroup
            :label="t('form.fields.kind_of_abuse.label')"
            name="kind_of_abuse"
            required>
            <UInputMenu
               v-model="state.kind_of_abuse"
               :options="available_kinds_of_abuse"
               :placeholder="t('form.fields.kind_of_abuse.placeholder')"
               option-attribute="name"
               icon="i-heroicons-tag" />
         </UFormGroup>

         <div class="steps-grid-cols-2">
            <UFormGroup :label="t('form.fields.workspace.label')">
               <UInputMenu
                  v-model="state.workspace"
                  :options="available_workspaces"
                  option-attribute="name"
                  :placeholder="t('utils.indifferent')"
                  nullable
                  icon="i-heroicons-building-office" />
            </UFormGroup>
            <UFormGroup :label="t('form.fields.department.label')">
               <UInputMenu
                  v-model="state.department"
                  :options="available_departments"
                  option-attribute="name"
                  :placeholder="t('utils.indifferent')"
                  nullable
                  icon="i-heroicons-user-group" />
            </UFormGroup>
         </div>

         <UButton id="submit-btn-step-2" type="submit" class="hidden" />
      </UForm>
   </div>
</template>

<i18n lang="json">
{
   "en": {
      "texts": {
         "h2": "Complaint details",
         "description": "Enter the basic information of your complaint."
      },
      "form": {
         "fields": {
            "witnesses": {
               "label": "Witnesses",
               "description": "Activate if there are more witnesses to the reported events."
            },
            "evidence": {
               "label": "Evidences",
               "description": "Activate if there is evidence of the reported events."
            },
            "kind_of_abuse": {
               "label": "Kind of abuse",
               "placeholder": "None selected",
               "error": "The type of abuse must be specified."
            },
            "workspace": {
               "label": "Workspace"
            },
            "department": {
               "label": "Department"
            }
         }
      },
      "utils": {
         "indifferent": "None selected"
      }
   },

   "es": {
      "texts": {
         "h2": "Datos de la denuncia",
         "description": "Introduzca los datos básicos de su denuncia."
      },
      "form": {
         "fields": {
            "witnesses": {
               "label": "Testigos",
               "description": "Activar en caso de haber más testigos de los hechos denunciados."
            },
            "evidence": {
               "label": "Pruebas",
               "description": "Activar en caso de existir pruebas de los hechos denunciados."
            },
            "kind_of_abuse": {
               "label": "Tipo de denuncia",
               "placeholder": "Ninguno seleccionado",
               "error": "Se debe especificar el tipo de abuso."
            },
            "workspace": {
               "label": "Centro de trabajo"
            },
            "department": {
               "label": "Departamento"
            }
         }
      },
      "utils": {
         "indifferent": "Ninguno seleccionado"
      }
   }
}
</i18n>
