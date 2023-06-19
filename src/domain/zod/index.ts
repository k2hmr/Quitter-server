import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid().max(36),
  name: z.string().max(255, { message: "255字未満で入力してください" }),
  email: z.string().email({ message: "形式が不正です" }).max(255, { message: "255字未満で入力してください" }),
  password: z
    .string()
    .min(8, { message: "8字以上で入力してください" })
    .max(255, { message: "255字未満で入力してください" }),
  created_at: z.coerce.date(),
});

export type UserType = z.infer<typeof UserSchema>;
