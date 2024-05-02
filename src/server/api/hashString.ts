import { createDirectus, rest, generateHash } from '@directus/sdk';

export default defineEventHandler(async (event) => {
   const secrets = useRuntimeConfig();

   const body = await readBody(event);
   const input = body.string;

   const client = createDirectus(secrets.directus_url).with(rest());
   const result = await client.request(generateHash(input));

   return result;
});
