import {
   createDirectus,
   staticToken,
   rest,
   readItems,
   verifyHash,
} from '@directus/sdk';

export default defineEventHandler(async (event) => {
   const secrets = useRuntimeConfig();

   const client = createDirectus(secrets.directus_url as string)
      .with(staticToken(secrets.directus_token as string))
      .with(rest());

   const body = await readBody(event);
   const in_code = body.code;
   const in_password = body.password;

   const return_object = {
      result: false,
      message: '',
      complaint_id: '',
   };

   const complaint: any = await client.request(
      readItems('complaints' as any, {
         fields: ['id', 'code', 'password'],
         filter: {
            code: {
               _eq: in_code,
            },
         },
      })
   );

   if (!complaint.length) {
      return_object.message = 'El código no es valido';
   } else {
      return_object.result = await client.request(
         verifyHash(in_password, complaint[0].password)
      );

      if (!return_object.result) {
         return_object.message = 'La contraseña no es correcta';
      } else {
         return_object.message = 'Accediendo a la denuncia';
         return_object.complaint_id = complaint[0].id;
      }
   }

   return return_object;
});
