import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Criando o registro no SQLite
    const appointment = await prisma.appointment.create({
      data: {
        name: body.name,
        age: Number(body.age),
        phone: body.phone,
        cpf: body.cpf,
        address: body.address,
        email: body.email,
        date: new Date(body.date),
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error: unknown) {
    console.error("Erro ao salvar:", error);
    return NextResponse.json(
      { error: "Erro ao processar o agendamento" }, 
      { status: 500 }
    );
  }
}