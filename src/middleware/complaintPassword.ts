export default defineNuxtRouteMiddleware((to) => {
   const localePath = useLocalePath();
   const queryStore = useQueryStore();

   const route_code = to.path.split('/').pop();

   if (!queryStore.getResult || queryStore.getComplaintCode !== route_code) {
      return navigateTo(localePath('index'));
   }
});
