import * as z from 'zod'
 
export const SignupFormSchema = z.object({
    username: z
      .string()
      .min(3, { error: 'Nome de usuário deve ter pelo menos 3 caracteres.' })
      .max(20, { error: 'Nome de usuário deve ter no máximo 20 caracteres.' })
      .trim(),
  name: z
    .string()
    .min(2, { error: 'Nome deve ter pelo menos 2 caracteres.' })
    .trim(),
  email: z.email({ error: 'Por favor, insira um email válido.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Senha deve ter pelo menos 8 caracteres.' })
    .regex(/[a-zA-Z]/, { error: 'Senha deve conter pelo menos uma letra.' })
    .regex(/[0-9]/, { error: 'Senha deve conter pelo menos um número.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Senha deve conter pelo menos um caractere especial.',
    })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        username?: string[]
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined