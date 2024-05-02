import fs from 'fs';
import path from 'path';

function getTranslationFiles(locale: string) {
   const langDir = path.resolve(__dirname, '../src/locales');
   const files = fs.readdirSync(path.join(langDir, locale));
   return files
      .filter((file) => file.endsWith('.json'))
      .map((file) => path.join(locale, file));
}

export default {
   baseUrl: process.env.BASE_URL,
   defaultLocale: 'es',
   locales: [
      { code: 'en', iso: 'en-EN', files: getTranslationFiles('en-EN') },
      { code: 'es', iso: 'es-ES', files: getTranslationFiles('es-ES') },
   ],
   lazy: true,
   langDir: './locales',
};
