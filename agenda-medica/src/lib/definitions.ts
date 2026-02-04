import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres." })
    .trim(),
  username: z
    .string()
    .min(3, { message: "Username deve ter pelo menos 3 caracteres." })
    .trim(),
  email: z.string().email({ message: "E-mail inválido." }).trim(),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres." }),
});

export type SignupFormValues = z.infer<typeof SignupFormSchema>;

export const SigninFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username deve ter pelo menos 3 caracteres." })
    .trim(),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

export type SigninFormValues = z.infer<typeof SigninFormSchema>;
