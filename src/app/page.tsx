import Link from 'next/link';
import { auth0 } from "@/lib/auth0";
import './globals.css';

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, show sign-up and login buttons
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

  // If session exists, show a welcome message and logout button
  return (
    <main>
      <h1>Bienvenido, {session.user.name}!</h1>
      <p>
        <a href="/auth/logout">
          <button>Cerrar sesión</button>
        </a>
      </p>
    </main>
  );
}