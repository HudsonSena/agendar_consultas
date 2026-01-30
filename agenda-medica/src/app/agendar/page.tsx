import Form from "next/form";
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function AgendaForm() {
  async function createPost(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const cpf = formData.get("cpf") as string;
    const email = formData.get("email") as string;
    const age = parseInt(formData.get("age") as string);

    await prisma.appointment.create({
      data: {
        name,
        address,
        phone,
        cpf,
        email,
        age,
        date: new Date(),
      },
    });

    revalidatePath("/posts");
    redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Agenda uma consulta</h1>
      <Form action={createPost} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite o nome"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-lg mb-2">
            Idade
          </label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Digite a idade"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-lg mb-2">
            Endereço
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Digite o endereço"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-lg mb-2">
            Telefone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Digite o núemero de telefone"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="cpf" className="block text-lg mb-2">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="Digite o CPF"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Digite o Email"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Agendar
        </button>
      </Form>
    </div>
  );
}
