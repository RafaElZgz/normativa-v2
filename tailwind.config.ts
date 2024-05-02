import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
   content: ['src/**/*.vue'],
   theme: {
      extend: {
         aspectRatio: {
            auto: 'auto',
            square: '1 / 1',
            video: '16 / 9',
         },
         colors: {
            rab: {
               50: '#F2F7FC',
               100: '#E2EEF7',
               200: '#CCE1F1',
               300: '#A8CFE8',
               400: '#7FB4DB',
               500: '#609AD1',
               600: '#5789C7',
               700: '#426FB3',
               800: '#3B5B92',
               900: '#3B5B92',
               950: '#233148',
            },
         },
      },
   },
   plugins: [],
};
