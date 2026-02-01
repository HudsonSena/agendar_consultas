import { EventDay } from "../components/diaconsulta";
import { Item } from "../components/item";
import SignupForm from "../components/signupForm";
import prisma from "../lib/prisma";

export default async function Home() {
  const agendados = await prisma.appointment.findMany();
  return (
    <div>
      <h1>Agenda Médica</h1>
      <p>Bem-vindo à aplicação de agendamento médico.</p>
      <EventDay date={new Date()} />
      <SignupForm />
      {agendados.map((item) => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  );
}
