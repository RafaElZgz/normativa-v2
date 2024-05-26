<script setup lang="ts">
import type { FormError } from '#ui/types';

const { t } = useI18n();

const reportStore = useReportStore();

const { complaint } = storeToRefs(reportStore);

const state = ref({
   password: '',
   password_confirmation: undefined,
});

watch(state.value, () => {
   password_score.value = checkPasswordScore(state.value.password);
});

const checkPasswordScore = (password: string): number => {
   let score = 0;

   // Helper functions to check conditions
   const hasLength = password.length >= 8;
   const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
   const hasLowercase = /[a-z]/.test(password);
   const hasUppercase = /[A-Z]/.test(password);
   const hasNumber = /\d/.test(password);
   const hasLetter = /[a-zA-Z]/.test(password);

   // Increment score based on conditions
   if (hasLength) score++;
   if (hasSymbol) score++;
   if (hasLowercase && hasUppercase) score++;
   if (hasNumber && hasLetter) score++;

   return score;
};

const password_score = ref(checkPasswordScore(state.value.password));

const validate = (): FormError[] => {
   const errors: FormError[] = [];

   const { password, password_confirmation } = state.value;

   if (!password) {
      errors.push({
         path: 'password',
         message: 'Debes introducir una contraseña.',
      });
   } else if (password.length < 8) {
      errors.push({
         path: 'password',
         message: 'La contraseña debe tener al menos 8 caracteres.',
      });
   } else if (!password_confirmation) {
      errors.push({
         path: 'password_confirmation',
         message: 'Debes confirmar la contraseña.',
      });
   } else if (password !== password_confirmation) {
      errors.push({
         path: 'password_confirmation',
         message: 'Las contraseñas no coinciden.',
      });
   }

   reportStore.setCurrentStepState(errors.length === 0);

   return errors;
};

async function onSubmit() {
   reportStore.setCurrentStepID(6);

   /*
   const password = await $fetch('/api/hashString', {
      method: 'POST',
      body: {
         string: state.value.password,
      },
   });
   */

   complaint.value.password = state.value.password;
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
            <UFormGroup
               :label="t('form.fields.password.label')"
               name="password"
               required>
               <UInput
                  v-model="state.password"
                  icon="i-heroicons-key"
                  type="password" />
            </UFormGroup>

            <UFormGroup
               :label="t('form.fields.password_confirmation.label')"
               name="password_confirmation"
               required>
               <UInput
                  v-model="state.password_confirmation"
                  icon="i-heroicons-key-solid"
                  type="password" />
            </UFormGroup>
         </div>

         <UFormGroup description="Seguridad de la contraseña">
            <UMeter class="mt-2" :value="password_score" :min="0" :max="4" />
         </UFormGroup>

         <UButton id="submit-btn-step-5" type="submit" class="hidden" />
      </UForm>
   </div>
</template>

<i18n lang="json">
{
   "en": {
      "texts": {
         "h2": "Complaint follow-up",
         "description": "Enter a password to be able to follow up on your complaint."
      },
      "form": {
         "fields": {
            "password": {
               "label": "Password"
            },
            "password_confirmation": {
               "label": "Repeat password"
            }
         }
      }
   },

   "es": {
      "texts": {
         "h2": "Seguimiento de la denuncia",
         "description": "Ingrese una contraseña para poder hacer un seguimiento de su denuncia."
      },
      "form": {
         "fields": {
            "password": {
               "label": "Contraseña"
            },
            "password_confirmation": {
               "label": "Repita la contraseña"
            }
         }
      }
   }
}
</i18n>
