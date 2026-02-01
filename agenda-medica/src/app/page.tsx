import { Button } from "@/components/ui/button";
import { Item } from "../components/item";
import prisma from "../lib/prisma";
import Link from "next/link";
import { EventDay } from "../components/diaconsulta";
import SignupForm from "../components/signup";

export default async function Home() {
  //const agendados = await prisma.appointment.findMany();
  return <SignupForm />;
}
