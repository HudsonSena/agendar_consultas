import SignupForm from "@/components/signupForm";
import Link from "next/link";

export default function Register() {
  return (
    <div>
      <h1>Registro</h1>
      <SignupForm />
      <Link href={"/"}>Voltar para login</Link>
    </div>
  );
}
