import { PrismaClient, Prisma } from "../src/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.AppointmentCreateInput[] = [
  {
    name: "Hudson",
    age: 32,
    phone: "84 999083247",
    cpf: "01768479445",
    address: "Rua Francisco Martins de Miranda",
    email: "h-diego@hotmail.com",
    date: "2026-03-05T07:03:05Z",
  },
  {
    name: "Diego",
    age: 33,
    phone: "85 999083247",
    cpf: "01768479446",
    address: "Rua Franciscos Martin de Mirandas",
    email: "h-diego@bol.com",
    date: "2026-03-05T08:04:06Z",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.appointment.create({ data: u });
  }
}

main();
