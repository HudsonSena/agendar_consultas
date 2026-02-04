import SigninForm from "@/components/signinForm";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <h1>Login</h1>
      <SigninForm />
      <Link href="/register">Cadastre-se</Link>
    </div>
  );
}
