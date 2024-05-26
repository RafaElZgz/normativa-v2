<script setup lang="ts">
const reportStore = useReportStore();

const { currentStep } = storeToRefs(reportStore);

const steps = [
   {
      id: 1,
      label: 'Denunciante',
      icon: 'i-mdi-account',
   },
   {
      id: 2,
      label: 'Denunciante',
      icon: 'i-mdi-account',
   },
   {
      id: 3,
      label: 'Denunciante',
      icon: 'i-mdi-account',
   },
   {
      id: 4,
      label: 'Denunciante',
      icon: 'i-mdi-account',
   },
   {
      id: 5,
      label: 'Denunciante',
      icon: 'i-mdi-account',
   },
   {
      id: 6,
      label: 'Denunciante',
      icon: 'i-mdi-account',
   },
];

const getStepClass = (id: number) => {
   const afterCommonClasses =
      "after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 lg:after:left-8 after:top-4 after:left-4";

   let className = 'text-neutral-800 after:bg-neutral-300 dark:text-neutral-400 dark:after:bg-neutral-500';

   if (currentStep.value.id > id) {
      className = 'text-white after:bg-primary';
   } else if (currentStep.value.id === id) {
      className = 'text-primary after:bg-neutral-300 dark:text-white dark:after:bg-neutral-500';
   }

   if (id < steps.length) {
      className += ` ${afterCommonClasses}`;
   }

   return className;
};

const getStepDotClass = (id: number) => {
   const isCurrent = currentStep.value.id === id;
   const isPast = currentStep.value.id > id;

   const className = {
      bg: isPast ? 'bg-primary' : isCurrent ? 'bg-primary-100 dark:bg-primary-700' : 'bg-neutral-50 dark:bg-neutral-800',
      border: isPast
         ? 'border-transparent'
         : isCurrent
         ? 'border-primary dark:border-white'
         : 'border-gray-300 dark:border-neutral-500',
   };

   return `${className.bg} ${className.border}`;
};
</script>

<template>
   <div class="mx-auto p-4 w-full inline-flex">
      <ol
         class="mx-auto flex items-center text-xs text-gray-900 font-medium sm:text-base space-x-4 lg:space-x-8">
         <li
            v-for="item in steps"
            :key="item.id"
            class="flex w-full relative"
            :class="getStepClass(item.id)">
            <div class="block whitespace-nowrap z-10">
               <span
                  class="w-8 h-8 border-2 border-gray-300 rounded-full flex justify-center items-center mx-auto text-sm lg:text-normal lg:w-10 lg:h-10"
                  :class="getStepDotClass(item.id)">
                  {{ item.id }}
               </span>
            </div>
         </li>
      </ol>
   </div>
</template>
