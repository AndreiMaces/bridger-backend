import { Request } from 'express';
import { ZodSchema } from 'zod';
import { User } from '../../schemas/user';

export type ZodRequestType<T extends ZodSchema<any>> = T extends ZodSchema<infer U> ? U : never;

export type GenericRequest<T extends ZodSchema<any>> = Request<any, any, ZodRequestType<T> & {user: ZodRequestType<typeof User>}, any>;