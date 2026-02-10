"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninFormSchema, SigninFormValues } from "@/lib/definitions";
import { signin } from "@/app/actions/auth";
import { useState, useEffect } from "react";

export default function SigninForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(SigninFormSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: SigninFormValues) => {
    setServerError(null);
    const result = await signin(data);

    if (result?.error) {
      setServerError(result.error);
    } else {
      alert(`Bem-vindo de volta, ${result.user?.name}!`);
      // Aqui você redirecionaria: router.push('/dashboard')
    }
  };

  if (!mounted) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-sm mx-auto p-3"
    >
      <div className="flex flex-col gap-1">
        <input
          {...register("username")}
          type="text"
          className="border p-2 rounded shadow-sm"
          placeholder="Nome de usuário"
        />
        {errors.username && (
          <span className="text-red-500 text-xs">
            {errors.username.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          {...register("password")}
          type="password"
          className="border p-2 rounded shadow-sm"
          placeholder="Senha"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 text-white p-2 rounded font-bold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
      >
        {isSubmitting ? "Verificando..." : "Entrar"}
      </button>
      {serverError && (
        <p className="text-red-500 bg-red-100 p-2 rounded text-sm text-center">
          {serverError}
        </p>
      )}
    </form>
  );
}
