import { AgendaForm } from "../components/agendaForm";
import { Item } from "../components/item";
import prisma from "../lib/prisma";

export default async function Home() {
  const agendados = await prisma.appointment.findMany();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Agenda
      </h1>
      <ul className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {agendados.map((item) => (
          <li key={item.id}>
            <Item data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
