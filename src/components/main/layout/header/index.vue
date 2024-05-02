<script setup lang="ts">
const localePath = useLocalePath();

const initial_header_classes = '';
const header_wrapper_classes = ref(initial_header_classes);

const links = [
   {
      label: 'Reportar',
      to: localePath('report'),
   },
   {
      label: 'Consultar',
      to: localePath('query'),
   },
];

const navbarOpen = ref(false);
const windowWidth = ref();

const windowsResize = () => {
   windowWidth.value = window.innerWidth;
};

onMounted(() => {
   window.addEventListener('scroll', () => {
      header_wrapper_classes.value =
         document.documentElement.scrollTop > 50
            ? 'bg-white/80 shadow-lg'
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
               :to="localePath('report')"
               class="hover:scale-110 transition duration-300 ease-in-out flex-shrink-0 space-x-1 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5"
               aria-label="Logo">
               <img src="/logo.svg" class="h-10 w-auto m-auto" />
               <span class="m-auto">{{ 'Normativa' }}</span>
            </NuxtLink>
         </div>
      </div>
   </header>
</template>

<style>
:root {
   --header-height: 4rem;
}

.header-wrapper {
   @apply transition duration-300 backdrop-blur sticky top-0 z-50 border-b-2 lg:border-0;
}

.header-inner-wrapper {
   @apply mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height];
}
</style>
