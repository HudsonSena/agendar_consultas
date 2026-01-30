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
    <div key={data.id} className="mb-2" {...rest}>
      <h1 className="font-bold">Nome: {data.name}</h1>
      <h2>Endereço: {data.address}</h2>
      <h2>Telefone: {data.phone}</h2>
      <h2>CPF: {data.cpf}</h2>
      <h2>Email: {data.email}</h2>
    </div>
  );
}
