import { Item } from "../components/item";
import prisma from "../lib/prisma";
import Link from "next/link";

export default async function Home() {
  const agendados = await prisma.appointment.findMany();
  return (
    <div className="sm:w-85 m-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">
        Agenda
      </h1>
      <div className="w-full flex items-start p-2">
        <Link href={"/agendar"} className="w-full border-2 rounded-md px-4 py-2 flex items-center justify-center hover:bg-slate-200">Agendar</Link>
      </div>
      
      <div>
        {agendados.map((item) => 
            <Item data={item} key={item.id}/>
        )}
      </div> 
    </div>
  );
}
