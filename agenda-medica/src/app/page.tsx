import SigninForm from "@/components/signinForm";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const consultas = await prisma.user.findMany();
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <h1>Entrar no Agendas</h1>
      <SigninForm />
      <Link href="/register" className="underline">Cadastre-se</Link>
      <ol>
        consultas teste-------------
        {
        consultas.map((e) => (
            <li key={e.id}>
              <p>{e.username}</p>
              <p>{e.name}</p>
              <p>{e.email}</p>
            </li>
        ))
      }
      </ol>
    </div>
  );
}
