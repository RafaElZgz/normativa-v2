<script setup>
const head = useLocaleHead({
   addDirAttribute: true,
   identifierAttribute: 'id',
   addSeoAttributes: true,
});
</script>

<template>
   <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
         <template v-for="link in head.link" :key="link.id">
            <Link
               :id="link.id"
               :rel="link.rel"
               :href="link.href"
               :hreflang="link.hreflang" />
         </template>
         <template v-for="meta in head.meta" :key="meta.id">
            <Meta
               :id="meta.id"
               :property="meta.property"
               :content="meta.content" />
         </template>
      </Head>
      <Body class="web-background">
         <div class="h-full">
            <ul class="web-background-particles">
               <li v-for="n in 10"></li>
            </ul>
            <MainLayoutHeader />
            <main class="min-h-[calc(100vh-var(--header-height))]">
               <NuxtPage />
               <UNotifications />
            </main>
            <MainLayoutFooter />
         </div>
      </Body>
   </Html>
</template>
