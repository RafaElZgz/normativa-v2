<script setup lang="ts">
const { t } = useI18n();

const localePath = useLocalePath();

const initial_header_classes = '';
const header_wrapper_classes = ref(initial_header_classes);

const links = ref([
   {
      label: 'links.home.label',
      to: 'index',
   },
   {
      label: 'links.report.label',
      to: 'report',
   },
   {
      label: 'links.query.label',
      to: 'query',
   },
]);

const navbarOpen = ref(false);
const windowWidth = ref();
const iconNavBars = ref('i-heroicons-bars-3-bottom-left');
const navbarClassMobile = ref('hidden');

watch(navbarOpen, (state) => {
   navbarClassMobile.value = state === true ? '' : 'hidden';
   iconNavBars.value =
      state === true ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3-bottom-left';
});

const windowsResize = () => {
   windowWidth.value = window.innerWidth;
};

onMounted(() => {
   window.addEventListener('scroll', () => {
      header_wrapper_classes.value =
         document.documentElement.scrollTop > 50
            ? 'bg-white/80 backdrop-blur-[4px] shadow-lg dark:bg-neutral-900 border-b'
            : initial_header_classes;
   });

   windowWidth.value = window.innerWidth;
   window.addEventListener('resize', windowsResize);
});

onBeforeUnmount(() => {
   window.removeEventListener('resize', windowsResize);
});
</script>

