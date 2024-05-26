<script setup lang="ts">
const { t } = useI18n();

const switchLocale = useSwitchLocalePath();

const langs = computed(() => [
   [
      {
         label: 'Seleccione un idioma',
         disabled: true,
      },
   ],
   [
      {
         label: 'Español',
         icon: 'i-emojione-flag-for-spain',
         iconClass: 'mx-1',
         to: switchLocale('es'),
      },
      {
         label: 'English',
         icon: 'i-emojione-flag-england',
         iconClass: 'mx-1',
         to: switchLocale('en'),
      },
   ],
]);

const iconColorMode = ref();

const setColorIcon = (preference: string) => {
   const iconMap: { [key: string]: string } = {
      system: 'i-heroicons-computer-desktop-solid',
      dark: 'i-heroicons-moon-solid',
      light: 'i-heroicons-sun-solid',
   };

   iconColorMode.value = iconMap[preference];
};

const toggleColorMode = () => {
   const currentMode = useColorMode().preference;

   let newMode: string;

   switch (currentMode) {
      case 'dark':
         newMode = 'light';
         break;
      case 'light':
         newMode = 'system';
         break;
      case 'system':
         newMode = 'dark';
         break;
      default:
         newMode = 'light';
   }

   setColorIcon(newMode);
   useColorMode().preference = newMode;
};

onBeforeMount(() => {
   setColorIcon(useColorMode().preference);
});
</script>

<template>
   <UDropdown :items="langs">
      <UButton
         color="gray"
         variant="solid"
         size="md"
         icon="i-heroicons-language" />
   </UDropdown>
   <ClientOnly>
      <UButton
         @click="toggleColorMode()"
         color="primary"
         variant="solid"
         size="md"
         :icon="iconColorMode" />
   </ClientOnly>
</template>

<i18n lang="json">
{
   "en": {},

   "es": {}
}
</i18n>
