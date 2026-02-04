"use server";

import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { SignupFormSchema, SignupFormValues } from "@/lib/definitions";
import { SigninFormSchema, SigninFormValues } from "@/lib/definitions";

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

export async function signin(values: SigninFormValues) {
  const validatedFields = SigninFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Dados inválidos." };
  }

  const { username, password } = validatedFields.data;

  try {
    // Agora buscamos pelo username que é @unique no seu schema do Prisma
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      // Dica de segurança: não dizer qual dos dois está errado
      return { error: "Usuário ou senha incorretos." };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { error: "Usuário ou senha incorretos." };
    }

    return {
      success: true,
      user: { name: user.name, username: user.username },
    };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao tentar entrar." };
  }
}
