import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

type ItemProps = {
  data: {
    id: string;
    name: string;
    address: string;
    phone: string;
    cpf: string;
    email: string;
  };
};

export function Item({ data, ...rest }: ItemProps) {
  return (
    <div
      key={data.id}
      className="w-full flex flex-col gap-2 pt-2 border-t-2"
      {...rest}
    >
      <h1 className="wrap-break-word">
        Nome: <span className="font-bold">{data.name}</span>
      </h1>
      <h2 className="wrap-break-word">Endereço: {data.address}</h2>
      <h2>Telefone: {data.phone}</h2>
      <h2>CPF: {data.cpf}</h2>
      <h2>Email: {data.email}</h2>
      <div className="flex justify-end-safe gap-4 mb-3">
        <Button variant={"outline"} size={"icon"}>
          <Pencil className="w-6 h-6 text-blue-700" />
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <Trash className="w-6 h-6 text-red-600" />
        </Button>
      </div>
    </div>
  );
}
