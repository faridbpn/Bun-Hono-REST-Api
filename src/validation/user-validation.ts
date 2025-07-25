import { z, ZodType } from "zod";

export type RegisterUserRequest = {
  username: string;
  password: string;
  name: string;
};

export type UserLoginValidation = {
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  password?: string;
  name?: string;
};

export class UserValidation {

  static readonly REGISTER: ZodType<RegisterUserRequest> = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
  });

  static readonly LOGIN: ZodType<UserLoginValidation> = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100)
  })

  static readonly TOKEN: ZodType = z.string().min(1)

  static readonly UPDATE: ZodType<UpdateUserRequest> = z.object({
    password: z.string().min(1).max(100).optional(),
    name: z.string().min(1).max(100).optional()
  })
}
