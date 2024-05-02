import { defineStore } from 'pinia';
import type { Complaint } from '~/types';

/**
 *
 *  https://pinia.vuejs.org/core-concepts/
 *  https://pinia.vuejs.org/ssr/nuxt.html
 *
 */

export const useReportStore = defineStore('reportStore', {
   state: () => ({
      complaint: {
         id: undefined,
         anon_complaint: false,
         relationship_with_company: 'other',
         witnesses: false,
         evidence: false,
         password: '',
      } as Complaint,
      currentStep: {
         id: 1,
         valid: true,
      },
   }),

   getters: {},

   actions: {
      setCurrentStepID(id: number) {
         this.currentStep.id = id;
      },

      setCurrentStepState(state: boolean) {
         this.currentStep.valid = state;
      },

      setComplaint(input: Complaint) {
         this.complaint = input;
      },
   },

   persist: true,
});
