import { ZodSchema } from 'zod';

export type ZodResponseType<T extends ZodSchema<any>> = T extends ZodSchema<infer U> ? U : never;
