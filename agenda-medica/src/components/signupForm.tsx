"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormSchema, SignupFormValues } from "../lib/definitions";
import { signup } from "../app/actions/auth";
import { useState } from "react";

export default function SignupForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setServerError(null);
    const result = await signup(data);

    if (result?.error) {
      setServerError(result.error);
    } else {
      alert("Usuário criado com sucesso!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-sm mx-auto p-4"
    >
      {serverError && (
        <p className="text-red-500 bg-red-100 p-2 rounded text-sm">
          {serverError}
        </p>
      )}

      <input
        {...register("name")}
        placeholder="Nome"
        className="border p-2 rounded"
      />
      {errors.name && (
        <span className="text-red-500 text-xs">{errors.name.message}</span>
      )}

      <input
        {...register("username")}
        placeholder="Username"
        className="border p-2 rounded"
      />
      {errors.username && (
        <span className="text-red-500 text-xs">{errors.username.message}</span>
      )}

      <input
        {...register("email")}
        placeholder="E-mail"
        className="border p-2 rounded"
      />
      {errors.email && (
        <span className="text-red-500 text-xs">{errors.email.message}</span>
      )}

      <input
        {...register("password")}
        type="password"
        placeholder="Senha"
        className="border p-2 rounded"
      />
      {errors.password && (
        <span className="text-red-500 text-xs">{errors.password.message}</span>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting ? "Cadastrando..." : "Criar Conta"}
      </button>
    </form>
  );
}
