<script setup lang="ts">
import type { FormError } from '#ui/types';

const { t } = useI18n();

const nuxtApp = useNuxtApp();

const available_relationships = [
   {
      name: nuxtApp.$i18n.t('relationship_with_company.employee'),
      value: 'employee',
   },
   {
      name: nuxtApp.$i18n.t('relationship_with_company.supplier'),
      value: 'supplier',
   },
   {
      name: nuxtApp.$i18n.t('relationship_with_company.customer'),
      value: 'customer',
   },
   {
      name: nuxtApp.$i18n.t('relationship_with_company.partners'),
      value: 'partners',
   },
   {
      name: nuxtApp.$i18n.t('relationship_with_company.exemployee'),
      value: 'exemployee',
   },
   {
      name: nuxtApp.$i18n.t('relationship_with_company.other'),
      value: 'other',
   },
];

const reportStore = useReportStore();

const { complaint } = storeToRefs(reportStore);

const state = ref({
   name: complaint.value.name,
   email: complaint.value.email,
   phone: complaint.value.phone,
   anon_complaint: complaint.value.anon_complaint,
   selected_relationship: complaint.value.relationship_with_company,
});

const validate = (): FormError[] => {
   const errors: FormError[] = [];

   if (!state.value.anon_complaint) {
      const phonePattern = /^[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/;
      const isValidPhone = phonePattern.test(state.value.phone || '');

      const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const isValidEmail = emailPattern.test(state.value.email || '');

      if (!state.value.name) {
         errors.push({
            path: 'name',
            message: t('form.fields.name.error'),
         });
      }

      if (!isValidEmail) {
         errors.push({
            path: 'email',
            message: t('form.fields.email.error'),
         });
      }

      if (state.value.phone && !isValidPhone) {
         errors.push({
            path: 'phone',
            message: t('form.fields.phone.error'),
         });
      }
   }

   reportStore.setCurrentStepState(errors.length === 0);

   return errors;
};

async function onSubmit() {
   reportStore.setCurrentStepID(2);

   complaint.value.name = state.value.name;
   complaint.value.email = state.value.email;
   complaint.value.phone = state.value.phone;

   complaint.value.relationship_with_company =
      state.value.selected_relationship;
   complaint.value.anon_complaint = state.value.anon_complaint;

   if (complaint.value.anon_complaint) {
      complaint.value.name = undefined;
      complaint.value.email = undefined;
      complaint.value.phone = undefined;
   }
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
         <UFormGroup
            :label="t('form.fields.relationship.label')"
            name="relationship"
            required>
            <USelect
               v-model="state.selected_relationship"
               icon="i-heroicons-users"
               :options="available_relationships"
               option-attribute="name" />
         </UFormGroup>

         <UFormGroup :label="t('form.fields.isAnon.label')">
            <UToggle v-model="state.anon_complaint" />
         </UFormGroup>

         <UFormGroup
            v-if="!state.anon_complaint"
            :label="t('form.fields.name.label')"
            name="name"
            required>
            <UInput
               v-model="state.name"
               trailing-icon="i-mdi-account-outline"
               type="text"
               autocomplete="on"
               :placeholder="t('form.fields.name.placeholder')" />
         </UFormGroup>

         <div v-if="!state.anon_complaint" class="steps-grid-cols-2">
            <UFormGroup
               :label="t('form.fields.email.label')"
               name="email"
               required>
               <UInput
                  v-model="state.email"
                  trailing-icon="i-mdi-email-outline"
                  type="email"
                  autocomplete="on"
                  :placeholder="t('form.fields.email.placeholder')" />
            </UFormGroup>

            <UFormGroup :label="t('form.fields.phone.label')" name="phone">
               <UInput
                  v-model="state.phone"
                  trailing-icon="i-mdi-phone-outline"
                  type="tel"
                  autocomplete="on"
                  placeholder="XXX-XX-XX-XX"
                  v-maska
                  data-maska="XXX-XX-XX-XX"
                  data-maska-tokens="{ 'X': { 'pattern': '[0-9]' }}"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}" />
            </UFormGroup>
         </div>

         <UButton id="submit-btn-step-1" type="submit" class="hidden" />
      </UForm>
   </div>
</template>

<i18n lang="json">
{
   "en": {
      "texts": {
         "h2": "Complainant information",
         "description": "Here you can provide your information or set the report as anonymous."
      },
      "form": {
         "fields": {
            "name": {
               "label": "Name",
               "placeholder": "John Doe",
               "error": "A valid name must be entered."
            },
            "email": {
               "label": "Email",
               "placeholder": "user{'@'}domain.tld",
               "error": "A valid email must be entered."
            },
            "phone": {
               "label": "Phone",
               "error": "The phone number is not valid."
            },
            "isAnon": {
               "label": "Anonymous complaint"
            },
            "relationship": {
               "label": "Relationship with company"
            }
         }
      }
   },

   "es": {
      "texts": {
         "h2": "Información del denunciante",
         "description": "Aquí puede facilitar sus datos o establecer la denuncia como anónima."
      },
      "form": {
         "fields": {
            "name": {
               "label": "Nombre",
               "placeholder": "Juan Pérez",
               "error": "Se debe introducir un nombre válido."
            },
            "email": {
               "label": "Correo electrónico",
               "placeholder": "usuario{'@'}dominio.tld",
               "error": "Se debe introducir un email válido."
            },
            "phone": {
               "label": "Teléfono",
               "error": "El número de teléfono no es válido."
            },
            "isAnon": {
               "label": "Denuncia anónima"
            },
            "relationship": {
               "label": "Relación con la empresa"
            }
         }
      }
   }
}
</i18n>
