export default defineAppConfig({
   ui: {
      icons: {
         dynamic: false,
      },
      gray: 'zinc',
      primary: 'rab',

      button: {
         rounded: 'rounded-lg',
      },

      input: {
         rounded: 'rounded-2xl',
      },

      select: {
         rounded: 'rounded-2xl',
      },

      textarea: {
         rounded: 'rounded-2xl',
      },

      formGroup: {
         label: {
            wrapper: 'ml-0.5 flex content-center items-center justify-between',
         },
         description: 'ml-0.5 text-gray-500 dark:text-gray-400',
         error: 'mt-0.5 ml-0.5 text-xs text-red-500 dark:text-red-400',
      },
   },
});
