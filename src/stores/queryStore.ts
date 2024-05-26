import { defineStore } from 'pinia';
import type { Complaint } from '~/types';

/**
 *
 *  https://pinia.vuejs.org/core-concepts/
 *  https://pinia.vuejs.org/ssr/nuxt.html
 *
 */

export const useQueryStore = defineStore('queryStore', {
   state: () => ({
      result: false,
      complaint: {
         id: undefined,
         code: undefined,
      } as Complaint,
   }),

   getters: {
      getResult: (state) => state.result,
      getComplaintID: (state) => state.complaint.id,
      getComplaintCode: (state) => state.complaint.code,
      getComplaint: (state) => state.complaint,
   },

   actions: {
      setResult(bool: boolean) {
         this.result = bool;
      },
      setComplaint(complaint: Complaint) {
         this.complaint = complaint;
      },
      setComplaintID(id: string | undefined) {
         this.complaint.id = id;
      },
      setComplaintCode(code: string | undefined) {
         this.complaint.code = code;
      },
   },

   persist: true,
});
