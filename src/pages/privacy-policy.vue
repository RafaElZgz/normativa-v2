<script setup lang="ts">
defineI18nRoute({
   paths: {
      en: '/privacy-policy',
      es: '/politica-privacidad',
   },
});

const localePath = useLocalePath();

const { t } = useI18n();
</script>

<template>
   <Title>{{ t('meta.title') }}</Title>
   <section class="min-h-[calc(100vh-var(--header-height))] inline-flex w-full">
      <div
         class="mb-24 flex w-full flex-col items-center gap-24 overflow-hidden px-6 pt-12 md:mx-auto md:mb-52 md:gap-32 md:pt-40 lg:gap-52 xl:px-8">
         <div class="flex w-full max-w-screen-lg flex-col lg:mx-8">
            <div class="mb-16 flex flex-col gap-4 text-center lg:mb-32">
               <h1 class="text-5xl font-semibold">{{ t('meta.title') }}</h1>
               <p class="leading-normal text-gray-600">
                  {{
                     'Everything you should understand regarding the Tailframes privacy policy.'
                  }}
               </p>
            </div>
            <div class="flex w-full flex-col gap-20">
               <section class="flex flex-col gap-6">
                  <h2 class="text-4xl font-semibold leading-10">
                     Collection of non-personal information
                  </h2>
                  <p class="text-gray-600">
                     Upon accessing the website, our servers will automatically
                     log details sent by your browser. This may encompass your
                     device's IP address, browser version, operating system
                     details, language preferences, the webpage you were
                     previously on before visiting our site, the specific pages
                     you browse on our site, duration spent on each page, search
                     queries within our site, access times and dates, and
                     various statistical data.
                  </p>
               </section>
               <section class="flex flex-col gap-6">
                  <h2 class="text-4xl font-semibold leading-10">
                     Information transfer and storage
                  </h2>
                  <p class="text-gray-600">
                     Depending on where you are situated, data transfers may
                     necessitate storing and transferring your information to a
                     country different from your own. You have the right to
                     understand the legal framework behind these information
                     transfers to countries beyond the European Union or to
                     international organizations governed by public
                     international law, such as the UN, and to be informed about
                     the security protocols implemented by us to protect your
                     data. If such transfers occur, you can obtain further
                     details by consulting the appropriate sections of this
                     document or by reaching out to us via the contact
                     information provided in the Contact section.
                  </p>
               </section>
               <section class="flex flex-col gap-6">
                  <h2 class="text-4xl font-semibold leading-10">
                     Google Analytics
                  </h2>
                  <ul>
                     <li class="list-inside list-disc text-gray-600">
                        We have implemented Google Analytics on our website to
                        track and analyze website usage. Google Analytics is a
                        web analytics service provided by Google Inc.
                        ("Google").
                     </li>
                     <li class="list-inside list-disc text-gray-600">
                        Google Analytics uses cookies to collect and store data
                        about your website usage. You can learn more about how
                        Google Analytics uses cookies by visiting Google's
                        Privacy Policy page.
                     </li>
                     <li class="list-inside list-disc text-gray-600">
                        By using our website, you consent to the processing of
                        data about you by Google Analytics in the manner and for
                        the purposes set out above.
                     </li>
                  </ul>
               </section>
            </div>
         </div>
      </div>
   </section>
</template>

<i18n lang="json">
{
   "en": {
      "meta": {
         "title": "Privacy policy"
      },
      "texts": {
         "h1": "Welcome to the whistleblower channel",
         "description": "Here you can file a new complaint or check the status of an existing one."
      }
   },

   "es": {
      "meta": {
         "title": "Política de privacidad"
      },
      "texts": {
         "h1": "Bienvenido al canal de denuncias",
         "description": "Aquí puede presentar una nueva denuncia o consultar el estado de una existente."
      }
   }
}
</i18n>
