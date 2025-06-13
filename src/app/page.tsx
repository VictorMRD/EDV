import Link from 'next/link';
import { auth0 } from "@/lib/auth0";
import './globals.css';

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main>
        <div className="flex justify-center gap-4">
          <Link href="/auth/login?screen_hint=signup">
            <button>Registrate</button>
          </Link>
          <a href="/auth/login">
            <button>Inicia sesión</button>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1>Bienvenido, {session.user.name}!</h1>
      <p>user role {session.user['https://edv.com/roles']}</p>
      <p>
        <a href="/auth/logout">
          <button>Cerrar sesión</button>
        </a>
      </p>
    </main>
  );
}