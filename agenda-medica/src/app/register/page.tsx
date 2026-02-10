import SignupForm from "@/components/signupForm";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1>Registre-se</h1>
      <SignupForm />
      <Link href={"/"}>Voltar para login</Link>
    </div>
  );
}
