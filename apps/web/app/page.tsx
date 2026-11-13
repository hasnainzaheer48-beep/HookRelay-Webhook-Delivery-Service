
import getSession from "@/lib/session";
import { loadEnv } from "@hookrelay/shared";



export default function Home()
{
  const env = loadEnv();
  const dbHost = new URL(env.DATABASE_URL).host;
  
  const session = getSession();
  console.log(session);

  return (
     <main className="p-8">
      <h1 className="text-2xl font-bold">HookRelay</h1>
      <p>Database host: {dbHost}</p>
    </main>
  );
}