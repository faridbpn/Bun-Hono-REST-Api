import { z, ZodType } from "zod";
import { LoginUserRequest } from "../model/user-model";

export type RegisterUserRequest = {
  username: string;
  password: string;
  name: string;
};

export type UserLoginValidation = {
  username: string;
  password: string;
};

export class UserValidation {

  static readonly REGISTER: ZodType<RegisterUserRequest> = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
  });

  static readonly Login: ZodType<UserLoginValidation> = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100)
  })
}
