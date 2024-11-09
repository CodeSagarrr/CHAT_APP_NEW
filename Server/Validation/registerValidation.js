import zod from 'zod';

export const registerSchema = zod.object({
   firstname: zod.string({ required_error: 'firstname are required' })
      .trim()
      .min(4, { required_error: "username must be at least 10 characters" })
      .max(15, { required_error: "username can't be more than 15 characters" }),

   lastname: zod.string({ required_error: "lastname is required" })
      .trim()
      .min(3, { required_error: "lastname must be at least 3 characters" })
      .max(15, { required_error: "lastname can't be more than 15 characters" }),

   email: zod.string({ required_error: "email is required" })
      .email({ required_error: "email must be valid" })
      .trim(),

   password: zod.string({ required_error: "password is required" })
      .trim()
      .min(4, { required_error: "password must be at least 8 characters" })
      .max(15, { required_error: "password can't be more than 15 characters" }),
})


export const loginSchema = zod.object({
   email: zod.string({ required_error: "email is required" })
      .email({ required_error: "email must be valid " })
      .trim(),

   password: zod.string({ required_error: "password is required" })
      .trim()
      .min(4, { required_error: "password must be at least 8 characters" })
      .max(15, { required_error: "password can't be more than 15 characters" }),
})