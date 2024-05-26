<script setup lang="ts">
const { t } = useI18n();

const localePath = useLocalePath();

const icon_links = [
   {
      name: 'Facebook',
      to: 'index',
      icon: 'i-ic-outline-facebook',
   },
   {
      name: 'LinkedIn',
      to: 'index',
      icon: 'i-mdi-linkedin',
   },
   {
      name: 'Instagram',
      to: 'index',
      icon: 'i-mdi-instagram',
   },
];

const links = [
   {
      label: 'links.legal.label',
      to: 'legal-notice',
   },
   {
      label: 'links.privacy.label',
      to: 'privacy-policy',
   },
];
</script>

<template>
   <footer
      class="bg-white/40 relative border-t border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 backdrop-blur"
      style="
         box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
      ">
      <div>
         <div
            class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 lg:py-6 lg:flex lg:items-center lg:justify-between lg:gap-x-3">
            <div
               class="lg:flex-1 flex items-center justify-center lg:justify-end lg:order-3 gap-x-4">
               <NuxtLink
                  v-for="link in icon_links"
                  :to="localePath(link.to)"
                  target="_blank"
                  :title="link.name"
                  class="hover:scale-125 transition ease-in-out duration-300 text-2xl text-primary">
                  <UIcon :name="link.icon" />
               </NuxtLink>
            </div>
            <div
               class="mt-2 lg:mt-0 lg:order-2 flex items-center justify-center space-x-4 lg:space-x-6">
               <ULink
                  v-for="link in links"
                  :to="localePath(link.to)"
                  activeClass="text-primary font-medium"
                  inactiveClass="text-sm text-neutral-600 dark:text-neutral-400"
                  class="hover:underline">
                  {{ t(link.label) }}
               </ULink>
            </div>
            <div
               class="flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-4 lg:mt-0 lg:order-1">
               <p class="space-x-1.5 text-xs lg:text-sm">
                  <span>{{ '&copy; Campus Digital FP' }}</span>
                  <span>&bullet;</span>
                  <span>{{ t('text') }}</span>
                  <NuxtLink
                     class="text-primary hover:underline font-semibold"
                     to="https://www.rafa.yt"
                     target="_blank">
                     {{ 'Rafael Alastuey' }}
                  </NuxtLink>
               </p>
            </div>
         </div>
      </div>
   </footer>
</template>

<i18n lang="json">
{
   "en": {
      "links": {
         "legal": {
            "label": "Legal notice"
         },
         "privacy": {
            "label": "Privacy policy"
         }
      },
      "text": "Created by"
   },

   "es": {
      "links": {
         "legal": {
            "label": "Aviso legal"
         },
         "privacy": {
            "label": "Política de privacidad"
         }
      },
      "text": "Creado por"
   }
}
</i18n>
