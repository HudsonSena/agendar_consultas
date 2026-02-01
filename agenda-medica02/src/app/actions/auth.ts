"use server";

import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { SignupFormSchema, SignupFormValues } from "../../lib/definitions";

export async function signup(values: SignupFormValues) {
  // 1. Validação extra no servidor
  const validatedFields = SignupFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Dados inválidos." };
  }

  const { name, username, email, password } = validatedFields.data;

  // 2. Criptografia
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });
    return { success: true };
  } catch (error: string | any) {
    if (error.code === "P2002") {
      return { error: "E-mail ou Username já cadastrados." };
    }
    return { error: "Erro interno ao criar usuário." };
  }
}