<template>
   <header :class="header_wrapper_classes" class="header-wrapper">
      <div class="header-inner-wrapper">
         <div class="lg:flex-1 flex items-center gap-1.5">
            <NuxtLink
               aria-current="page"
               :to="localePath('index')"
               class="hover:scale-110 transition duration-300 ease-in-out flex-shrink-0 space-x-1 font-bold text-xl flex items-end gap-1.5"
               aria-label="Logo">
               <svg
                  class="h-10 w-auto m-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 400">
                  <path
                     fill="currentColor"
                     d="M199.8,33.3c5.3,8.4,4.1,44.8-2.6,77.8c-6.6,32.4-6.5,54,0.1,79.7c2.7,10.3,1.5,12.3,12.8-22c3-9,6.5-20.1,7.8-24.8c3.4-12,3.6-12.2,3.6-3.9c0.1,15.6-1.1,25.5-7,57.8c-7.4,40.3,3.4,71.3,30.9,88.7l5.5,3.5l-1.3,4.7c-4.4,15.9-19.9,35.8-35.8,45.9c-18.2,11.6-34,15.7-58.4,15.1c-5.9-0.1-10.5,0-10.2,0.2c4.9,4.3,33.3,10.6,51.6,11.4c63.8,2.8,128.1-41.3,139.5-95.7l0.5-2.2l-1.9,1.2c-38,24.4-84.4,5.3-91.6-37.6c-1.9-11.5-1-20.9,4-40.3c6.1-23.5,8.1-37.8,7.4-51.7c-2-36.6-18.7-72.3-47.8-101.9C201.5,33.6,198.3,31,199.8,33.3 M5.4,75.1c0.4,0.8,2.5,4.1,4.6,7.4c11.7,18.2,21.3,38,35.1,72.8c29.5,74.1,62,100.2,143.5,115c12.9,2.4,12.8,2.4,7-1.7c-13.1-9-28.2-20.6-39.1-30.1c-20.4-17.8-39.7-39.9-53-60.6c-5-7.8-18.2-32.2-15.4-28.4c25.2,34,74.2,80.6,109,103.8c7.3,4.9,7.2,5.5,2.3-11.8c-17-59.5-43.1-97.7-87.7-128C84.5,95,40.4,78.2,8.2,74.1C4.7,73.7,4.6,73.7,5.4,75.1 M293.3,191c-11.4,2-22.1,9.9-27.1,20c-19.5,38.7,31.2,73.6,62.4,43C355.5,227.7,331.2,184.3,293.3,191 M352.7,203.2c0,0.2,0.9,2.3,2,4.5c5.5,11.2,5.3,27.9-0.4,38.6c-1.3,2.4-1.2,2.7,0.9,2.2c1-0.3,5.5-1.3,10-2.3c13.4-3,18.9-6.6,26.6-17.1l3.2-4.4l-1.3-2.3c-4.6-8.3-12.5-15.4-19.6-17.6 C370.4,203.6,352.7,202.3,352.7,203.2 M309.5,210.1c16,8,15.2,30-1.2,36c-22.3,8.2-38.5-21.5-18.8-34.6C294.6,208,304.1,207.4,309.5,210.1 M54.4,251.2C67,344.4,177.5,376.8,231,303c3.1-4.2,4.2-6.3,3.7-6.7c-1.3-0.8-18.4-6.1-26.5-8.3c-18.4-4.8-36.6-7.7-61.2-9.8c-53.7-4.7-69.1-9.3-88-26.7c-2.8-2.5-5-4.6-5.1-4.6C53.8,246.8,54.1,248.8,54.4,251.2 M126.9,301.7c10.9,3,35.8,6.9,55.5,8.9l4.7,0.5l-5.7,0.8c-15.4,2.2-31.7,0.3-46.5-5.3c-5.9-2.3-16.7-7.2-14.1-6.5 C121.6,300.3,124.3,301,126.9,301.7" />
               </svg>
               <span class="m-auto">{{ 'Normativa' }}</span>
            </NuxtLink>
         </div>
         <div class="lg:order-3 flex items-center gap-x-2">
            <UButton
               v-if="windowWidth < 1024"
               @click="navbarOpen = !navbarOpen"
               color="neutral"
               variant="solid"
               size="md"
               :icon="iconNavBars" />
            <MainLayoutHeaderButtons />
         </div>
         <div
            :class="navbarClassMobile"
            class="overflow-hidden transition-all duration-300 basis-full grow lg:grow-0 lg:basis-auto lg:block lg:order-2">
            <nav
               class="flex flex-col text-lg lg:gap-5 mt-5 lg:flex-row lg:items-center lg:mt-0 lg:pe-12 rounded-xl lg:rounded-none overflow-hidden divide-y-4 divide-white lg:divide-y-0">
               <NuxtLink
                  v-for="link in links"
                  :to="localePath(link.to)"
                  class="header-nav-link">
                  {{ t(link.label) }}
               </NuxtLink>
            </nav>
         </div>
      </div>
   </header>
</template>

<style>
:root {
   --header-height: 4rem;
}

.header-wrapper {
   @apply flex flex-wrap lg:justify-start lg:flex-nowrap transition duration-300 sticky top-0 z-50 dark:border-neutral-700;
}

.header-inner-wrapper {
   @apply mx-auto sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between min-h-[--header-height] flex-wrap basis-full relative;
}

.header-nav-link {
   @apply bg-primary lg:bg-transparent py-3 px-6 lg:py-0 lg:px-0 text-center font-medium text-white bg-neutral-400/80 hover:bg-neutral-500/80 lg:hover:bg-transparent lg:text-neutral-500 lg:hover:text-neutral-800 dark:lg:text-neutral-300 dark:lg:hover:text-neutral-400;
}

.header-nav-link.router-link-active {
   @apply bg-primary/80 lg:text-primary lg:bg-transparent lg:underline underline-offset-2;
}
</style>

<i18n lang="json">
{
   "en": {
      "links": {
         "home": {
            "label": "Home"
         },
         "report": {
            "label": "Report"
         },
         "query": {
            "label": "Query"
         }
      }
   },

   "es": {
      "links": {
         "home": {
            "label": "Inicio"
         },
         "report": {
            "label": "Reportar"
         },
         "query": {
            "label": "Consultar"
         }
      }
   }
}
</i18n>
