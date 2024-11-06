import Image from "next/image";
import { getSession, login, logout } from "@/lib/session";

export default async function Home() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return (
      <form action={login}>
      <label className="block text-lg">
        <span>Username</span>
        <input type="text" name="username" />
      </label>
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
    )
  }
  return (
    <div>
      you: {session.username}
      <p>{session.isLoggedIn}</p>
    </div>
  );
}
