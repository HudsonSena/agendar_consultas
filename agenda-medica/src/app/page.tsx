import { Button } from "@/components/ui/button";
import { Item } from "../components/item";
import prisma from "../lib/prisma";
import Link from "next/link";
import { EventDay } from "../components/diaconsulta";

export default async function Home() {
  const agendados = await prisma.appointment.findMany();
  return (
    <div className="sm:w-85 m-auto my-5 flex flex-col items-center justify-center px-4 gap-3">
      <div className="w-full flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Agenda de Consultas</h1>
        <Button variant={"outline"} className="font-semibold">
          Sair
        </Button>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <EventDay date={new Date()} />
        <Link
          href={"/agendar"}
          className="w-full border-2 rounded-md py-2 flex items-center justify-center hover:bg-slate-200 font-semibold text-blue-600"
        >
          Agendar Consulta
        </Link>
      </div>
      <div>
        <h1>Total de: {agendados.length} consultas.</h1>
        {agendados.map((item) => (
          <Item data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
